///< reference path="../../../typings/server.d.ts"/>
import * as express from "express";
import * as ts from "./google.typesafe";

import * as libRequest from "request";
//import * as libUser from "../shared/user";
import * as mdlUser from "../users/user.model"
import * as libToken from "./token";
import * as $ConfigSecret from "../services/configSecret";
import * as mtg from "../services/mtg";

interface IGoogleProfile {
    sub: string; // GoogleID
    name: string;
    email: string;
    picture: string;
}

// TODO how to define an interface more precise
// We need to define IGoogleProfile as return of this requestGet

// export interface request {//extends request.RequestAPI{
//     	//function post(options: Options, callback?: (error: any, response: any, body: any) => void): Request;
// 		function get(options: request.Options, callback?: (error: any, response: any, body: IGoogleProfile) => void): Request;
// }

export function googleAuth(expReq: express.Request, expRes: express.Response) {
    var tsBody = <ts.IAuthGoogleBody>expReq.body;
    //console.log(tsBody.code);

    var opt: libRequest.Options = {
        url: "https://accounts.google.com/o/oauth2/token",
        json: true,
        form: {
            code: tsBody.code,
            client_id: tsBody.clientId,
            redirect_uri: tsBody.redirectUri,
            grant_type: "authorization_code",
            client_secret: $ConfigSecret.secret.GOOGLE_SECRET
        }
    };

    libRequest.post(opt, (err, response, token) => {
        //console.log("\ngoogleAuth - token: " + JSON.stringify(token));
        if (err) {
            throw err;
        }

        var accessToken = token.access_token;
        var headers: libRequest.Headers = {};
        headers["Authorization"] = "Bearer " + accessToken;

        var requestParams: libRequest.Options = {};
        requestParams.url = "https://www.googleapis.com/plus/v1/people/me/openIdConnect";
        requestParams.headers = headers;
        requestParams.json = true;
        libRequest.get(requestParams, (err: any, response: any, googleProfile: IGoogleProfile) => {
            //console.log("\ngoogleAuth:" + err + response + JSON.stringify(profile));
            if (err) {
                throw err;
            }

            mtg.db.users.findOne<mdlUser.IUserDoc>({ email: googleProfile.email })
                .then((foundUser) => {
                    if (foundUser) {
                        return libToken.createSendToken(foundUser, expRes);
                    } else {
                        createGoogleUser(googleProfile).then(
                            (googleUserJustAdded)=>{
                                return libToken.createSendToken(googleUserJustAdded, expRes);
                            }
                        )}
                    })
                .catch((err) => {
                    console.log(err);
                    throw err;
                });
        });
    });
}

function createGoogleUser(googleProfile: IGoogleProfile): Promise<mdlUser.IUserDoc> {
    var userGoogled: mdlUser.IUser = {
        email: googleProfile.email,
        displayName: googleProfile.name,
        googleId: googleProfile.sub,
        picture: googleProfile.picture,
        active: true,
        facebookId: null,
        allowedRoles: ["guest"]
    }

    return mtg.db.users.createNewexternalUser(userGoogled)

    // mtg.db.users.createNewexternalUser(userGoogled)
    //     .then((userCreated) => {
    //         libToken.createSendToken(userCreated, expRes);
    //     })
    //     .catch((err) => {
    //         throw err;
    //     })}
}


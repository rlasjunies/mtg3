///< reference path="../../../typings/server.d.ts"/>
import * as express from "express";
import * as jwt from "jwt-simple";
import * as moment from "moment";

import * as $Token from "./token";
import * as $EmailVerification from "./emailVerification";
//import {logger as mtg.log} from "../services/logger";
import * as $configSecret from "../services/configSecret";

import * as mtg from "../services/mtg";
//import * as $usersModel from "../shared/user";

var moduleName = "localAuth";

export function register(expReq: express.Request, expRes: express.Response, info: any) {
    $EmailVerification.send(expReq.body.email, expRes);
    $Token.createSendToken(expReq.user, expRes);
}

export function login(expReq: express.Request, expRes: express.Response, info: any) {
    console.log("token generation");
    $Token.createSendToken(expReq.user, expRes);
}

export function authenticationCheck(expReq: express.Request, expRes: express.Response, next: Function) {
    if (!expReq.headers["authorization"]) {
        return expRes.status(401).send({ message: "you are not authorized!" });
    } else {
        mtg.log.debug(moduleName + "@authentication: req.headers['authorization']" + expReq.headers["authorization"]);
        var authorization = expReq.headers["authorization"];
        var token = authorization.split(" ")[1];
        try {
            var payload = jwt.decode(token, $configSecret.secret.JWT_SECRET);
        } catch (e) {
            payload = {};
        }

        if (!payload.sub) {
            return expRes.status(401).send({ message: "Authentication failed" });
        } else {
            if (moment.unix(payload.exp).diff(moment(), 'second') < 0) {
                console.log("!!!!token expired!!!");
            }

            mtg.db.users.findById(payload.sub)
                .then((userFound) => {
                    if (userFound !== undefined) {
                        mtg.log.debug("expReq.params.id:" + expReq.params.id);
                        mtg.log.profile(moduleName + "@find");
                        //expRes.status(200).send(user);
                        expReq.user = userFound;

                        next();
                    }
                })
                .catch((err) => {
                    return expRes.status(500).write({ message: "Error trying to find the user." + JSON.stringify(err) });
                })
        }
    }
}
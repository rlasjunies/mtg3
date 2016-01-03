///< reference path="../../typings/tsd.d.ts"/>

import * as e from "express";
import * as _ from "underscore";
import * as jwt from "jwt-simple";
import * as fs from  "fs";
import * as nodemailer from "nodemailer";
import * as nodemailer_smtp_transport from "nodemailer-smtp-transport";

import * as $ConfigSecret from "../services/configSecret";
import * as $Config from "../services/config";
//import * as xUser from "../shared/user";
import * as mdlUser from "../users/user.model";
import * as mtg from "../services/mtg";

interface IModel {
    verifyUrl: string;
    title: string;
    subTitle: string;
    body: string;
}

interface IPayload {
    sub: string
}

export function send(email: string, res: e.Response) {
    var payload: IPayload = {
        sub: email
    };

    var token = jwt.encode(payload, $ConfigSecret.secret.EMAIL_SECRET);

    //var nSMTPTransportOptions: NodemailerSMTPTransportOptions = {

    var nSMTPTransportOptions: nodemailer_smtp_transport.SmtpOptions = {
        service: "Gmail",
        auth: {
            user: "rlasjunies@gmail.com",
            pass: $ConfigSecret.secret.SMTP_PASS
        }
    };

    var transporter = nodemailer.createTransport(nSMTPTransportOptions);

    var mailOptions: nodemailer.SendMailOptions = {
        from: "Richard Lasjunies<rlasjunies@gmail.com>",
        to: email,
        subject: "PS Jwt Account verification",
        html: getHtml(token)
    };

    transporter.sendMail(mailOptions, (err: Error) => {
        if (err) {
            mtg.log.error(`Verification email - Error sending to:${mailOptions.to}`);
            //return res.status(500).send(JSON.stringify(err));
            //When here the res is already given
        } else {
            mtg.log.info("Verification email sent to:" + mailOptions.to);
        }
    });
}

export function verify(req: e.Request, res: e.Response, next: Function) {
    var token = <eExt.RequestId>req.query.token;

    var payload: IPayload = jwt.decode(token, $ConfigSecret.secret.EMAIL_SECRET);

    var email = payload.sub;

    if (!email) {
        return handleError(res);
    }

    //var users = xUser.userModel();
    mtg.db.users.findByEmail(email)
        .then((userFound) => {
            if (!userFound) {
                return handleError(res);
            } else {
                userFound.active = true;

                mtg.db.users.update(userFound._id, userFound)
                    .then((userUPdated) => {
                        return res.redirect(<string>$Config.config.appUrl[process.env]);
                    })
                    .catch((err) => {
                        return res.status(500);
                    });
            };
        })
        .catch((err) => {
            return res.status(500);
        })

    //     users.findOne({ email: email }, (err:any, userFound: xUser.IUserDocument) => {
    //         if (err) {
    //             return res.status(500);
    //         }
    //
    //         if (!userFound) {
    //             return handleError(res);
    //         }
    //
    //         if (!userFound.active) {
    //             userFound.active = true;
    //         }
    //
    //         userFound.save((err:any, userFound: xUser.IUserDocument): any => {
    //             if (err) {
    //                 return res.status(500);
    //             }
    //
    //             return res.redirect(<string>$Config.config.appUrl[process.env]);
    //         });
    //
    //     });

}

function handleError(res: e.Response) {
    return res.status(401).send({
        message: "Authentication failed, enable to verify the email"
    });
}

function getHtml(token: string) {

    var model: IModel = {
        // TODO to make generic
        verifyUrl: "http://localhost:3000/auth/verifyemail?token=" + token,
        title: "psJwt",
        subTitle: "Thanks for signing up!",
        body: "Please, verify your email address by clicking the button below."
    };

    // TODO replace readFileSync by Async
    var html = fs.readFileSync(mtg.server.emailVerificationFileName, { encoding: "utf8" });

    var template = _.template(html);

    var sReturn = template(model);

    return sReturn;
}

_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};

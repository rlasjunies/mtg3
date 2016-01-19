///< reference path="../../../typings/server.d.ts"/>
import * as passport_local from "passport-local";
import * as mdlUser from "../users/user.model";
import * as mtg from "../services/mtg";

var moduleName = "localStratregy - ";
var strategyOptions = { usernameField: "email" };
export function login() {
    return new passport_local.Strategy(strategyOptions, (username: string, password: string, done) => {
        mtg.log.info(`Username:${username}`);
        mtg.log.profile("passport-login");
        var qryUser = { email: username };

        mtg.db.users.findByEmailAndComparePassword(username, password)
            .then((userFound) => {
                if (!userFound) {
                    // TODO again the message is not "readable for the client part
                    mtg.log.info("login.dbUser does not exists!");
                    mtg.log.profile("passport-login");
                    return done(null, false, { message: "Wrong email / password" });
                }

                mtg.log.info("User: %s logged in", userFound.email);
                mtg.log.profile("passport-login");

                return done(null, userFound);
            })
            .catch((errFindOneUser) => {
                mtg.log.error("login.findOne error:" + errFindOneUser);
                return done(errFindOneUser);
            });
    });
}

export function register() {
    return new passport_local.Strategy(strategyOptions, (email, password, done) => {
        mtg.db.users.findByEmail(email)
            .then((userFound) => {
                if (userFound) {
                    // TODO message not clear when it happen
                    mtg.log.error("register.findOne user already exist in the database!");
                    return done(null, false, { message: `email: ${email} - already registered!` });
                }

                var userRegistering: mdlUser.IUser = {
                    email: email,
                    displayName: email,
                    password: password,
                    googleId: "profile.sub",
                    picture: "profile.picture",
                    active: false,
                    facebookId: "",
                    allowedRoles: ["guest"]
                }
                mtg.db.users.createNewInternalUser(userRegistering)
                    .then((userRegistered) => {
                        return done(null, userRegistered);
                    })
                    .catch((error) => {
                        mtg.log.error(`resgistering:${email} - error:${error}`);
                        return done(error);
                    })
            })
            .catch((errFindingByEmail) => {
                mtg.log.error("register.findOne error:" + errFindingByEmail);
                return done(errFindingByEmail);
            })
    });
};


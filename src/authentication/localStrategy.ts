import * as passport_local from "passport-local";
//import * as libuser from "../shared/user";
import * as mdlUser from "../models/users";
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

                // userFound.toJSON = function() {
                //     //var user = this.toObject();
                //     //delete user.password;
                //     return JSON.stringify(userFound);
                // };
                return done(null, userFound);
            })
            .catch((errFindOneUser) => {
                mtg.log.error("login.findOne error:" + errFindOneUser);
                //return done(errUserNotFound);                
                return done(errFindOneUser);
            });
    });
}

export function register() {
    return new passport_local.Strategy(strategyOptions, (email, password, done) => {
        //var userModel = libuser.userModel();
        //var qryUser = { email: username };

        //libuser.userModel().findOne(qryUser, (err, dbUser) => {
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
                mtg.db.users.createNew(userRegistering)
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
        // if (err) {
        //     mtg.log.error("register.findOne error:" + err);
        //     return done(err);
        // }

        // if (dbUser) {
        //     // TODO message not clear when it happen
        //     mtg.log.error("register.findOne user already exist in the database!");
        //     return done(null, false, { message: "email already exists!" });
        // }

        //             var newUser: libuser.IUserDocument = new userModel({
        //                 email: username,
        //                 password: password
        //             });
        // 
        //             newUser.save(function(err) {
        //                 if (err) {
        //                     mtg.log.error("resgister.newUser.save error:" + err);
        //                     return done(err);
        //                 }
        //                 return done(null, newUser);
        //             });

    });
};


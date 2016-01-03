/// <reference path="../../../typings/server.d.ts" />
//"use strict";
import * as passport from "passport";
import * as express from "express";

import * as mtg from "../services/mtg";

import * as localStrategy from "./localStrategy";
import * as authLocal from "./localAuth";
// import * as authorization from "./authorization/authorization.middleware";
// import * as authFacebook from "./facebookAuth";
import * as authGoogle from "./googleAuth";
import * as emailVerif from "./emailVerification";

mtg.app.use(passport.initialize());

passport.serializeUser((user, done: (err: any, id: any) => void) => {
    done(null, user._id);
});

mtg.app.use(function(req: express.Request, res: express.Response, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

//authentication strategy
passport.use("local-register", localStrategy.register());
passport.use("local-login", localStrategy.login());

export function init() {
    mtg.app.post("/auth/register", passport.authenticate("local-register"), authLocal.register);
    //mtg.app.post("/auth/login", passport.authenticate("local-login"), authLocal.login);
    mtg.routePostAdd("/auth/login", false, null, passport.authenticate("local-login"), authLocal.login)
    mtg.app.get("/auth/verifyemail", emailVerif.verify);
    //mtg.app.post("/auth/facebook", authFacebook.facebookAuth);
    mtg.app.post("/auth/google", authGoogle.googleAuth);
}
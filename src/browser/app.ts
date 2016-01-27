// /// <reference path="../../typings/browser.d.ts"/>
"use strict";

import * as ngMaterial from "angular-material";
import * as satellizer from "satellizer";
import * as ui_router from "ui-router";
import * as angular from "angular";
import * as ngFileUpload from "angular-file-upload";
import * as ngAnimate from "angular-animate";
//import * as angularLoadingBar from ""

var tmp = ngMaterial;
tmp = satellizer;// module app {
tmp = ui_router;
tmp = ngFileUpload;
tmp = ngAnimate;

import * as siteSettingsService from "./services/sitesettings.service";
import * as authorizationService from "./authorization/authorizationService";
import * as userService from "./users/usersService";
import * as userLoggedService from "./services/userLogged";
import * as notificationService from "./services/notificationService"
import * as pictureService from "./pictures/picturesService";

import * as authToken from "./authentication/authToken";
import * as authInterceptor from "./authentication/authInterceptor";

import * as mainController from "./main/mainController";
import * as indexController from "./indexController";
import * as headerController from "./header/headerController";
import * as sidenavController from "./sidenav/sidenavController";
import * as loginController from "./login/loginController";
import * as logoutController from "./logout/logoutController";
import * as paintsController from "./paints/paintsController";
import * as picturesController from "./pictures/picturesController";
import * as pictureController from "./pictures/pictureController";
import * as picturesUploadcontroller from "./pictures/picturesUploadcontroller";
import * as registerController from "./register/registerController";
import * as usersController from "./users/usersController";
import * as userController from "./users/userController";

import * as app_config from "./app.config";
import * as app_config_auth from "./app.config.auth";
import * as app_route from "./app.route";
import * as app_run from "./app.run";

import * as mainRoute from "./main/mainRoute";
import * as loginRoute from "./login/loginRoute";
import * as logoutRoute from "./logout/logoutRoute";
import * as paintsRoute from "./paints/paintsRoute";
import * as picturesRoute from "./pictures/picturesRoute";
import * as registerRoute from "./register/registerRoute";
import * as usersRoute from "./users/usersRoute";

var spa = angular
    .module("app", [
        "ngMaterial",
        "satellizer",
        "ui.router",
        //"ngMessages",
        //TODO may be good to replace the loading bar control (ngControl), by the NGMD one
        //"angularLoadingBar",
        "ngAnimate",
        "ngFileUpload"
    ])
    .constant("CST_URL", window.location.protocol + "//" + window.location.host + "/")
    .constant("CST_API_URL", window.location.protocol + "//" + window.location.host + "/api")
    .constant("CST_AUTH_URL", window.location.protocol + "//" + window.location.host + "/auth")
    .config(app_config_auth.config)
    .config(app_config.config);

siteSettingsService.ngRegister(spa);
authToken.ngRegister(spa);
authInterceptor.ngRegister(spa);
notificationService.ngRegister(spa);
userLoggedService.ngRegister(spa);
userService.ngRegister(spa);
authorizationService.ngRegister(spa);
pictureService.ngRegister(spa);

indexController.ngRegister(spa);
sidenavController.ngRegister(spa);
mainController.ngRegister(spa);
headerController.ngRegister(spa);
loginController.ngRegister(spa);
logoutController.ngRegister(spa);
paintsController.ngRegister(spa);
picturesController.ngRegister(spa);
pictureController.ngRegister(spa);
picturesUploadcontroller.ngRegister(spa);
registerController.ngRegister(spa);
usersController.ngRegister(spa);
userController.ngRegister(spa);

app_route.ngRegister(spa);
mainRoute.ngRegister(spa);
loginRoute.ngRegister(spa);
logoutRoute.ngRegister(spa);
paintsRoute.ngRegister(spa);
picturesRoute.ngRegister(spa);
registerRoute.ngRegister(spa);
usersRoute.ngRegister(spa);

app_run.ngRegister(spa);

    // .config(["cfpLoadingBarProvider", function(cfpLoadingBarProvider) {
    //     cfpLoadingBarProvider.includeSpinner = false;
    // }]);

console.log("app.js loaded!");
export let name: string = "app"
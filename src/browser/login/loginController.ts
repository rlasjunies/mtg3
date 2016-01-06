/// <reference path="../../../typings/browser.d.ts"/>
import * as satellizer from "satellizer";

import * as mtg_header from "../header/headerController";
import * as mtg_authentication from "./authentication/auth"
import * as mtg_register from "../register/registerController";
import * as mtg_serviceUserLogged from "../services/userLogged";
import * as mtg_notificationSrv from "../services/notificationService";
// namespace mtg.login {
"use strict";

export var loginControllerStringName = "mtg.login.LoginController";

export interface ILogin {
    submit: () => void;
};

// interface ILoginRootScope extends ngmtg.IRootScopeService {
// }

export class LoginController implements mtg_register.IController {
    public email: string;
    public password: string;
    public myvalid: boolean = true;

    static $inject = [
        "$rootScope",
        "$scope",
        "notificationService",
        "$state",
        "$auth",
        "$log",
        "userLoggedService"
    ];
    constructor(
        private $rootScope: ngmtg.IRootScopeService,
        private $scope: angular.IScope,
        private notificationService: mtg_notificationSrv.NotificationService,
        private $state: angular.ui.IStateService,
        private $auth: satellizer.IAuthService,
        private $log: angular.ILogService,
        private userLoggedService: mtg_serviceUserLogged.IUserLoggedService) {
        this.$log.debug("LoginController: Constructor");

        this.$rootScope.headerConfiguration = new mtg_header.HeaderConfiguration("", true);

        this.$scope.$on("$destroy", () => {
            //clean the header bar configuration
            this.$rootScope.headerConfiguration = new mtg_header.HeaderConfiguration();;
        });
    }

    submit = () => {
        this.$auth.login<mtg_authentication.IAuthenticationServerResponse>({ email: this.email, password: this.password })
            .then((response) => {
                //Initialize the logged user
                this.userLoggedService.login(response.data.user);

                //Welcome back the user
                var msg = "Thanks '" + response.data.user.email + "' for coming back!";
                this.$log.debug(msg);
                this.notificationService.success(msg);

                //Notify if the user is not activated
                if (!this.userLoggedService.active) {
                    msg = "Do not forget to active your account via the email sent!";
                    this.notificationService.warning(msg);
                }

                //Navigate to the main page
                this.$state.go("main");
            })
            .catch((err) => {
                this.$log.error("login:" + JSON.stringify(err));
                this.notificationService.error("Error registering!" + JSON.stringify(err));

                //clean the user logged
                this.userLoggedService.logout();
            });
    };

    authenticate = (provider: string) => {
        this.$auth.authenticate<mtg_authentication.IAuthenticationServerResponse>(provider).then((response) => {

            //initialize the user logged
            this.userLoggedService.login(response.data.user);

            //Welcome back the user
            var msg = "Thanks '" + response.data.user.email + "' for coming back!";
            this.$log.debug(msg);
            this.notificationService.success(msg);

            //Navigate to the main page
            this.$state.go("main");
        }).catch((err) => {
            this.$log.error("login:" + JSON.stringify(err));
            this.notificationService.error("Error registering!");

            //clean the user logged
            this.userLoggedService.logout();
        });
    };
}

angular
    .module("app")
    .controller(loginControllerStringName, LoginController);
// }

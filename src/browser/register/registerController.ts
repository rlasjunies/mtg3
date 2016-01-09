/// <reference path="../../../typings/browser.d.ts"/>
/// <reference path="../../../typings/angular-file-upload-missing.d.ts"/>
import * as satellizer from "satellizer";
import * as mtg_picturesSrv from "../pictures/picturesService";
import * as mtg_authentication from "../authentication/auth";
import * as mtg_header from "../header/headerController";
import * as mtg_main from "../main/mainController";
import * as appState from "../appState";
import * as appRootScopeEvent from "../appRootScopeEvent";
import * as mtg_notificationSrv from "../services/notificationService";

"use strict";

export var moduleName = "mtg.register.RegisterController";

export interface IController {
    submit: () => void;
};

export class RegisterController implements IController {
    public email: string;
    public password: string;
    public passwordConfirm: string;

    static $inject = [
        "$rootScope",
        "$scope",
        "notificationService",
        "$auth",
        "$state",
        "$log"
    ];
    constructor(
        private $rootScope: ngmtg.IRootScopeService,
        private $scope: angular.IScope,
        private notificationService: mtg_notificationSrv.NotificationService,
        private $auth: satellizer.IAuthService,
        private $state: angular.ui.IStateService,
        private $log: angular.ILogService) {

        this.password = "";
        this.passwordConfirm = "";

        this.$scope.$watch(() => this.password, this.checkPasswords);
        this.$scope.$watch(() => this.passwordConfirm, this.checkPasswords);

        this.$rootScope.headerConfiguration = new mtg_header.HeaderConfiguration("", false, true);

        this.$scope.$on("$destroy", () => {
            //clean the header bar configuration
            this.$rootScope.headerConfiguration = new mtg_header.HeaderConfiguration();;
        });


        this.$log.debug("RegisterController: Constructor");
    }

    checkPasswords = () => {
        this.$scope["register"]["password_confirm"].$setValidity("equal", (this.password === this.passwordConfirm));
    };

    submit = () => {
        this.$auth.signup<mtg_authentication.IAuthenticationServerResponse>({ email: this.email, password: this.password })
            .then((response) => {
                this.$log.info("registration is fine!");

                var msg = "Dear '" + response.data.user.email +
                    "' you are now registered!. Goes in your mailbox to confirm your email address " +
                    " within 12 hours.";
                this.notificationService.success(msg);
                this.$scope.$broadcast("userupdated");
                this.$state.go("main");
            })
            .catch((err) => {
                this.$log.error("registration is wrong bad:" + JSON.stringify(err));
                this.notificationService.error("Error registering!" + JSON.stringify(err));
                this.$scope.$broadcast("userupdated");
            });
    };
}

export function ngRegister(appModule:ng.IModule){
    appModule.controller(moduleName, RegisterController);
};
/// <reference path="../../../typings/browser.d.ts"/>
import * as satellizer from "satellizer";
import * as appState from "appState";
import * as mtg_notificationSrv from "../services/notificationService";
import * as mtg_serviceUserLogged from "../services/userLogged";

"use strict";

export var moduleName = "mtg.logout.LogoutController";

export interface ILogoutRootSCope extends angular.IRootScopeService {
}

export class LogoutController {
    static $inject = [
        "$rootScope",
        "$auth",
        "$state",
        "notificationService",
        "$log",
        "userLoggedService"
    ];
    constructor(
        private $rootScope: ILogoutRootSCope,
        private $auth: satellizer.IAuthService,
        private $state: angular.ui.IStateService,
        private notificationService: mtg_notificationSrv.NotificationService,
        private $log: angular.ILogService,
        private userLoggedService: mtg_serviceUserLogged.IUserLoggedService) {

        //clean the sanitizer authentication and the app global service userLogged
        this.$auth.logout();
        this.userLoggedService.logout();

        this.notificationService.info("You are now logout!", "Authentication message");
        this.$log.debug(moduleName + "loaded!");
        this.$state.go(appState.mainState);
    }
}

export function ngRegister(appModule:ng.IModule){
    appModule.controller(moduleName,LogoutController);
};
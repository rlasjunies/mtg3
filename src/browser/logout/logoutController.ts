/// <reference path="../../../typings/browser.d.ts"/>
module mtg.logout {
    "use strict";

    export var logoutControllerStringName = "mtg.logout.LogoutController";


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
            private $auth : satellizer.IAuthService,
            private $state: angular.ui.IStateService,
            private notificationService: mtg.services.NotificationService,
            private $log: angular.ILogService,
            private userLoggedService:mtg.services.IUserLoggedService) {

            //clean the sanitizer authentication and the app global service userLogged
            this.$auth.logout();
            this.userLoggedService.logout();

            this.notificationService.info("You are now logout!","Authentication message");
            this.$log.debug(mtg.logout.logoutControllerStringName + "loaded!");
            this.$state.go(appState.mainState);
        }
    }

    angular
        .module("app")
        .controller(mtg.logout.logoutControllerStringName, mtg.logout.LogoutController);
}

import * as mtg_serviceUserLogged from "../services/userLogged";

"use strict";

export var moduleName = "mtg.sidenav.SidenavController";

interface ISidenavScope {
    // isAuthenticated(): boolean;
}

export class SidenavController {
    // public isAuthenticated: Function;
    // public $auth:  //any; //: services.AuthToken;

    static $inject = [
        "$scope",
        "$auth",
        "$mdSidenav",
        "$log",
        "userLoggedService"
    ];

    constructor(
        private $scope: angular.IScope,
        private $auth,
        private $mdSidenav: any,
        private $log: angular.ILogService,
        private userLoggedService: mtg_serviceUserLogged.IUserLoggedService) {

        this.$log.debug("SidenavController: Constructor");

    }

    close(): void {
        this.$mdSidenav("left").close().then(() => {
            //this.$log.debug("toggle left is done@sideNavController");
        });
    }
}

export function ngRegister(appModule: ng.IModule) {
    appModule.controller(moduleName, SidenavController);
};

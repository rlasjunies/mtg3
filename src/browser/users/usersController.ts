///< reference path="../../typings/browser.d.ts"/>
import * as satellizer from "satellizer";
import * as mtg_header from "../header/headerController";
import * as mtg_main from "../main/mainController";
import * as appState from "../appState";
import * as appRootScopeEvent from "../appRootScopeEvent";
import * as mtg_notificationSrv from "../services/notificationService";
import * as mtg_usersRte from "../users/usersRoute";
import * as mtg_usersSrv from "../users/usersService";

"use strict";

export var moduleName = "mtg.users.UsersController";

//export interface IUser {
//    _id: string;
//    email: string;
//    password: string;
//    active: boolean;
//    googleId: string;
//    facebookId: string;
//    displayName: string;
//}
export class UsersController {
    public users: mtg_usersSrv.IUsers = [];
    public usersView: mtg_usersSrv.IUser[] = [];

    static $inject = [
        "$scope",
        "$rootScope",
        "$http",
        "CST_API_URL",
        "notificationService",
        "$log",
        "$mdDialog",
        "$filter",
        "$state",
        "UserService"
    ];
    constructor(
        private $scope: angular.IScope,
        private $rootScope: ngmtg.IRootScopeService,
        private $http: angular.IHttpService,
        private CST_API_URL,
        private notificationService: mtg_notificationSrv.NotificationService,
        private $log: angular.ILogService,
        private $mdDialog,
        private $filter,
        private $state: angular.ui.IStateService,
        private userService: mtg_usersSrv.IUserService) {

        ////header definition
        this.$rootScope.headerConfiguration = new mtg_header.HeaderConfiguration("Users", true, false, false, false, false, false);

        this.$scope.$on("$destroy", () => {
            //clean the header bar configuration
            this.$rootScope.headerConfiguration = new mtg_header.HeaderConfiguration();;
        });

        this.userService.getAll().then((users: mtg_usersSrv.IUsers): void => {
            this.users = users;
            this.usersView = [].concat(this.users);
            this.$log.debug("users loaded!");
        }).catch((err) => {
            this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot load users resources:");
            this.notificationService.error("Error message: \n" + JSON.stringify(err), "Cannot load users resources:");
        });

        this.$log.debug("UsersController: Constructor");
    }

    onClick = (userID: string): void => {
        var userParams: mtg_usersRte.UserRouteParams = new mtg_usersRte.UserRouteParams(userID);
        this.$state.go("user", userParams);
    };
}

export function ngRegister(appModule: ng.IModule) {
    appModule.controller(moduleName, UsersController);
};
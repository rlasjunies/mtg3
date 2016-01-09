import * as satellizer from "satellizer";
import * as mtg_header from "../header/headerController";
import * as mtg_user from "../users/userController";
import * as mtg_main from "../main/mainController";
import * as appState from "../appState";
import * as appRootScopeEvent from "../appRootScopeEvent";
import * as mtg_notificationSrv from "../services/notificationService";
import * as mtg_usersCtrl from "../users/usersController";
import * as headerTpl from '../header/header.htm';
import * as userTpl from './user.htm';
import * as usersTpl from './users.htm';

"use strict";

export interface IUserRouteParams {
    userId: string;
}

export interface IUserStateParams extends angular.ui.IStateParamsService, IUserRouteParams {
}

export class UserRouteParams implements IUserRouteParams {
    constructor(public userId: string) { }
}

route.$inject = [
    "$stateProvider"
];
function route($stateProvider: angular.ui.IStateProvider) {
    $stateProvider
        .state(appState.users, {
            url: appState.usersUrl,
            views: {
                "header": {
                    template: headerTpl.template,
                    controller: mtg_header.moduleName,
                    controllerAs: "vm"
                },
                "container": {
                    template: usersTpl.template,
                    controller: mtg_usersCtrl.moduleName,
                    controllerAs: "vm"
                },
                "footer": {}
            }
        })
        .state(appState.user, {
            url: appState.usersUrl + "/{userId}",
            views: {
                "header": {
                    template: headerTpl.template,
                    controller: mtg_header.HeaderController,
                    controllerAs: "vm"
                },
                "container": {
                    template: userTpl.template,
                    controller: mtg_user.moduleName,
                    controllerAs: "vm"
                },
                "footer": {}
            }
        });
};

export function ngRegister(appModule:ng.IModule){
    appModule.config(route);
};
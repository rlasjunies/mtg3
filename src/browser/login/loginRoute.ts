/// <reference path="../../../typings/browser.d.ts"/>
"use strict";
import * as appState from "../appState";
import * as mtg_header from "../header/headerController";
import * as mtg_login from "../login/loginController";
import * as headerTpl from "../header/header.htm";
import * as loginTpl from "./login.htm";

"use strict";

route.$inject = [
    "$stateProvider"
];
function route($stateProvider: angular.ui.IStateProvider) {
    $stateProvider
        .state(appState.loginState, {
            url: appState.loginUrl,
            views: {
                "header": {
                    template: headerTpl.template,
                    controller: mtg_header.moduleName,
                    controllerAs: "vm"
                },
                "container": {
                    template: loginTpl.template,
                    controller: mtg_login.moduleName,
                    controllerAs: "vm"
                },
                "footer": {}
            }
        });
};

export function ngRegister(appModule:ng.IModule){
    appModule.config(route);
};
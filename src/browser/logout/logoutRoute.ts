/// <reference path="../../../typings/browser.d.ts"/>

import * as appState from "../appState";
import * as mtg_logout from "./logoutController";
import * as logoutTpl from "./logout.htm";

"use strict";

route.$inject = [
    "$stateProvider"
];
function route($stateProvider: angular.ui.IStateProvider) {
    $stateProvider
        .state(appState.logoutState, {
            url: appState.logoutUrl,
            views: {
                "header": {},
                "container": {
                    templateUrl: logoutTpl.template ,
                    controller: mtg_logout.moduleName,
                    controllerAs: "vm"
                },
                "footer": {}
            }
        });
};

export function ngRegister(appModule:ng.IModule){
    appModule.config(route);
};
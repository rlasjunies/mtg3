import * as satellizer from "satellizer";
import * as mtg_header from "../header/headerController";
import * as mtg_register from "../register/registerController";
import * as appState from "../appState";
import * as appRootScopeEvent from "../appRootScopeEvent";

import * as headerTpl from "../header/header.htm";
import * as registerTpl from "./register.htm";

"use strict";

route.$inject = [
    "$stateProvider"
];
function route($stateProvider: angular.ui.IStateProvider) {
    $stateProvider
        .state(appState.registerState, {
            url: appState.registerUrl,
            views: {
                "header": {
                    template: headerTpl.template,
                    controller: mtg_header.moduleName,
                    controllerAs: "vm"
                },
                "container": {
                    template: registerTpl.template, //mtg.register.registerTemplate,
                    controller: mtg_register.moduleName,
                    controllerAs: "vm"
                },
                "footer": {}
            }
        });
};

export function ngRegister(appModule:ng.IModule){
    appModule.config(route);
};
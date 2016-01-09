/// <reference path="../../../typings/browser.d.ts"/>
import * as appState from "../appState";
import * as mtg_header from "../header/headerController";
import * as mtg_main from "../main/mainController";
import * as headerTpl from '../header/header.htm';
import * as mainTpl from './main.htm';

"use strict";

route.$inject = [
    "$stateProvider"
];
function route($stateProvider: angular.ui.IStateProvider) {
    $stateProvider
        .state(appState.mainState, {
            url: appState.mainUrl,
            views: {
                "header": {
                    template: headerTpl.template,
                    controller: mtg_header.moduleName,
                    controllerAs: "vm",
                },
                "container": {
                    template: mainTpl.template,
                    controller: mtg_main.moduleName,
                    controllerAs: "vm"
                },
                "footer": {}
            }
        });
};

export function ngRegister(appModule:ng.IModule){
    appModule.config(route);
};
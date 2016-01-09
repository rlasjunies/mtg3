/// <reference path="../../../typings/browser.d.ts"/>
import * as mtg_header from "../header/headerController";
import * as mtg_paints from "../paints/paintsController";
import * as appState from "../appState";
import * as headerTpl from '../header/header.htm';
import * as paintsTpl from './paints.htm';

"use strict";

route.$inject = [
    "$stateProvider"
];
function route($stateProvider: angular.ui.IStateProvider) {
    $stateProvider
        .state(appState.paintsState, {
            url: appState.paintsUrl,
            views: {
                "header": {
                    template: headerTpl.template,
                    controller: mtg_header.moduleName,
                    controllerAs: "vm",
                },
                "container": {
                    template: paintsTpl.template,
                    controller: mtg_paints.moduleName,
                    controllerAs: "vm",
                },
                "footer": {}
            }
        });
};

export function ngRegister(appModule:ng.IModule){
    appModule.config(route);
};
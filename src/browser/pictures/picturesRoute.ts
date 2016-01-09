/// <reference path="../../../typings/browser.d.ts"/>
import * as satellizer from "satellizer";
import * as mtg_picturesCtrl from "./picturesController";
import * as mtg_picturesUploadCtrl from "./picturesUploadController";
import * as mtg_header from "../header/headerController";
import * as mtg_main from "../main/mainController";
import * as appState from "../appState";
import * as appRootScopeEvent from "../appRootScopeEvent";
import * as headerTpl from '../header/header.htm';
import * as picturesTpl from './pictures.htm';
import * as pictureTpl from './picture.htm';
import * as picturesUploadTpl from './picture.htm';

"use strict";

export interface IPictureRouteParams {
    fileName: string;
}

export interface IPictureStateParams extends angular.ui.IStateParamsService, IPictureRouteParams {
}

export class PictureRouteParams implements IPictureRouteParams {
    constructor(public fileName: string) { }
}

route.$inject = [
    "$stateProvider"
];
function route($stateProvider: angular.ui.IStateProvider) {
    $stateProvider
        .state(appState.picturesList, {
            url: appState.picturesListUrl,
            views: {
                "header": {
                    template: headerTpl.template,
                    controller: mtg_header.moduleName,
                    controllerAs: "vm"
                },
                "container": {
                    template: picturesTpl.template,
                    controller: mtg_picturesCtrl.moduleName,
                    controllerAs: "vm"
                },
                "footer": {}
            }
        }).state(appState.picture, {
            url: appState.picturesListUrl + "/{fileName}",
            views: {
                "header": {
                    template: headerTpl.template,
                    controller: mtg_header.moduleName,
                    controllerAs: "vm"
                },
                "container": {
                    template: picturesTpl.template,
                    controller: mtg_picturesCtrl.moduleName,
                    controllerAs: "vm"
                },
                "footer": {}
            }
        }).state(appState.picturesLoad, {
            url: appState.picturesLoadUrl,
            views: {
                "header": {
                    template: headerTpl.template,
                    controller: mtg_header.moduleName,
                    controllerAs: "vm"
                },
                "container": {
                    template: picturesUploadTpl.template,
                    controller: mtg_picturesUploadCtrl.moduleName,
                    controllerAs: "vm"
                },
                "footer": {}
            }
        });
};

export function ngRegister(appModule:ng.IModule){
    appModule.config(route);
};
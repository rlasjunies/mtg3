/// <reference path="../../../typings/browser.d.ts"/>
import * as satellizer from "satellizer";
import * as mtg_picturesSrv from "./picturesService";
import * as mtg_picturesRte from "./picturesRoute";
import * as mtg_header from "../header/headerController";
import * as mtg_main from "../main/mainController";
import * as appState from "../appState";
import * as appRootScopeEvent from "../appRootScopeEvent";
import * as mtg_notificationSrv from "../services/notificationService";

"use strict";

export var moduleName = "mtg.pictures.PicturesController";

export class PicturesController {
    pictures: mtg_picturesSrv.IPictures;

    static $inject = [
        "$rootScope",
        "$scope",
        "$http",
        "CST_API_URL",
        "notificationService",
        "$log",
        "$auth",
        "$state",
        mtg_picturesSrv.moduleName
    ];
    constructor(
        private $rootScope: ngmtg.IRootScopeService,
        private $scope: angular.IScope,
        private $http: angular.IHttpService,
        private CST_API_URL,
        private notificationService: mtg_notificationSrv.NotificationService,
        private $log: angular.ILogService,
        private $auth: satellizer.IAuthService,
        private $state: angular.ui.IStateService,
        private picturesService: mtg_picturesSrv.IPicturesService) {

        console.log(moduleName + " loaded!");

        ////header definition
        this.$rootScope.headerConfiguration = new mtg_header.HeaderConfiguration("Pictures", true, false, false, true);

        this.$scope.$on("$destroy", () => {
            //clean the header bar configuration
            this.$rootScope.headerConfiguration = new mtg_header.HeaderConfiguration();;
        });

        //add new pictures
        this.$scope.$on(appRootScopeEvent.addNew, () => {
            this.$state.go(appState.picturesLoad);
        });

        picturesService.getAll().then(
            (picturesFromServer: any) => {
                this.pictures = picturesFromServer.files;
            }).catch(
            (reason: any) => {
                this.$log.warn("Error message: \n" + JSON.stringify(reason), "Cannot load pictures resources:");
                this.notificationService.error("Error message: \n" + JSON.stringify(reason), "Cannot load paints resources:");
            });


    }

    onClick = (fileName: string): void => {
        var picturesParams: mtg_picturesRte.PictureRouteParams = new mtg_picturesRte.PictureRouteParams(fileName);
        this.$state.go(appState.picture, picturesParams);
        //this.$state.go("user", picturesParams);
    };
}

export function ngRegister(appModule:ng.IModule){
    appModule.controller(moduleName, PicturesController);
};
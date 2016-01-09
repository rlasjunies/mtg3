/// <reference path="../../../typings/browser.d.ts"/>
import * as mtg_header from "../header/headerController";
import * as mtg_main from "../main/mainController";
import * as mtg_notificationSrv from "../services/notificationService";

"use strict";
export var moduleName = "mtg.paints.PaintsController";

export interface IPaint {
    name: string;
}
export class PaintsController {
    public paints: IPaint[] = [];

    static $inject = [
        "$rootScope",
        "$scope",
        "$http",
        "CST_API_URL",
        "notificationService",
        "$log"
    ];
    constructor(
        private $rootScope: ngmtg.IRootScopeService,
        private $scope: angular.IScope,
        private $http: angular.IHttpService,
        private CST_API_URL,
        private notificationService: mtg_notificationSrv.NotificationService,
        private $log: angular.ILogService) {

        $http.get(this.CST_API_URL + "/paints")
            .error((err) => {
                this.$log.warn("Error message: \n" + JSON.stringify(err), "Cannot load paints resources:");
                this.notificationService.error("Error message: \n" + JSON.stringify(err), "Cannot load paints resources:");
            })
            .success((paints: IPaint[]) => {
                this.paints = paints;
                this.$log.debug("paints loaded from backend!");
            });

        this.$rootScope.headerConfiguration = new mtg_header.HeaderConfiguration("", true);

        this.$scope.$on("$destroy", () => {
            //clean the header bar configuration
            this.$rootScope.headerConfiguration = new mtg_header.HeaderConfiguration();;
        });

        this.$log.debug(moduleName + " loaded!");
    }
}

export function ngRegister(appModule:ng.IModule){
    appModule.controller(moduleName, PaintsController);
};
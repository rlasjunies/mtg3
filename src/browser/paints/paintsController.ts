/// <reference path="../../../typings/browser.d.ts"/>
module mtg.paints {
    "use strict";
    export var paintsControllerStringName = "mtg.paints.PaintsController";

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
            private notificationService: mtg.services.NotificationService,
            private $log:angular.ILogService) {

            $http.get(this.CST_API_URL + "/paints")
                .error((err) => {
                    this.$log.warn("Error message: \n" + JSON.stringify(err), "Cannot load paints resources:");
                    this.notificationService.error("Error message: \n" + JSON.stringify(err), "Cannot load paints resources:");
                })
                .success((paints: IPaint[]) => {
                    this.paints = paints;
                    this.$log.debug("paints loaded from backend!");
                });

            this.$rootScope.headerConfiguration = new mtg.header.HeaderConfiguration("", true);

            this.$scope.$on("$destroy",() => {
                //clean the header bar configuration
                this.$rootScope.headerConfiguration = new mtg.header.HeaderConfiguration();;
            });

            this.$log.debug(paintsControllerStringName + " loaded!");
        }
    }

    angular
        .module("app")
        .controller(mtg.paints.paintsControllerStringName, mtg.paints.PaintsController);
}

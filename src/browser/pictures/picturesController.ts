/// <reference path="../../../typings/browser.d.ts"/>
module mtg.pictures {
    "use strict";

    export var picturesControllerStringName = "mtg.pictures.PicturesController";

    export class PicturesController {
        pictures: IPictures;

        static $inject = [
            "$rootScope",
            "$scope",
            "$http",
            "CST_API_URL",
            "notificationService",
            "$log",
            "$auth",
            "$state",
            mtg.pictures.picturesServiceStringName
        ];
        constructor(
            private $rootScope: ngmtg.IRootScopeService,
            private $scope: angular.IScope,
            private $http: angular.IHttpService,
            private CST_API_URL,
            private notificationService: mtg.services.NotificationService,
            private $log: angular.ILogService,
            private $auth: satellizer.IAuthService,
            private $state: angular.ui.IStateService,
            private picturesService: mtg.pictures.IPicturesService) {

            console.log(picturesControllerStringName + " loaded!");

            ////header definition
            this.$rootScope.headerConfiguration = new mtg.header.HeaderConfiguration("Pictures", true,false,false,true);

            this.$scope.$on("$destroy",() => {
                //clean the header bar configuration
                this.$rootScope.headerConfiguration = new mtg.header.HeaderConfiguration();;
            });

            //add new pictures
            this.$scope.$on(appRootScopeEvent.addNew,() => {
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
            var picturesParams: mtg.pictures.PictureRouteParams = new mtg.pictures.PictureRouteParams(fileName);
            this.$state.go(appState.picture, picturesParams);
            //this.$state.go("user", picturesParams);
        };
    }

    angular
        .module("app")
        .controller(mtg.pictures.picturesControllerStringName, mtg.pictures.PicturesController);
}
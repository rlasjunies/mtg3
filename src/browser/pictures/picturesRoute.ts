/// <reference path="../../../typings/browser.d.ts"/>
module appState {
    "use strict";

    export var picturesLoad: string = "PICTUREUPLOAD";
    export var picturesLoadUrl: string = "/picturesupload";
    export var picturesList: string = "PICTURES";
    export var picturesListUrl: string = "/pictures";
    export var picture: string = "PICTURE";
}

module mtg.pictures {
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
                    template:mtg.header.headerTemplate,
                    controller: mtg.header.headerControllerStringName,
                    controllerAs: "vm"
                },
                "container": {
                    template: mtg.pictures.picturesTemplate,
                    controller: mtg.pictures.picturesControllerStringName,
                    controllerAs: "vm"
                },
                "footer": {}
            }
        }).state(appState.picture, {
            url: appState.picturesListUrl + "/{fileName}",
            views: {
                "header": {
                    template: mtg.header.headerTemplate,
                    controller: mtg.header.headerControllerStringName,
                    controllerAs: "vm"
                },
                "container": {
                    template: mtg.pictures.pictureTemplate,
                    controller: mtg.pictures.pictureControllerStringName,
                    controllerAs: "vm"
                },
                "footer": {}
            }
        }).state(appState.picturesLoad, {
            url: appState.picturesLoadUrl,
            views: {
                "header": {
                    template: mtg.header.headerTemplate,
                    controller: mtg.header.headerControllerStringName,
                    controllerAs: "vm"
                },
                "container": {
                    template: mtg.pictures.picturesUploadTemplate,
                    controller: mtg.pictures.pictureUploadControllerStringName,
                    controllerAs: "vm"
                },
                "footer": {}
            }
        });
    };
    angular
        .module("app")
        .config(route);
}

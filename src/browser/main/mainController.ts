/// <reference path="../../../typings/browser.d.ts"/>
import * as mtg_header from "../header/headerController";
import * as mtg_pictures from "../pictures/picturesService";
import * as mtg_notificationSrv from "../services/notificationService";

"use strict";
export var moduleName = "mtg.main.MainController";

export class MainController {
    private pictures: mtg_pictures.IPictures;
    //private gallery: caroussel.Gallery;

    static $inject = [
        "$rootScope",
        "$scope",
        "$log",
        "$mdSidenav",
        "picturesService",
        "notificationService"
    ];
    constructor(
        private $rootScope: ngmtg.IRootScopeService,
        private $scope: angular.IScope,
        private $log: angular.ILogService,
        private $mdSidenav: any,
        private picturesService: mtg_pictures.IPicturesService,
        private notificationService: mtg_notificationSrv.NotificationService
    ) {
        this.$log.debug(moduleName + " loaded!");

        this.$rootScope.headerConfiguration = new mtg_header.HeaderConfiguration("", true);

        this.$scope.$on("$destroy", () => {
            //clean the header bar configuration
            this.$rootScope.headerConfiguration = new mtg_header.HeaderConfiguration();;
        });

        //             picturesService.getAll().then(
        //                 (picturesFromServer: any) => {
        //                     this.pictures = picturesFromServer.files;
        //
        //                     //////////
        //                     //                                 this.gallery.clearItems();
        //
        //                     //jQuery.each<cpla.models.Paints>( evt.value, function ( key: number, val: cpla.models.Paints ) {
        //
        //                     //                     this.gallery.addItem( {
        //                     //                         // thumbnailUrl: val.Thumbnail,
        //                     //                         // PaintId: val.PaintId,
        //                     //                         // Name: val.Name,
        //                     //                         // Description: val.Description,
        //                     //                         // Year: val.Year,
        //                     //                         // PictureUrl: val.Picture,
        //                     //                         // Size: val.Size
        //                     //                 });
        //                     //
        //                     //             //});
        //                     //
        //                     //             this.gallery.selectFirstItem();
        //                     //                     //////////
        //                     //
        //                     //
        //                     //                 }).catch(
        //                     //                 (reason: any) => {
        //                     //                     this.$log.warn("Error message: \n" + JSON.stringify(reason), "Cannot load pictures resources:");
        //                     //                     this.notificationService.error("Error message: \n" + JSON.stringify(reason), "Cannot load paints resources:");
        //                     //                 });
        //                 }
    }
}

export function ngRegister(appModule:ng.IModule){
    appModule.controller(moduleName,MainController);
};
/// <reference path="../../../typings/browser.d.ts"/>
//module mtg.pictures {
import * as material from "angular-material";
import * as mtg_header from "../header/headerController";
import * as mtg_main from "../main/mainController";
import * as mtg_picturesService from "./picturesService";
import * as mtg_picturesCtrl from "../pictures/picturesController";
import * as mtg_picturesRte from "../pictures/picturesRoute";
import * as appState from "../appState";
import * as mtg_notificationSrv from "../services/notificationService";

"use strict";

export var moduleName = "mtg.pictures.PictureController";

export interface IPictureScope extends angular.IScope {
}

export class PictureController {
    private pictureFileName: string; //mtg.pictures.IPicture;
    static $inject = [
        "$scope",
        "$rootScope",
        "notificationService",
        "$log",
        "$stateParams",
        "picturesService",
        "$mdDialog"
    ];
    constructor(
        private $scope: IPictureScope,
        private $rootScope: ngmtg.IRootScopeService,
        private notificationService: mtg_notificationSrv.NotificationService,
        private $log: angular.ILogService,
        private $stateParams: mtg_picturesRte.IPictureStateParams,
        private picturesService: mtg_picturesService.IPicturesService,
        private $mdDialog: material.IDialogService
    ) {

        ////header definition
        this.$rootScope.headerConfiguration =
            new mtg_header.HeaderConfiguration("Picture detail", false, true, false, false, true, true);

        this.$scope.$on("$destroy", () => {
            //clean the header bar configuration
            this.$rootScope.headerConfiguration = new mtg_header.HeaderConfiguration();;
        });

        //console.log("stateparam:" + JSON.stringify(this.$stateParams));
        if (!this.$stateParams.fileName) {
            alert("fileName is missing to initialize the picture detail view!");
            console.error("fileName is missing to initialize the user detail view!");
        } else {
            this.pictureFileName = this.$stateParams.fileName;

            //register event functions

            //Save
            //this.$scope.$on("save",() => {

            //    //this.userService.update(this.user)
            //    //    .then((user: mtg.services.IUser) => {
            //    //    this.$log.debug("user saved!:" + JSON.stringify(user));
            //    //    //this.NotificationService.info("User saved!");
            //    //}).catch((err) => {
            //    //    this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot save uers resources:");
            //    //    this.NotificationService.error("Error message: \n" + JSON.stringify(err), "Cannot save users resources:");
            //    //});

            //    this.$rootScope.goBack();
            //});

            //delete
            this.$scope.$on("delete", () => {

                var confirm: material.IConfirmDialog = $mdDialog.confirm()
                    .title("Confirm deletion")
                    .textContent("You are going to delete the fileName:" + this.pictureFileName)
                    .ok("Cancel")
                    .cancel("Delete");

                //.targetEvent(ev);
                $mdDialog.show(confirm).then(() => { return true; }, () => {
                    this.picturesService.delete(this.$stateParams.fileName)
                        .then((picture: mtg_picturesService.IPicture) => {
                            this.$log.debug("user deleted!:" + JSON.stringify(picture));
                            //this.NotificationService.info("User saved!");
                        }).catch((err) => {
                            this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot delete picture resource!");
                            this.notificationService.error("Error message: \n" + JSON.stringify(err), "Cannot delete resource!");
                        });

                    this.$rootScope.goBack();
                });
            });

            //this.$scope.$watch(() => this.$scope.userForm.$invalid,(newValue, oldValue) => {
            //    //console.log("watch [" + newValue + "] -> [" + oldValue + "]");
            //    if (newValue) {
            //        this.$scope.$emit("invalid");
            //    } else {
            //        this.$scope.$emit("valid");
            //    }
            //});
        }

        this.$log.debug(moduleName + ": Constructor");
    }
}

// angular
//     .module("app")
//     .controller(moduleName, PictureController);
// // }


export function ngRegister(appModule:ng.IModule){
    appModule.controller(moduleName, PictureController);
};
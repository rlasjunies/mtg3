/// <reference path="../../../typings/browser.d.ts"/>
/// <reference path="../../../typings/angular-file-upload-missing.d.ts"/>
import * as satellizer from "satellizer";
import * as mtg_picturesSrv from "../pictures/picturesService";
import * as mtg_picturesCtrl from "./picturesController";
import * as mtg_header from "../header/headerController";
import * as mtg_main from "../main/mainController";
import * as appState from "../appState";
import * as appRootScopeEvent from "../appRootScopeEvent";
import * as mtg_notificationSrv from "../services/notificationService";

"use strict";

interface IUploadFileEvt {
    loaded: number;
    total: number;
    config: any;
}

export var moduleName = "mtg.pictures.PicturesUploadController";

export class PicturesUploadController {
    files: File[];
    uploader: any;

    static $inject = [
        "$scope",
        "$rootScope",
        "$http",
        "CST_API_URL",
        "notificationService",
        "$log",
        "FileUploader",
        "$auth",
        "$state"
    ];
    constructor(
        private $scope: angular.IScope,
        private $rootScope: ngmtg.IRootScopeService,
        private $http: angular.IHttpService,
        private CST_API_URL,
        private notificationService: mtg_notificationSrv.NotificationService,
        private $log: angular.ILogService,
        private fileUploader,
        private $auth: satellizer.IAuthService,
        private $state: angular.ui.IStateService) {

        console.log(moduleName + " loaded!");

        //header definition
        this.$rootScope.headerConfiguration = new mtg_header.HeaderConfiguration("Upload pictures", false, true);

        this.$scope.$on("$destroy", () => {
            //clean the header bar configuration
            this.$rootScope.headerConfiguration = new mtg_header.HeaderConfiguration();;
        });

        var fileUploadConfig: any //RL during conversion to ES6 angular.FileUpload.FileUploadConfig;

        fileUploadConfig = {
            url: "/api/pictures/upload",
            autoUpload: true,
            removeAfterUpload: true,
            headers: {
                "authorization": "Bearer " + this.$auth.getToken()
            }
        };
        this.uploader = new this.fileUploader(fileUploadConfig);

        this.uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            //console.info("onWhenAddingFileFailed", item, filter, options);
        };
        this.uploader.onAfterAddingFile = function(fileItem) {
            //console.info("onAfterAddingFile", fileItem);
        };
        this.uploader.onAfterAddingAll = function(addedFileItems) {
            //console.info("onAfterAddingAll", addedFileItems);
        };
        this.uploader.onBeforeUploadItem = function(item) {
            //console.info("onBeforeUploadItem", item);
        };
        this.uploader.onProgressItem = function(fileItem, progress) {
            //console.info("onProgressItem", fileItem, progress);
        };
        this.uploader.onProgressAll = function(progress) {
            //console.info("onProgressAll", progress);
        };
        this.uploader.onSuccessItem = function(fileItem, response, status, headers) {
            //console.info("onSuccessItem", fileItem, response, status, headers);
        };
        this.uploader.onErrorItem = function(fileItem, response, status, headers) {
            //console.info("onErrorItem", fileItem, response, status, headers);
        };
        this.uploader.onCancelItem = function(fileItem, response, status, headers) {
            //console.info("onCancelItem", fileItem, response, status, headers);
        };
        this.uploader.onCompleteItem = (fileItem, response, status, headers) => {
            //console.info("onCompleteItem", fileItem, response, status, headers);
        };
        this.uploader.onCompleteAll = () => {
            //console.info("onCompleteAll");
            this.$rootScope.goBack();
        };

        //console.info("uploader", this.uploader);

    }
}

export function ngRegister(appModule: ng.IModule) {
    appModule.controller(moduleName, PicturesUploadController);
};
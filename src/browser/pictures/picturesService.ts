/// <reference path="../../../typings/browser.d.ts"/>
"use strict";
export var moduleName = "picturesService";

export interface IPicturesService {
    getAll(): angular.IPromise<IPictures>;
    delete(uniqueId: string): angular.IPromise<IPicture>;
}

export interface IPicture {
    //fileName: string;
    string;
}

export interface IPictures {
    //[index: number]: String;
    //pictures: IPicture[];
    [index: number]: IPicture;
}

class PicturesService implements IPicturesService {
    static $inject = ["$http"];

    constructor(private $http: angular.IHttpService) {
    }

    getAll(): angular.IPromise<IPictures> {
        return this.$http
            .get("/api/pictures")
            .then((response: angular.IHttpPromiseCallbackArg<IPictures>): IPictures => {
                return <IPictures>response.data;
            });
    }

    delete(fileNameToDelete: string): angular.IPromise<IPicture> {
        return this.$http
            .delete("/api/pictures/" + fileNameToDelete).
            then((response: angular.IHttpPromiseCallbackArg<IPicture>): IPicture => {
                return <IPicture>response.data;
            });
    }
}

export function ngRegister(appModule:ng.IModule){
    appModule.service(moduleName,PicturesService);
};
"use strict";
const moduleName: string = "mtg.services.SiteSettingsService";

export interface ISiteSettings {
    title: string;
    description: string;
    themeName: string;
    availableThemeNames: string[];
}

export interface ISiteSettingsService {
    getSettings(): angular.IPromise<ISiteSettings>;
    getThemes(): angular.IPromise<string[]>;
    updateSettings(siteSettings: ISiteSettings): void;
}

export class SiteSettingsService implements ISiteSettingsService {
    constructor(private $http: angular.IHttpService,
        private CST_API_URL: string) {
    }

    getSettings(): angular.IPromise<ISiteSettings> {
        return this.$http.get(this.CST_API_URL + "/site")
            .then((response: angular.IHttpPromiseCallbackArg<ISiteSettings>): ISiteSettings => {
                return <ISiteSettings>response.data;
            });
    }

    updateSettings(siteSettings: ISiteSettings): void {
        throw new Error("not implemented yet!");
    }

    getThemes(): angular.IPromise<string[]> {
        return this.$http.get(this.CST_API_URL + "/themes")
            .then((response: angular.IHttpPromiseCallbackArg<string[]>): string[] => {
                return <string[]>response.data;
            });
    }
}

factory.$inject = [
    "$http",
    "CST_API_URL"
];
function factory($http: angular.IHttpService,
    CST_API_URL: string): ISiteSettingsService {
    return new SiteSettingsService($http, CST_API_URL);
}

export function ngRegister(appModule:ng.IModule){
    appModule.factory(moduleName,factory);
};
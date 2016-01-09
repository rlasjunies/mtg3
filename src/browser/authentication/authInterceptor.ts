/// <reference path="../../../typings/browser.d.ts"/>
/// <reference path="../../../typings/satellizer-missing.d.ts"/>
import * as satellizer from "satellizer";

"use strict";

var moduleName = "browser.authentication.authInterceptor"
export class AuthInterceptor {

    constructor(private $auth: satellizer.IAuthService) {
    }

    request = (config) => {
        var token = this.$auth.getToken();

        if (token) {
            config.headers.Authorization = "Bearer " + token;
        }

        return config;
    };

    response = (response) => {
        return response;
    };
}

factory.$inject = [
    "$auth"
];
function factory(
    $auth: satellizer.IAuthService) {
    return new AuthInterceptor($auth);
};

export function ngRegister(appModule:ng.IModule){
    appModule.factory(moduleName, factory);
};

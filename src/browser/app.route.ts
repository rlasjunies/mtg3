// /// <reference path="../../typings/browser.d.ts"/>
"use strict";

route.$inject = [
    "$urlRouterProvider"
];
// function route($urlRouterProvider, $httpProvider: ng.IHttpProvider) {
export function route($urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    //$httpProvider.interceptors.push("AuthInterceptor");

};


export function ngRegister(appModule:ng.IModule){
    appModule.config(route);
};
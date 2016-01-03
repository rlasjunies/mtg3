/// <reference path="../../typings/browser.d.ts"/>
module mtg.route {
    "use strict";

    route.$inject = [
        "$urlRouterProvider"
    ];
    // function route($urlRouterProvider, $httpProvider: ng.IHttpProvider) {
    function route($urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        // $httpProvider.interceptors.push("AuthInterceptor");

    };
    angular
        .module("app")
        .config(route);
}

/// <reference path="../../typings/browser.d.ts"/>
"use strict";

config.$inject = ["$locationProvider"];
export function config($locationProvider: angular.ILocationProvider): void {
    $locationProvider.html5Mode(true);
    console.log("window.location@config:" + window.location.protocol + "//" + window.location.host);
}

// angular
//     .module("app")
//     .config(["cfpLoadingBarProvider", function(cfpLoadingBarProvider) {
//         cfpLoadingBarProvider.includeSpinner = false;
//     }]);

// angular
//     .module("app")
//     .config(config);
// }
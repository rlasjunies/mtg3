/// <reference path="../../typings/browser.d.ts"/>
import * as satellizer from "satellizer";
import * as material from "angular-material";

//module mtg.views.index {
"use strict";

interface IIndexScope {
}

export let moduleName:string = "mtg.views.index.IndexController";

export class IndexController {
    public isAuthenticated: Function;

    static $inject = [
        "$scope",
        "$auth",
        "$mdSidenav",
        "$log"
    ];
    constructor(
        private $scope: angular.IScope,
        private $auth: satellizer.IAuthService,
        private $mdSidenav: material.ISidenavService,
        private $log: angular.ILogService) {
        this.isAuthenticated = this.$auth.isAuthenticated;
        if (!this.$auth.isAuthenticated()) {
            this.$auth.removeToken();
        };

        this.$log.debug("IndexController: Constructor");
    }

    onSwipeRight = (): void => {
        this.$mdSidenav("left").open();
    };

    onSwipeLeft = (): void => {
        this.$mdSidenav("left").close();
    };

    toggleLeft = (): void =>{
        this.$mdSidenav("left").toggle();
    }


}

// angular
//     .module("app")
//     .controller("mtg.views.index.IndexController", IndexController);

//console.log("indexController loaded!");

export function ngRegister(appModule:ng.IModule){
    appModule.controller(moduleName,IndexController);
};


/// <reference path="../../../typings/browser.d.ts"/>
module mtg.authentication {
    "use strict";
    var CST_KEY : string = "TOKEN";
    export class AuthToken {
        storage : Storage;
        cachedToken: string;
        constructor(private $window: angular.IWindowService, private $log:angular.ILogService) {
            this.storage = $window.localStorage;
            this.$log.debug("authToken service ... loaded");
        }

        setToken = (token: string): void => {
            this.cachedToken = token;
            this.storage.setItem(CST_KEY, token);
            this.$log.debug("authToken: SetToken");
        };

        getToken = () : string => {
            if (!this.cachedToken) {
                this.cachedToken = this.storage.getItem(CST_KEY);
            }
            return this.cachedToken;
        };

        remove = () : void => {
            this.cachedToken = null;
            this.storage.removeItem(CST_KEY);
            this.$log.debug("remove token");
        };

        isAuthenticated = (): boolean => {
            if (this.getToken() === null) {
                return false;
            }
            return true;
        };
    }

    factory.$inject = [
        "$window","$log"
    ];
    function factory($window:angular.IWindowService, $log) : mtg.authentication.AuthToken {
        return new mtg.authentication.AuthToken($window, $log);
    }

    angular
        .module("app")
        .factory("AuthToken", factory);
}

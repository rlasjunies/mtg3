/// <reference path="../../../typings/browser.d.ts"/>
/// <reference path="../../../typings/satellizer-missing.d.ts"/>
module mtg.authentication {
    "use strict";
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
        return new mtg.authentication.AuthInterceptor($auth);
    };
}

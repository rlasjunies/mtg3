/// <reference path="../../../typings/browser.d.ts"/>
module appState {
    "use strict";

    export var loginState: string = "login";
    export var loginUrl: string = "/login";
}

module mtg.views.login {
    "use strict";

    route.$inject = [
        "$stateProvider"
    ];
    function route($stateProvider: angular.ui.IStateProvider) {
        $stateProvider
            .state(appState.loginState, {
            url: appState.loginUrl,
            views: {
                "header": {
                    template: mtg.header.headerTemplate,
                    controller: mtg.header.headerControllerStringName,
                    controllerAs: "vm"
                },
                "container": {
                    template: mtg.login.loginTemplate,
                    controller: mtg.login.loginControllerStringName,
                    controllerAs: "vm"
                },
                "footer": {}
            }
            });
    };
    angular
        .module("app")
        .config(route);
}

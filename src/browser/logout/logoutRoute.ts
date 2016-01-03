/// <reference path="../../../typings/browser.d.ts"/>
module appState {
        "use strict";

        export var logoutState: string = "logout";
        export var logoutUrl: string = "/logout";
    }

module mtg.views.logout {
    "use strict";

    route.$inject = [
        "$stateProvider"
    ];
    function route($stateProvider: angular.ui.IStateProvider) {
        $stateProvider
            .state(appState.logoutState, {
            url: appState.logoutUrl,
            views: {
                "header": {},
                "container": {
                    templateUrl: mtg.logout.logoutTemplate,
                    controller: mtg.logout.logoutControllerStringName,
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

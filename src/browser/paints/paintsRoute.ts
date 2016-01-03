/// <reference path="../../../typings/browser.d.ts"/>
module appState {
    "use strict";

    export var paintsState: string = "paints";
    export var paintsUrl: string = "/paints";
}
module mtg.views.paints {
    "use strict";

    route.$inject = [
        "$stateProvider"
    ];
    function route($stateProvider: angular.ui.IStateProvider) {
        $stateProvider
            .state(appState.paintsState, {
                url: appState.paintsUrl,
                views: {
                    "header": {
                        template: mtg.header.headerTemplate,
                        controller: mtg.header.headerControllerStringName,
                        controllerAs: "vm",
                     },
                    "container": {
                        template: mtg.paints.paintsTemplate,
                        controller: mtg.paints.paintsControllerStringName,
                        controllerAs: "vm",
                    },
                    "footer": {}
                }
            });
    };
    angular
        .module("app")
        .config(route);
}

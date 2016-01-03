/// <reference path="../../../typings/browser.d.ts"/>
namespace appState {
    "use strict";

    export const mainState: string = "main";
    export const mainUrl: string = "/";
}

namespace mtg.main {
    "use strict";

    route.$inject = [
        "$stateProvider"
    ];
    function route($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state(appState.mainState, {
                url: appState.mainUrl,
                views: {
                    "header": {
                        template: mtg.header.headerTemplate,
                        controller: mtg.header.headerControllerStringName,
                        controllerAs: "vm",
                    },
                    "container": {
                        template: mtg.main.mainTemplate,
                        controller: mtg.main.mainControllerStringName,
                        controllerAs: "vm"
                    },
                    "footer": { }
                }
            });
    };
    angular
        .module("app")
        .config(route);
}

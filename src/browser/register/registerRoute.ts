namespace appState {
    "use strict";

    export var registerState: string = "register";
    export var registerUrl: string = "/register";
}

namespace mtg.register {
    "use strict";

    route.$inject = [
        "$stateProvider"
    ];
    function route($stateProvider: angular.ui.IStateProvider) {
        $stateProvider
            .state(appState.registerState, {
            url: appState.registerUrl,
            views: {
                "header": {
                    template: mtg.header.headerTemplate,
                    controller: mtg.header.headerControllerStringName,
                    controllerAs: "vm"
                    },
                "container": {
                    template: mtg.register.registerTemplate,
                    controller: mtg.register.registerControllerStringName,
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

module appState {
    "use strict";

    export var users: string = "users";
    export var usersUrl: string = "/users";
    export var user: string = "user";
}

module mtg.users {
    "use strict";

    export interface IUserRouteParams {
        userId: string;
    }

    export interface IUserStateParams extends angular.ui.IStateParamsService, IUserRouteParams {
    }

    export class UserRouteParams implements IUserRouteParams{
        constructor(public userId: string) { }
    }

    route.$inject = [
        "$stateProvider"
    ];
    function route($stateProvider: angular.ui.IStateProvider) {
        $stateProvider
            .state(appState.users, {
            url: appState.usersUrl,
                views: {
                    "header": {
                        template: mtg.header.headerTemplate,
                        controller: mtg.header.headerControllerStringName,
                        controllerAs: "vm"
                    },
                    "container": {
                        template: mtg.users.usersTemplate,
                        controller: mtg.users.usersControllerStringName,
                        controllerAs: "vm"
                    },
                    "footer": {}
                }
            })
            .state(appState.user, {
            url: appState.usersUrl + "/{userId}",
            views: {
                "header": {
                    template: mtg.header.headerTemplate,
                    controller: mtg.header.HeaderController,
                    controllerAs: "vm"
                },
                "container": {
                    template: mtg.users.userTemplate,
                    controller: mtg.users.userControllerStringName,
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

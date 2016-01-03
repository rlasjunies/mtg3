///< reference path="../../typings/browser.d.ts"/>
module mtg.users {
    "use strict";

    export var usersControllerStringName = "mtg.users.UsersController";


    //export interface IUser {
    //    _id: string;
    //    email: string;
    //    password: string;
    //    active: boolean;
    //    googleId: string;
    //    facebookId: string;
    //    displayName: string;
    //}
    export class UsersController {
        public users: mtg.users.IUsers = [];
        public usersView: mtg.users.IUser[] = [];

        static $inject = [
            "$scope",
            "$rootScope",
            "$http",
            "CST_API_URL",
            "notificationService",
            "$log",
            "$mdDialog",
            "$filter",
            "$state",
            "UserService"
        ];
        constructor(
            private $scope: angular.IScope,
            private $rootScope: ngmtg.IRootScopeService,
            private $http: angular.IHttpService,
            private CST_API_URL,
            private notificationService: mtg.services.NotificationService,
            private $log: angular.ILogService,
            private $mdDialog,
            private $filter,
            private $state: angular.ui.IStateService,
            private userService: mtg.users.IUserService) {

            ////header definition
            this.$rootScope.headerConfiguration = new mtg.header.HeaderConfiguration("Users", true, false, false, false, false, false);

            this.$scope.$on("$destroy",() => {
                //clean the header bar configuration
                this.$rootScope.headerConfiguration = new mtg.header.HeaderConfiguration();;
            });

            this.userService.getAll().then((users: mtg.users.IUsers): void => {
                this.users = users;
                this.usersView = [].concat(this.users);
                this.$log.debug("users loaded!");
            }).catch((err) => {
                this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot load users resources:");
                this.notificationService.error("Error message: \n" + JSON.stringify(err), "Cannot load users resources:");
                });

            this.$log.debug("UsersController: Constructor");
        }

        onClick = (userID: string): void => {
            var userParams: mtg.users.UserRouteParams = new mtg.users.UserRouteParams(userID);
            this.$state.go("user", userParams);
        };
    }

    angular
        .module("app")
        .controller(mtg.users.usersControllerStringName, mtg.users.UsersController);
}

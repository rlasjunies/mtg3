module mtg.sidenav {
    "use strict";

    export var sidenavControllerStringName = "mtg.sidenav.SidenavController";

    interface ISidenavScope {
        // isAuthenticated(): boolean;
    }

    export class SidenavController {
        // public isAuthenticated: Function;
        // public $auth:  //any; //: services.AuthToken;

        static $inject = [
            "$scope",
            "$auth",
            "$mdSidenav",
            "$log",
            "userLoggedService"
        ];

        constructor(
            private $scope: angular.IScope,
            private $auth,
            private $mdSidenav:any,
            private $log: angular.ILogService,
            private userLoggedService: mtg.services.IUserLoggedService) {

            this.$log.debug("SidenavController: Constructor");

        }

        close() : void {
            this.$mdSidenav("left").close().then(() => {
                    //this.$log.debug("toggle left is done@sideNavController");
                });
        }
    }

    angular
        .module("app")
        .controller(mtg.sidenav.sidenavControllerStringName, mtg.sidenav.SidenavController);
}


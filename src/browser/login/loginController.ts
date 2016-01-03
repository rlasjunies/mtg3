/// <reference path="../../../typings/browser.d.ts"/>
namespace mtg.login {
    "use strict";

    export var loginControllerStringName = "mtg.login.LoginController";

    export interface ILogin {
        submit: () => void;
    };

    // interface ILoginRootScope extends ngmtg.IRootScopeService {
    // }

    export class LoginController implements mtg.register.IController {
        public email: string;
        public password: string;
        public myvalid: boolean = true;

        static $inject = [
            "$rootScope",
            "$scope",
            "notificationService",
            "$state",
            "$auth",
            "$log",
            "userLoggedService"
        ];
        constructor (
            private $rootScope: ngmtg.IRootScopeService,
            private $scope: angular.IScope,
            private notificationService: mtg.services.NotificationService,
            private $state: angular.ui.IStateService,
            private $auth: satellizer.IAuthService,
            private $log: angular.ILogService,
            private userLoggedService: mtg.services.IUserLoggedService) {
            this.$log.debug("LoginController: Constructor");

            this.$rootScope.headerConfiguration = new mtg.header.HeaderConfiguration("", true);

            this.$scope.$on("$destroy",() => {
                //clean the header bar configuration
                this.$rootScope.headerConfiguration = new mtg.header.HeaderConfiguration();;
            });
        }

        submit = () => {
            this.$auth.login<mtg.authentication.IAuthenticationServerResponse>({ email: this.email, password: this.password })
                .then((response) => {
                    //Initialize the logged user
                    this.userLoggedService.login(response.data.user);

                    //Welcome back the user
                    var msg = "Thanks '" + response.data.user.email + "' for coming back!";
                    this.$log.debug(msg);
                    this.notificationService.success(msg);

                    //Notify if the user is not activated
                    if (!this.userLoggedService.active) {
                        msg = "Do not forget to active your account via the email sent!";
                        this.notificationService.warning(msg);
                    }

                    //Navigate to the main page
                    this.$state.go("main");
                })
                .catch((err) => {
                    this.$log.error("login:" + JSON.stringify(err));
                    this.notificationService.error("Error registering!" + JSON.stringify(err));

                    //clean the user logged
                    this.userLoggedService.logout();
                });
        };

        authenticate = (provider:string) => {
            this.$auth.authenticate<mtg.authentication.IAuthenticationServerResponse>(provider).then((response) => {

                //initialize the user logged
                this.userLoggedService.login(response.data.user);

                 //Welcome back the user
                var msg = "Thanks '" + response.data.user.email + "' for coming back!";
                this.$log.debug(msg);
                this.notificationService.success(msg);

                //Navigate to the main page
                this.$state.go("main");
            }).catch((err) => {
                this.$log.error("login:" + JSON.stringify(err));
                this.notificationService.error("Error registering!");

                //clean the user logged
                this.userLoggedService.logout();
                });
        };
    }

    angular
        .module("app")
        .controller(mtg.login.loginControllerStringName, mtg.login.LoginController);
}

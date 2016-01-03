namespace mtg.register {
    "use strict";

    export var registerControllerStringName = "mtg.register.RegisterController";

    export interface IController {
        submit: () => void;
    };

    export class RegisterController implements register.IController {
        public email: string;
        public password: string;
        public passwordConfirm: string;

        static $inject = [
            "$rootScope",
            "$scope",
            "notificationService",
            "$auth",
            "$state",
            "$log"
        ];
        constructor(
            private $rootScope: ngmtg.IRootScopeService,
            private $scope: angular.IScope,
            private notificationService: mtg.services.NotificationService,
            private $auth : satellizer.IAuthService,
            private $state: angular.ui.IStateService,
            private $log:angular.ILogService) {

            this.password = "";
            this.passwordConfirm = "";

            this.$scope.$watch(() => this.password, this.checkPasswords);
            this.$scope.$watch(() => this.passwordConfirm, this.checkPasswords);

            this.$rootScope.headerConfiguration = new mtg.header.HeaderConfiguration("", false, true);

            this.$scope.$on("$destroy",() => {
                //clean the header bar configuration
                this.$rootScope.headerConfiguration = new mtg.header.HeaderConfiguration();;
            });


            this.$log.debug("RegisterController: Constructor");
        }

        checkPasswords = () => {
            this.$scope["register"]["password_confirm"].$setValidity("equal", (this.password === this.passwordConfirm));
        };

        submit = () => {
            this.$auth.signup<mtg.authentication.IAuthenticationServerResponse>({ email: this.email, password: this.password })
                .then((response) => {
                    this.$log.info("registration is fine!");

                    var msg = "Dear '" + response.data.user.email +
                        "' you are now registered!. Goes in your mailbox to confirm your email address " +
                        " within 12 hours.";
                    this.notificationService.success(msg);
                    this.$scope.$broadcast("userupdated");
                    this.$state.go("main");
                })
                .catch((err) => {
                    this.$log.error("registration is wrong bad:" + JSON.stringify(err));
                    this.notificationService.error("Error registering!" + JSON.stringify( err));
                    this.$scope.$broadcast("userupdated");
                });
        };
    }

    angular
        .module("app")
        .controller(mtg.register.registerControllerStringName, mtg.register.RegisterController);
}

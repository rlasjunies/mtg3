module mtg.services {
    "use strict";

    class Config implements angular.material.IToastOptions {
        hideDelay: number;
        content: string;
    }

    export class NotificationService {
        toastConfig: angular.material.IToastOptions ;


        constructor(private $mdToast:angular.material.IToastService, private $log:angular.ILogService) {
            this.toastConfig = new Config();
            //this.toastConfig.position = new ngmd.toastPosition();
            this.toastConfig.hideDelay = 1000;
            //this.toastConfig.position.right = true;
            //this.toastConfig.position.bottom = true;

            //toastr.options = {
            //    "positionClass": "toast-bottom-right",
            //};
            this.$log.debug("notificationService ... loaded");
        }

        public success(message: string, title?: string): void {
            if (title === undefined) {
                title = "";
            }
            //toastr.success(message, title);
            //this.toastConfig.content = title;
            var toast = this.$mdToast.simple()
                .textContent(message)
                .hideDelay(1000);
            //.action('OK');
            //.highlightAction(false)
            //.position($scope.getToastPosition());
            this.$mdToast.show(toast);
            //this.$mdToast.show(toast).then(function () {
            //    alert('You clicked \'OK\'.');
            //});

        }

        public error(message: string, title?:string): void {
            if (title === undefined) {
                title = "";
            }
            //toastr.error(message, title);
            var toast = this.$mdToast.simple()
                .textContent(message)
                .hideDelay(1000);
            this.$mdToast.show(toast);
        }

        public info(message: string, title?: string): void {
            if (title === undefined) {
                title = "";
            }
            //toastr.info(message, title);
            var toast = this.$mdToast.simple()
                .textContent(message)
                .hideDelay(1000);
            this.$mdToast.show(toast);
        }

        public warning(message: string, title?: string): void {
            if (title === undefined) {
                title = "";
            }
            //toastr.warning(message, title);
            var toast = this.$mdToast.simple()
                .textContent(message)
                .hideDelay(1000);
            this.$mdToast.show(toast);
        }
    }

    factory.$inject = [
        "$mdToast",
        "$log"
    ];
    function factory($mdToast, $log) {
        return new mtg.services.NotificationService($mdToast,$log);
    }

    angular
        .module("app")
        .factory("notificationService", factory);
}

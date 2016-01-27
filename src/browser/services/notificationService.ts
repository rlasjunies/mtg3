import * as material from "angular-material";
export const moduleName: string = "notificationService";

"use strict";

class Config implements material.IToastOptions {
    hideDelay: number;
    content: string;
}

export class NotificationService {
    toastConfig: material.IToastOptions;


    constructor(private $mdToast: material.IToastService, private $log: angular.ILogService) {
        this.toastConfig = new Config();
        this.$log.debug("notificationService ... loaded");
    }

    /**
     * Raise success full notification. The notification will be hidden after 1000 ms
     * @param  {string} message : message to show to the user
     * @param  {string} title? : title of the notification
     * @returns void
     */
    public success(message: string, title?: string): void {
        if (title === undefined) {
            title = "";
        }
        var toast = this.$mdToast.simple()
            .textContent(message)
            .hideDelay(1000);
        this.$mdToast.show(toast);
    }

    /**
     * Raise Error notification
     * @param  {string} message : message to show to the user
     * @param  {string} title? : title of the notification
     * @returns void
     */
    public error(message: string, title?: string): void {
        if (title === undefined) {
            title = "";
        }
        var toast = this.$mdToast.simple()
            .theme("red")
            .textContent(message)
            .highlightAction(true);
        this.$mdToast.show(toast);
    }

    public info(message: string, title?: string): void {
        if (title === undefined) {
            title = "";
        }
        var toast = this.$mdToast.simple()
            .textContent(message);
        this.$mdToast.show(toast);
    }

    public warning(message: string, title?: string): void {
        if (title === undefined) {
            title = "";
        }
        var toast = this.$mdToast.simple()
            .textContent(message);
        this.$mdToast.show(toast);
    }
}

factory.$inject = [
    "$mdToast",
    "$log"
];
function factory($mdToast, $log) {
    return new NotificationService($mdToast, $log);
}


export function ngRegister(appModule: ng.IModule) {
    appModule.factory(moduleName, factory);
};

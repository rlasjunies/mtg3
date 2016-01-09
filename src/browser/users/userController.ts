import * as mtg_notification from "../services/notificationService";
import * as mtg_authorization from "../authorization/authorizationService";
import * as satellizer from "satellizer";
import * as mtg_header from "../header/headerController";
import * as mtg_main from "../main/mainController";
import * as appState from "../appState";
import * as appRootScopeEvent from "../appRootScopeEvent";
import * as mtg_notificationSrv from "../services/notificationService";
import * as mtg_usersRte from "../users/usersRoute";
import * as mtg_usersSrv from "../users/usersService";

"use strict";

export var moduleName = "mtg.users.UserController";

export interface IUserScope extends angular.IScope {
    userForm: any;
}

export interface IUIRole {
    code: string;
    allowed: boolean;
}

export class UserController {
    private user: mtg_usersSrv.IUser;
    public uiRoles: IUIRole[] = [];

    static $inject = [
        "$scope",
        "$rootScope",
        "$http",
        "CST_API_URL",
        "notificationService",
        "$log",
        "$stateParams",
        "$mdBottomSheet",
        "UserService",
        "AuthorizationService",
        "$mdDialog",
        "$q"
    ];
    constructor(
        private $scope: IUserScope,
        private $rootScope: ngmtg.IRootScopeService,
        private $http: angular.IHttpService,
        private CST_API_URL,
        private notificationService: mtg_notification.NotificationService,
        private $log: angular.ILogService,
        private $stateParams: mtg_usersRte.IUserStateParams,
        private $mdBottomSheet: any,
        private userService: mtg_usersSrv.IUserService,
        private authorizationService: mtg_authorization.IAuthorizationService,
        private $mdDialog: any,
        private $q: angular.IQService) {

        //console.log("stateparam:" + JSON.stringify(this.$stateParams));
        if (!this.$stateParams.userId) {
            var msg = "UserId is missing to initialize the user detail view!";
            alert(msg);
            console.error(msg);
        } else {
            //userID exists

            ////header definition
            this.$rootScope.headerConfiguration =
                new mtg_header.HeaderConfiguration("User detail", false, true, false, false, true, true);

            this.$scope.$on("$destroy", () => {
                //clean the header bar configuration
                this.$rootScope.headerConfiguration = new mtg_header.HeaderConfiguration();;
            });

            //call the back end to retrieve the val
            this.userService.getById(this.$stateParams.userId).then((user: mtg_usersSrv.IUser) => {
                this.user = user;
                this.$log.debug("user loaded!:" + JSON.stringify(this.user));
            }).then(() => {
                this.loadRoles();
            }).catch((err) => {
                var msg = "Error message: \n" + JSON.stringify(err) + "\nCannot load uers resources:";
                this.$log.error(msg);
                this.notificationService.error(msg);
            });

            //register event functions

            //Save
            this.$scope.$on("save", this.saveUSer);

            //delete
            this.$scope.$on("delete", this.deleteUser);

            //Raise event to the app when the form is invalid
            this.$scope.$watch(() => this.$scope.userForm.$invalid, (newValue, oldValue) => {
                //console.log("watch [" + newValue + "] -> [" + oldValue + "]");
                if (newValue) {
                    this.$scope.$emit(appRootScopeEvent.invalidForm);
                } else {
                    this.$scope.$emit(appRootScopeEvent.validForm);
                }
            });
        }

        this.$log.debug("UserController: Constructor");
    }

    allowRole = (role: IUIRole) => {
        if (role.allowed) {
            this.authorizationService.addRole(this.user.allowedRoles, role.code);
            this.$log.info("role:" + role.code + " selected: allowed");
        } else {
            this.authorizationService.removeRole(this.user.allowedRoles, role.code);
            this.$log.info("role:" + role.code + " selected: NOT allowed");
        }

    };

    saveUSer = () => {
        this.userService.update(this.user)
            .then((user: mtg_usersSrv.IUser) => {
                this.$log.debug("user saved!:" + JSON.stringify(user));
                //this.NotificationService.info("User saved!");
            }).catch((err) => {
                this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot save uers resources:");
                this.notificationService.error("Error message: \n" + JSON.stringify(err), "Cannot save users resources:");
            });

        this.$rootScope.goBack();
    };

    deleteUser = () => {
        var confirm = this.$mdDialog.confirm()
            .title("Confirm deletion")
            .content("You are going to delete the user:" + this.user.displayName)
            .ariaLabel("Lucky day")
            .ok("Cancel")
            .cancel("Delete");

        //.targetEvent(ev);
        this.$mdDialog.show(confirm).then(() => { return true; }, () => {
            //$scope.alert = 'You decided to get rid of your debt.';
            this.userService.delete(this.$stateParams.userId)
                .then((user: mtg_usersSrv.IUser) => {
                    this.$log.debug("user deleted!:" + JSON.stringify(user));
                    //this.NotificationService.info("User saved!");
                }).catch((err) => {
                    this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot save uers resources:");
                    this.notificationService.error("Error message: \n" + JSON.stringify(err), "Cannot save users resources:");
                });

            this.$rootScope.goBack();
        });
    };

    loadRoles = () => {
        this.authorizationService.getAllRoles().then((roles: mtg_authorization.IRole[]): void => {
            this.$log.debug("roles loaded!");
            this.user.allowedRoles = this.user.allowedRoles === undefined ? [] : this.user.allowedRoles;

            for (var i = 0; i < roles.length; i++) {
                this.uiRoles.push({
                    allowed: this.authorizationService.hasGotRole(this.user.allowedRoles, roles[i].id),
                    code: roles[i].id,
                });
            }
        }).catch((err: Error) => {
            this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot load roles resources:");
            this.notificationService.error("Error message: \n" + JSON.stringify(err), "Cannot load roles resources:");
        });
    };

}

export function ngRegister(appModule: ng.IModule) {
    appModule.controller(moduleName, UserController);
};
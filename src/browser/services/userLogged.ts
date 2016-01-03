module mtg.services {
    "use strict";

    export interface IUserLoggedService {
        isAuthenticated: boolean;
        email: string;
        displayName: string;
        active: boolean;
        picture: string;

        login(userBackend: mtg.users.IUser);
        logout();
    }

    class UserLoggedService implements IUserLoggedService {
        isAuthenticated: boolean;
        email: string;
        displayName: string;
        active: boolean;
        picture: string;

        static $inject = [
            "$http",
            "$auth"];
        constructor(private $http: angular.IHttpService,
            private $auth: satellizer.IAuthService) {
            this.isAuthenticated = false;
            this.$auth.logout();
            this.$auth.removeToken();
            this.logout();
        }

        login = (userBackend:mtg.users.IUser):void => {
            this.email = userBackend.email;
            this.displayName = userBackend.displayName || "";
            this.isAuthenticated = true;
            this.active = userBackend.active;
            this.picture = userBackend.picture || "";
        };

        logout = ():void => {
            this.email = "";
            this.displayName = "";
            this.isAuthenticated = false;
            this.active = false;
            this.picture = "";
        };

    }

    angular
        .module("app")
        .service("userLoggedService", UserLoggedService);
}
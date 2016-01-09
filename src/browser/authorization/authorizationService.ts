/// <reference path="../../../typings/browser.d.ts"/>

"use strict";
export var authorizatinServiceStringName = "AuthorizationService";

export interface IAuthorizationService {
    addRole(roles: string[], roleID: string): void;
    getAllAccessRights(): angular.IPromise<IAccessRights>;
    getAllRoles(): angular.IPromise<IRoles>;
    hasGotRole(roles: string[], roleID: string): boolean;
    removeRole(roles: string[], roleID: string): void;
}

export interface IAccessRight {
    //string;
    id: string;
    description: string;
}

export interface IAccessRights {
    //[index: number]: String;
    //pictures: IPicture[];
    [index: number]: IAccessRight;
}

export interface IRole {
    id: string;
    accessRightCode: string[];
}

export interface IRoles {
    [index: number]: IRole;
}
class AuthorizationService implements IAuthorizationService {
    static $inject = ["$http"];

    constructor(private $http: angular.IHttpService) {
    }

    getAllAccessRights(): angular.IPromise<IAccessRights> {
        return this.$http.get("/api/authorization/accessrights")
            .then((response: angular.IHttpPromiseCallbackArg<IAccessRights>): IAccessRights => {
                return <IAccessRights>response.data;
            });
    }

    getAllRoles(): angular.IPromise<IRoles> {
        return this.$http.get("/api/authorization/roles")
            .then((response: angular.IHttpPromiseCallbackArg<IRoles>): IRoles => {
                return <IRoles>response.data;
            });
    }

    addRole(roles: string[], roleID: string): void {
        if (roles[roleID] === undefined) {
            roles.push(roleID);
        }
    }

    removeRole(roles: string[], roleID: string): void {
        var index = roles.indexOf(roleID);
        roles.splice(index, 1);
    }

    hasGotRole(roles: string[], roleID: string): boolean {
        return roles.indexOf(roleID) === -1 ? false : true;
    }
}

export function ngRegister(appModule:ng.IModule){
    appModule.service(authorizatinServiceStringName, AuthorizationService);
}
// }
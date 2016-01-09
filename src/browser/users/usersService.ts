"use strict";
export var moduleName = "UserService";

export interface IUserService {
    getById(uniqueId: string): angular.IPromise<IUser>;
    getMe(): angular.IPromise<IUser>;
    getAll(): angular.IPromise<IUsers>;
    update(user: IUser): angular.IPromise<IUser>;
    updateMe(user: IUser): angular.IPromise<IUser>;
    delete(uniqueId: string): angular.IPromise<IUser>;
}

//export class AllowedAccessRights{
//    [key:string]:boolean;
//}

export interface IUser {
    _id: string;
    email: string;
    displayName: string;
    picture: string;
    active: boolean;
    //allowedRoles: mtg.authorization.IRole[];
    allowedRoles: string[];
}

export interface IUsers {
    [index: number]: IUser;
}

export class UserService implements IUserService {
    static $inject = ["$http"];
    constructor(private $http: angular.IHttpService) {
    }

    getMe(): angular.IPromise<IUser> {
        return this.$http.get("/api/adm/users/me")
            .then((response: angular.IHttpPromiseCallbackArg<IUser>): IUser => {
                return <IUser>response.data[0];
            });
    }

    getById(uniqueId: string): angular.IPromise<IUser> {
        return this.$http.get("/api/adm/users/" + uniqueId)
            .then((response: angular.IHttpPromiseCallbackArg<IUser>): IUser => {
                return <IUser>response.data[0];
            });
    }

    getAll(): angular.IPromise<IUsers> {
        return this.$http.get("/api/adm/users/")
            .then((response: angular.IHttpPromiseCallbackArg<IUsers>): IUsers => {
                return <IUsers>response.data;
            });
    }

    update(user: IUser): angular.IPromise<IUser> {
        return this.$http.put("/api/adm/users/" + user._id, user).then((response: angular.IHttpPromiseCallbackArg<IUser>): IUser => {
            return <IUser>response.data;
        });
    }

    updateMe(user: IUser): angular.IPromise<IUser> {
        return this.$http.put("/api/adm/users/me", user).then((response: angular.IHttpPromiseCallbackArg<IUser>): IUser => {
            return <IUser>response.data;
        });
    }

    delete(uniqueId: string): angular.IPromise<IUser> {
        return this.$http.delete("/api/adm/users/" + uniqueId).then((response: angular.IHttpPromiseCallbackArg<IUser>): IUser => {
            return <IUser>response.data;
        });
    }

}

export function ngRegister(appModule:ng.IModule){
    appModule.service(moduleName,UserService);
};
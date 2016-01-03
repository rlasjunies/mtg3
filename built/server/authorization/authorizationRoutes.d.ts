/// <reference path="../../../typings/server.d.ts" />
export interface IAccessRight {
    id: string;
    description: string;
}
export interface IAccessRights {
    [index: number]: IAccessRight;
}
export interface IRole {
    id: string;
    accessRightCode: string[];
}
export interface IRoles {
    [index: number]: IRole;
}
export declare var roles: IRoles;
export declare function init(): void;

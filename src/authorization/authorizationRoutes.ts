/// <reference path="../../typings/tsd.d.ts" />
import * as e from "express";
import * as fs from "fs-extra";
import * as mtg from "../services/mtg";
import * as path from "path";
//import * as eValidator from "express-validator";

var moduleName = "authorizationRoutes@";


//TODO how to share this with UI project?
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

export var roles:IRoles = [
    {
        id: "admin",
        accessRightCode:[
            "USERS_GET_ID",
            "USERS_POST_CREATE",
            "USERS_DELETE_ID",
            "USERS_PUT_ID",
            "ROLES_GET_ALL",
            "PAINTS_POST",
            "PAINTS_GET_ID",
            "PAINTS_DELETE_ID",
            "PAINTS_PUT_ID"]},
    {
        id:"guest",
        accessRightCode:[]},
    {
        id:"artist",
        accessRightCode:[]}];

export function init(){
    var rootRoute = "/api/authorization/roles";
    mtg.routeGetAdd(    rootRoute   ,true, "ROLES_GET_ALL"       , getAllRoles);
}


function getAllRoles(expReq: e.Request, expRes: e.Response, next: Function) {

    //expReq.checkParams("id", "id parameter is mandatory").notEmpty().isInt();

    //TODO refactor the code to provide a generic file function and share it with hasRole function ...
    var sourceFile = mtg.server.rolesFileName;
    mtg.log.info("read roles file:" + sourceFile);

    // fs.exists(sourceFile, (isFileExisting: boolean) => {
    //     if (!isFileExisting) {
    //         expRes
    //             .status(406)
    //             .header({ 'content-type': 'application/json' })
    //             .send({ error: true, errorMsg: "Roles File is missing" });
    //     } else {
    //         fs.readFile(sourceFile, "utf8", (err: Error, data: any) => {
    //             if (err) {
    //                 expRes.status(500)
    //                     .header({ 'content-type': 'application/json' })
    //                     .send({ error: true, errorMsg: "Error Reading Access right files" });
    //             } else {
    //                 expRes
    //                     .status(200)
    //                     .header({ 'content-type': 'application/json' })
    //                 //.send({ "prop": "value" });
    //                     .send(data);
    //             }
    //         });
    //     }
    // });

    expRes
        .status(200)
        .header({ 'content-type': 'application/json' })
        .send(roles);

}
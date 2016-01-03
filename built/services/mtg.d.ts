import * as winston from "winston";
import * as express from "express";
import * as mdlUsers from "../users/user.dao";
import * as mdlPaints from "../paints/paint.model";
export declare class Server {
    rootPath: string;
    picturesPath: string;
    dataPath: string;
    accessRightFileName: string;
    rolesFileName: string;
    emailVerificationFileName: string;
    constructor(rootPath: string);
}
export declare enum enumEnvironment {
    development = 0,
    testlocal = 1,
    test = 2,
    production = 3,
}
export declare var util: any;
export declare var log: winston.LoggerInstance;
export declare var server: Server;
export declare var environment: enumEnvironment;
export declare var app: express.Application;
export interface dbCollections {
    users: mdlUsers.UsersCollection;
    paints: mdlPaints.PaintsCollection;
}
export declare var db: dbCollections;
export declare function init(rootPath: string): void;
export declare function routeGetAdd(path: string, authenticate: boolean, accessRight: string, ...f: express.RequestHandler[]): void;
export declare function routePostAdd(path: string, authenticate: boolean, accessRight: string, ...f: express.RequestHandler[]): void;
export declare function routeDeleteAdd(path: string, authenticate: boolean, accessRight: string, ...f: express.RequestHandler[]): void;
export declare function routePutAdd(path: string, authenticate: boolean, accessRight: string, ...f: express.RequestHandler[]): void;

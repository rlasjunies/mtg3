import * as winston from "winston";
import * as express from "express";
import * as bodyparser from "body-parser";
import * as path from "path";
import * as morgan from "morgan";

//import {logger as $log} from "./logger";
import * as $log from "./logger";
import * as stringPolyFill from "./string+";
import * as mdlUsers from "../users/user.dao";
import * as mdlPaints from "../paints/paint.model";

import * as authLocal from "../authentication/localAuth";
import * as authorization from "../authorization/authorization.middleware";

export class Server {
    rootPath: string;
    picturesPath: string;
    dataPath: string;
    accessRightFileName: string;
    rolesFileName: string;
    emailVerificationFileName: string;

    constructor(rootPath: string) {
        this.rootPath = rootPath;
        this.dataPath = path.join(this.rootPath, "../api_data");
        this.picturesPath = path.join(this.dataPath, "pictures");
        this.rolesFileName = path.join(this.dataPath, "authorization/roles.json");
        //this.accessRightFileName = path.join(this.dataPath, "authorization/accessRight.json");
        this.emailVerificationFileName = path.join(this.rootPath, "authentication/emailVerification.html");
    }
}

class Util {
    string = stringPolyFill;
}

export enum enumEnvironment {
    development,
    testlocal,
    test,
    production
}

export var util;// = new Util();
export var log = $log.logger;
export var server: Server;// = new Server();
export var environment: enumEnvironment;
export var app:express.Application = express();
app.use(bodyparser.json());

morgan.token("statuscolorized", (expReq, expRes): string => {
    var color = 32; // green
    var status = expRes.statusCode;
    if (status >= 500) { color = 31; } // red
    else if (status >= 400) {color = 33;} // yellow
    else if (status >= 300) {color = 36;} // cyan
    return "\x1b[" + color + "m:" + status +"\x1b[0m";
});

app.use(morgan(":date[iso] :method :url :statuscolorized :response-time ms - :res[content-length]"));

export interface dbCollections {
    users: mdlUsers.UsersCollection;
    paints: mdlPaints.PaintsCollection;
}
export var db: dbCollections = <dbCollections>{};


export function init(rootPath: string) {
    util = new Util();
    server = new Server(rootPath);
    app.use(express.static(server.rootPath));

    if (!process.env.NODE_ENV) {
        throw "NODE_ENV is missing define: development, testlocal, test or production";
    } else {
        switch (process.env.NODE_ENV) {
            case "development":
                environment = enumEnvironment.development;
                log.info("development environment");
                break;

            case "testlocal":
                environment = enumEnvironment.testlocal;
                log.info("testlocal environment");
                break;

            case "test":
                environment = enumEnvironment.test;
                break;

            case "production":
                environment = enumEnvironment.production;
                break;

            default:
                throw "NODE_ENV is not correct fill: define development, testlocal, test or production";;
                break;
        }
    }

    db.users = new mdlUsers.UsersCollection();
    log.info(`mtg initialized - rootPath:${server.rootPath}`);
};

export function routeGetAdd(path:string,authenticate:boolean, accessRight:string, ...f:express.RequestHandler[]){
    var args:any = [this.app.get,path,authenticate,accessRight,f];
    routeAdd.apply(this,args);
}

export function routePostAdd(path:string,authenticate:boolean, accessRight:string, ...f:express.RequestHandler[]){
    var args:any = [app.post,path,authenticate,accessRight,f];
    routeAdd.apply(this,args);
}
export function routeDeleteAdd(path:string,authenticate:boolean, accessRight:string, ...f:express.RequestHandler[]){
    var args:any = [app.delete,path,authenticate,accessRight,f];
    routeAdd.apply(this,args);
}
export function routePutAdd(path:string,authenticate:boolean, accessRight:string, ...f:express.RequestHandler[]){
    var args:any = [app.put,path,authenticate,accessRight,f];
    routeAdd.apply(this,args);
}
/**
 * @param  {Function} funcAddingRoute generic function to create routes
 * @param  {string} route: route added to the portal
 * @param  {boolean} authenticate: check authentication
 * @param  {string} accessRight: null does not check accessRight
 * @param  {express.RequestHandler[]} ...f
 */
function routeAdd(funcAddingRoute:Function, path:string,authenticate:boolean, accessRight:string,...f:express.RequestHandler[]){
    var args:any = [path];
    if (authenticate){
        args.push(authLocal.authenticationCheck)
    }
    if(accessRight !== null){
        args.push(authorization.checksAccessRight(accessRight))
    }

    args.push(f);
    funcAddingRoute.apply(app, args);
}
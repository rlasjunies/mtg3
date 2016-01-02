import {logger as $log} from "./logger";
import * as stringPolyFill from "./string+";
import * as path from "path";
import * as mdlUsers from "../models/users";
import * as mdlPaints from "../models/paints";

class Server {
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
export var log = $log;
export var server: Server;// = new Server();
export var environment: enumEnvironment;

interface dbCollections {
    users: mdlUsers.UsersCollection;
    paints: mdlPaints.PaintsCollection;
}
export var db: dbCollections = <dbCollections>{};

export function init(rootPath: string) {
    util = new Util();
    server = new Server(rootPath);

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
import * as mtg from "../services/mtg";
import * as path from "path";

// import * as $Config from "./config";
// import * as $ConfigSecret from "./configSecret";
//import {logger as $log} from "../services/logger";
var dbstore = require("nedb");

export class DB {
    private db: NeDB.NeDBDataStore;
    constructor(collection: string) {
        if (mtg.environment === mtg.enumEnvironment.testlocal) {
            //use of in memory db for local testing
            this.db = new dbstore();
        } else {
            this.db = new dbstore({ filename: path.join(mtg.server.rootPath, collection), autoload: true });
        }
    }

    insert<T>(doc: T): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.db.insert<T>(doc, (err: Error, docInserted: T) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docInserted);
                }
            })
        });
    }

    findOneById<T>(id: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.db.findOne<T>({ _id: id }, (err, docFound) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docFound)
                }
            });
        });
    }

    findOne<T>(query: any): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.db.findOne<T>(query, (err, docFound) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docFound);
                }
            });
        });
    }

    remove(query: any): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.db.remove(query, (err, numberOfRecordRemoved) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(numberOfRecordRemoved);
                }
            });
        });
    }


    findAll<T>(query: any): Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => {
            this.db.find<T>(query, (err, docsFound) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docsFound);
                }
            });
        });
    }

    count(query: any): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.db.count(query, (err, numberOfRecord) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(numberOfRecord);
                }
            })
        });
    }

    update<T>(id:string, doc:T): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.db.update({_id:id}, doc, (err, numberOfRecord) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(numberOfRecord);
                }
            })
        });
    }
}
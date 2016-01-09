/// <reference path="../../../typings/server.d.ts" />

import * as express from "express";

import * as mtg from "../services/mtg";

var moduleName = "usersRoutes@";

export function init(){
    var rootRoute = "/api/adm/users/";

    mtg.routePostAdd(   rootRoute           ,true, "USERS_POST_CREATE"  , create);
    mtg.routeGetAdd(    rootRoute + ":id?"  ,true, "USERS_GET_ID"       , find);
    mtg.routeDeleteAdd( rootRoute + ":id?"  ,true, "USERS_DELETE_ID"    , remove);
    mtg.routePutAdd(    rootRoute + ":id?"  , true,"USERS_PUT_ID"       , update);

    //
    // rootRoute = "/api/adm/users/me";
    // app.get(rootRoute, authLocal.authenticationCheck, $UsersRoutes.findMe);
    // app.put(rootRoute, authLocal.authenticationCheck, $UsersRoutes.updateMe);
}

//Create
export function create(expReq: express.Request, expRes: express.Response, next:Function) {
    mtg.log.profile(`${moduleName}@create`);

    mtg.log.warn("TODO - Check user json before insert");
    let user = expReq.body;

    mtg.log.warn("Check the expReq.body message");

    mtg.db.users.createNew(user)
        .then((insertedUser)=>{
            mtg.log.debug(`${moduleName}@create:${insertedUser}`);
            mtg.log.profile(`${moduleName}@create`);
            expRes.status(200).send([user]);})
        .catch((err)=>{
            expRes.status(500).write({ message: "Error writing job!" });
        });
};

//find
export function find(expReq: express.Request, expRes: express.Response, next:Function) {
    mtg.log.profile(moduleName + "@find");
    if ( expReq.params.id){
        mtg.db.users.findById(expReq.params.id)
            .then((userFound)=>{
                mtg.log.debug("expReq.params.id:" + expReq.params.id);
                mtg.log.profile(moduleName + "@find");
                expRes.status(200).send(userFound);
            })
            .catch((err)=>{
                expRes.status(500).write({ message: "Error getting users!" });
            });
    }else{
        mtg.db.users.getAll().then((usersFound)=>{
                expRes.status(200).send(usersFound);
        }).catch((err)=>{
                expRes.status(500).write({ message: "Error getting users!" });
        })
    }

};

//remove
export function remove(expReq: express.Request, expRes: express.Response, next:Function) {
    mtg.log.profile(moduleName + "@remove");

    if (expReq.params.id){
        mtg.db.users.findById(expReq.params.id)
            .then((userFound)=>{
                if(userFound){
                    mtg.db.users.removeById(expReq.params.id)
                        .then((numberOfRecordRemoved)=>{
                            mtg.log.debug("remove user:" + expReq.params.id);
                            mtg.log.profile(moduleName + "@remove");
                            expRes.status(200).send(userFound);
                        }).catch((err)=>{
                            mtg.log.error("remove user: message: Error removing users." + expReq.params.id);
                            mtg.log.profile(moduleName + "@remove");
                            expRes.status(500).write({ message: "Error removing users." + expReq.params.id});
                        });
                }else{
                    mtg.log.error("remove user: message: Error removing users. User not found" + expReq.params.id);
                    mtg.log.profile(moduleName + "@remove");
                    expRes.status(500).write({ message: "Error removing users. User not found:" + expReq.params.id});
                }
            })
            .catch((err)=>{
                mtg.log.error("remove user: message: Error removing users. User not found" + expReq.params.id);
                mtg.log.profile(moduleName + "@remove");
                expRes.status(500).write({ message: "Error removing users!:" + expReq.params.id});
            });

    }else{
        mtg.log.error("remove user: message: Incorrect id!" + expReq.params.id);
        mtg.log.profile(moduleName + "@remove");
        expRes.status(500).write({ message: "Incorrect id!" });
    }
}

//update
export function update(expReq: express.Request, expRes: express.Response, next:Function) {
    mtg.log.profile(moduleName + "@update");
    //TODO control parameters

    if (!expReq.params.id) {
        throw new Error("ID parameter is required!");
    }

    mtg.db.users.update(expReq.params.id,expReq.body)
        .then((numberOfRecordUpdated)=>{
            mtg.log.profile(moduleName + "@update");
            expRes.status(200).send({numberOfRecordUpdated:numberOfRecordUpdated});
        })
        .catch((err)=>{
            expRes.status(500).write({ message: "Error updating user!" + JSON.stringify(err) });
        })
};

//findMe
export function findMe(expReq: express.Request, expRes: express.Response, next:Function) {
 let msg = `${moduleName}@findMe not implemented yet!`;
    mtg.log.error(msg);
    return expRes.status(500).write({ message: msg });
};


//updateMe
export function updateMe(expReq: express.Request, expRes: express.Response, next:Function) {
 let msg = `${moduleName}@updateMe not implemented yet!`;
    mtg.log.error(msg);
    return expRes.status(500).write({ message: msg });
};



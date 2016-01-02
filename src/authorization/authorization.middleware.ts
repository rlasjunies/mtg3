import * as e from "express";
import * as mtg from "../services/mtg";
import * as fs from "fs-extra";
//import * as $usersModel from "../shared/user";
import * as authorization from "./authorizationRoutes";

var moduleName = "authorizationService@";

// export function checksRole(roles:string[]) {
//     return function (req:e.Request, res:e.Response, next:Function) {
//         var allowed:boolean= false;
// 
//         for (var role of roles){
//             if ( req.user.allowedRoles.indexOf(role) !== -1){
//                 allowed=true;
//             }
//         }
// 
//         if (!allowed) {
//              var msg = "Not allowed; Missing role:" + roles.concat(",");
//              $.log.info(msg);
//              res.status(403).send({ message: msg });
//         } else {
//              next();
//         }
//     }
// }


export function checksAccessRight(accessRight:string) {
    return function (req:e.Request, res:e.Response, next:Function) {
        var allowed:boolean= false;

        loadAccessRightFromRoles(req.user.allowedRoles,(accessRights:string[])=>{
            //$.log.info(`found:${accessRight} in :[${JSON.stringify(accessRights)}]`)
            mtg.log.info("accessRights:" + JSON.stringify(accessRights));
            mtg.log.info(`accessRights.indexOf(${accessRight}):`+accessRights.indexOf(accessRight));
            if ( accessRights.indexOf(accessRight) !== -1){
                allowed=true;
            }

            if (!allowed) {
                 var msg = "Not allowed; Missing accessRight:" + accessRight;
                 mtg.log.warn(msg);
                 res.status(403).send({ message: msg });
            } else {
                 next();
            }
        });
    }
}

function loadAccessRightFromRoles(userRoles:string[],callback:(accessRights:string[]) => void){
    // fs.exists(mtg.server.rolesFileName,(isFileExisting: boolean) => {
    //     if (!isFileExisting) {
    //         throw new Error(`Roles definition file does not exists!!!:${mtg.server.rolesFileName}`);
    //     } else {
    //         fs.readFile(mtg.server.rolesFileName,"utf8", (err: Error, data:string) => {
    //             if (err) {
    //         throw new Error(`Cannot read the roles definition file!!!:${mtg.server.rolesFileName}`);
    //             } else {
    //                 let accessRights:string[] = [];
    //                 let fileRoles : any[] = JSON.parse(data.slice(1)); //I've got an strange caracter at the beginning => slice it
                    let accessRights:string[] = [];
                    let fileRoles : any[] = <any[]>authorization.roles;
                    
                    //concat all the accessright arrays
                    for ( let userRole of userRoles){
                        let fileRole: any;

                        mtg.log.debug(`userrole:${userRole}`)
                        for ( let tmpFileRole of fileRoles){
                           if ( tmpFileRole.id == userRole){
                               fileRole = tmpFileRole;
                                //How to go out of a for loop?
                           }
                        }

                        if (fileRole){
                            accessRights = accessRights.concat(fileRole.accessRightCode);
                        }else{
                            mtg.log.error(`Unknown role:${userRole}`);
                        }
                    }
                   mtg.log.info(`accessright: ${accessRights.toString()} \n allowed for:${userRoles}`  );
                   callback(accessRights);
    //             }
    //         });
    //     }
    // });
}
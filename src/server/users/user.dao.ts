///< reference path="../../../typings/server.d.ts"/>
import * as bcrypt from "bcryptjs";

import * as db from "../services/db";
import * as mtg from "../services/mtg";
import * as userMdl from "./user.model";
import * as pwdDB from "./pwd.dao";
import * as pwdMdl from "./pwd.model";

export class UsersCollection extends db.DB {
    private pwdDB: pwdDB.PwdCollection;
    constructor() {
        this.pwdDB = new pwdDB.PwdCollection();
        super("user.nedb");
        this.count({})
            .then((numberOfRecord) => {
                if (numberOfRecord === 0) {
                    //Initialisation
                    let newGuestUser: userMdl.IUser = {
                        email: "guest@autotest.com",
                        password: "secret",
                        active: true,
                        googleId: "",
                        facebookId: "",
                        displayName: "Guest user",
                        picture: "",
                        allowedRoles: ["guest"]
                    }
                    this.createNewInternalUser(newGuestUser)
                        .then((pwdGuestUserCreated) => {
                            mtg.log.info(`user ${pwdGuestUserCreated.email} created - change password asap!`);
                        })
                        .catch((err) => {
                            console.log("can not create initial users!!!");
                        })

                    let newAdminUser: userMdl.IUser = {
                        email: "admin@autotest.com",
                        password: "secret",
                        active: true,
                        googleId: "",
                        facebookId: "",
                        displayName: "Administrator",
                        picture: "",
                        allowedRoles: ["admin"]
                    }
                    this.createNewInternalUser(newAdminUser)
                        .then((pwdAdminUserCreated) => {
                            mtg.log.info(`user ${pwdAdminUserCreated.email} created - change password asap!`);
                        })
                        .catch((err) => {
                            console.log("can not create initial users!!!");
                        })
                } else {
                    mtg.log.info(`numberofRecord:${numberOfRecord}`);
                }
            })
            .catch((err) => {
                mtg.log.error("Error initiating the user database");
            });
    }

    createNewInternalUser(userToCreate: userMdl.IUser): Promise<userMdl.IUserDoc> {
        //TODO parameters check
        //TODO check email format
        //TODO check already exist

        var salt: string = bcrypt.genSaltSync(10)
        var password: string = bcrypt.hashSync(userToCreate.password, salt);
        delete userToCreate.password; //remove the password before to persist
        var userCreatedLocal: userMdl.IUserDoc;

        return this.insert(userToCreate)
            .then((userCreated): Promise<pwdMdl.IPwdDoc>=> {
                userCreatedLocal = userCreated;
                return this.pwdDB.createUpdatePWD({ email: userCreated.email, password: password })
            })
            .then((pwdCreated: pwdMdl.IPwdDoc): userMdl.IUserDoc=> {
                return userCreatedLocal;
            })
            .catch((err) => {
                console.log("Error in createNewInternalUser")
                throw (err);
            })
    }

    /**
     * register external user authentication in the repository
     * @param  {userMdl.IUser} user
     * @returns Promise
     */
    createNewexternalUser(user: userMdl.IUser): Promise<userMdl.IUserDoc> {
        //TODO parameters check
        //TODO check email format
        //TODO check already exist

        //return super.insert<IUser>(user);
        // return new Promise<userMdl.IUserDoc>((resolve, reject) => {
        //     super.insert<userMdl.IUserDoc>(user).then((userCreated) => {
        //         resolve(userCreated);
        //     }).catch((err) => {
        //         reject(err);
        //     })
        // })
        return this.insert<userMdl.IUserDoc>(user);
    }


    /**
     * Basic update of whole the document
     *
     * TODO: update parts AR in different services
     *
     * @Param {string} userID - the _id value of the document
     * @param {number} d The desired diameter of the circle.
     * @return {Circle} The new Circle object.
     */
    update(userId: string, query: any): Promise<userMdl.IUserDoc> {
        //TODO parameters check

        return super.update<userMdl.IUserDoc>(userId, query);
    }

    findById(id: string): Promise<userMdl.IUserDoc> {
        // return new Promise<userMdl.IUserDoc>((resolve, reject) => {
        //     super.findOne<userMdl.IUserDoc>({ _id: id })
        //         .then((userFound: userMdl.IUserDoc) => {
        //             delete userFound.password;
        //             resolve(userFound);
        //         })
        //         .catch((err) => {
        //             reject(err);
        //         });
        // });
        return super.findOne<userMdl.IUserDoc>({ _id: id });
    };

    removeById(id: string): Promise<number> {
        // return new Promise<number>((resolve, reject) => {
        //     super.remove({ _id: id })
        //         .then((numberOfRecordDeleted) => {
        //             resolve(numberOfRecordDeleted);
        //         })
        //         .catch((err) => {
        //             reject(err);
        //         });
        // });

        return super.remove({ _id: id });
    };

    getAll(): Promise<userMdl.IUserDoc[]> {
        // return new Promise<userMdl.IUserDoc[]>((resolve, reject) => {
        //     super.findAll<userMdl.IUserDoc>({})
        //         .then((usersFound: userMdl.IUserDoc[]) => {
        //             // if (!usersFound) {
        //             //     //delete usersFound.password;
        //             // }
        //             resolve(usersFound);
        //         })
        //         .catch((err) => {
        //             reject(err);
        //         });
        // });
        return super.findAll<userMdl.IUserDoc>({});
    };

    findByEmailAndComparePassword(email: string, password: string): Promise<userMdl.IUserDoc> {
        var userFoundLocal:userMdl.IUserDoc = null;

        return super.findOne<userMdl.IUserDoc>({ email: email })
            .then((userFound: userMdl.IUserDoc):Promise<pwdMdl.IPwdDoc> => {
                if (userFound) {
                    userFoundLocal = userFound;
                    return this.pwdDB.findOne<pwdMdl.IPwdDoc>({email:email});
                }else {
                    throw new Error(`User email:${email} is not registered`);
                }
            })
            .then((pwdRecord:pwdMdl.IPwdDoc):Promise<boolean>=>{
                return this.comparePromised(password,pwdRecord.password);
            })
            .then((same:boolean):userMdl.IUserDoc=>{
                if(same){
                    return userFoundLocal
                }else{
                    return null;
                }
            })
            .catch((err) => {
                mtg.log.error("Error in findByEmailAndComparePassword:\n" + err);
                throw err;
            });
    };

    findByEmail(email: string): Promise<userMdl.IUserDoc> {
        return super.findOne({ email: email });
    };

    count(query: any): Promise<number> {
        return super.count(query);
    }

    comparePromised(data:string, hash:string):Promise<boolean>{
        return new Promise<boolean>((resolve,reject)=>{
            bcrypt.compare(data,hash,(err:Error,same:boolean)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(same);
                }
            })
        })
    }
};
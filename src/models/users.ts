import * as db from "../services/db";
import * as mtg from "../services/mtg"
import * as bcrypt from "bcryptjs";

export interface IDocument {
    _id?: string;
    version?: number;
}

export interface IUser extends IDocument {
    email: string;
    password?: string;
    active: boolean;
    googleId: string;
    facebookId: string;
    displayName: string;
    picture: string;
    allowedRoles: string[];
    toJSON?: () => any;
}

export class UsersCollection extends db.DB {
    constructor() {
        //TODO separate users and pwd values db
        super("user.nedb");
        this.count({})
            .then((numberOfRecord) => {
                if (numberOfRecord === 0) {
                    //Initialisation
                    let newGuestUser: IUser = {
                        email: "guest@autotest.com",
                        password: "secret",
                        active: true,
                        googleId: "",
                        facebookId: "",
                        displayName: "",
                        picture: "",
                        allowedRoles: ["guest"]
                    }
                    this.createNew(newGuestUser)
                        .then((userGuest) => {
                            // this.update(userGuest._id, { $push: { allowedRoles: 'guest' } }).then((user) => {
                            mtg.log.info(`user guest created - change password asap:${JSON.stringify(userGuest) }`);
                            // })
                        });
                    let newAdminUser: IUser = {
                        email: "admin@autotest.com",
                        password: "secret",
                        active: true,
                        googleId: "",
                        facebookId: "",
                        displayName: "",
                        picture: "",
                        allowedRoles: ["admin"]
                    }
                    this.createNew(newAdminUser)
                        .then((userAdmin) => {
                            // this.update(userAdmin._id, { $push: { allowedRoles: 'admin' } }).then((user) => {
                                mtg.log.info(`user admin created - change password asap:${JSON.stringify(userAdmin) }`);
                            // })
                        });
                } else {
                    mtg.log.info(`numberofRecord:${numberOfRecord}`);
                }
            })
            .catch((err) => {
                mtg.log.error("Error initiating the user database");
            });
    }

    createNew(user: IUser): Promise<IUser> {
        //TODO parameters check
        //TODO check email format
        //TODO check already exist

        var salt: string = bcrypt.genSaltSync(10)
        user.password = bcrypt.hashSync(user.password, salt);

        //return super.insert<IUser>(user);
        return new Promise<IUser>((resolve,reject)=>{
            super.insert<IUser>(user).then((userCreated)=>{
                delete userCreated.password;
                resolve(userCreated);
            }).catch((err)=>{
                reject(err);
            })
        })
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
    update(userId: string, query: any): Promise<IUser> {
        //TODO parameters check

        return super.update<IUser>(userId, query);
    }

    findById(id: string): Promise<IUser> {
        return new Promise<IUser>((resolve, reject) => {
            super.findOne<IUser>({ _id: id })
                .then((userFound: IUser) => {
                    delete userFound.password;
                    resolve(userFound);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

    removeById(id: string): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            super.remove({ _id: id })
                .then((numberOfRecordDeleted) => {
                    resolve(numberOfRecordDeleted);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };
    
    getAll(): Promise<IUser[]> {
        return new Promise<IUser[]>((resolve, reject) => {
            super.findAll<IUser>({})
                .then((usersFound: IUser[]) => {
                    // if (!usersFound) {
                    //     //delete usersFound.password;
                    // }
                    resolve(usersFound);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

    findByEmailAndComparePassword(email: string, password: string): Promise<IUser> {
        return new Promise<IUser>((resolve, reject) => {
            super.findOne<IUser>({ email: email })
                .then((userFound: IUser) => {
                    if (userFound) {
                        if (this.comparePassword(password, userFound.password)) {
                            // delete the password property before send back
                            delete userFound.password;
                        } else {
                            // free the object before to send it back
                            userFound = null;
                        }
                    }
                    resolve(userFound);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

    findByEmail(email: string): Promise<IUser> {
        return super.findOne({ email: email });
    };

    count(query: any): Promise<number> {
        return super.count(query);
    }

    comparePassword(password: string, hash: string): boolean {
        mtg.log.profile("comparePassword");
        //TODO rewrite the code to be async
        var samePassword: boolean = bcrypt.compareSync(password, hash);
        mtg.log.profile("comparePassword");
        return samePassword;
    }
};
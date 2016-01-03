import * as db from "../services/db";
import * as userMdl from "./user.model";
export declare class UsersCollection extends db.DB {
    constructor();
    createNew(user: userMdl.IUser): Promise<userMdl.IUserDoc>;
    /**
     * Basic update of whole the document
     *
     * TODO: update parts AR in different services
     *
     * @Param {string} userID - the _id value of the document
     * @param {number} d The desired diameter of the circle.
     * @return {Circle} The new Circle object.
     */
    update(userId: string, query: any): Promise<userMdl.IUserDoc>;
    findById(id: string): Promise<userMdl.IUserDoc>;
    removeById(id: string): Promise<number>;
    getAll(): Promise<userMdl.IUserDoc[]>;
    findByEmailAndComparePassword(email: string, password: string): Promise<userMdl.IUserDoc>;
    findByEmail(email: string): Promise<userMdl.IUserDoc>;
    count(query: any): Promise<number>;
    comparePassword(password: string, hash: string): boolean;
}

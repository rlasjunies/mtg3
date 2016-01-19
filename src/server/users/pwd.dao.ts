///< reference path="../../../typings/server.d.ts"/>
import * as bcrypt from "bcryptjs";

import * as db from "../services/db";
import * as mtg from "../services/mtg";
import * as pwdMdl from "./pwd.model";

export class PwdCollection extends db.DB {
    constructor() {
        //TODO separate users and pwd values db
        super("pwd.nedb");
    }

    createUpdatePWD(pwdRecord:pwdMdl.IPwd): Promise<pwdMdl.IPwdDoc> {

        // var salt: string = bcrypt.genSaltSync(10)
        // password = bcrypt.hashSync(password, salt);

        return this.findOne<pwdMdl.IPwdDoc>({email:pwdRecord.email})
            .then((pwdFound)=>{
                if(!pwdFound){
                    return this.insert<pwdMdl.IPwdDoc>(pwdRecord)
                }else{
                    return this.update<pwdMdl.IPwdDoc>( pwdFound._id, pwdRecord)
                }
            })
            .catch((err)=>{
                console.log(err);
                throw err;
            })
    }


};
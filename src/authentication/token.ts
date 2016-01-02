import * as express from "express";
import * as jwt from "jwt-simple";
import * as moment from "moment";
import * as $configSecret from "../services/configSecret";
//import * as $user from '../shared/user';
import * as mdlUser from "../users/user.model";

export function createSendToken(user:mdlUser.IUserDoc, res:express.Response) {
    var payload = {
        sub: user._id,
        // TODO check that the expiration is well managed by the token
        // expiration should be renewed everytime the user, is doing somehitng!!!
        exp: moment().add(360, "minutes").unix()
    };

    ////console.log("Create expiration date:" + moment().format());
    ////console.log("Create expiration date exp:" + moment.unix(payload.exp).format());
    ////console.log("exp1" + moment().add(1, "minute").format());

    //var exp = moment();
    //exp.add(1, "minute");
    //console.log("exp2" + exp.format("unix"););


    var token = jwt.encode(payload, $configSecret.JWT_SECRET);

    // RL- attention changement
    return res.status(200).send({
        //user: user.toJSON(),
        user: user,
        token: token
    });
}

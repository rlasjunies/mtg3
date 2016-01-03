import * as express from "express";
import * as mdlUser from "../users/user.model";
export declare function createSendToken(user: mdlUser.IUserDoc, res: express.Response): express.Response;

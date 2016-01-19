///< reference path="../../../typings/server.d.ts"/>
export interface IPwd {
    email:string;
    password: string;
}

export interface IPwdDoc extends IPwd {
    _id?: string;
    //version?: number;
}
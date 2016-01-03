import * as express from "express";
export declare function register(expReq: express.Request, expRes: express.Response, info: any): void;
export declare function login(expReq: express.Request, expRes: express.Response, info: any): void;
export declare function authenticationCheck(expReq: express.Request, expRes: express.Response, next: Function): express.Response;

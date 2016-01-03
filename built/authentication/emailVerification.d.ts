import * as e from "express";
export declare function send(email: string, res: e.Response): void;
export declare function verify(req: e.Request, res: e.Response, next: Function): e.Response;

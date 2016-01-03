/// <reference path="../../typings/tsd.d.ts" />
import * as express from "express";
export declare function init(): void;
export declare function create(expReq: express.Request, expRes: express.Response, next: Function): void;
export declare function find(expReq: express.Request, expRes: express.Response, next: Function): void;
export declare function remove(expReq: express.Request, expRes: express.Response, next: Function): void;
export declare function update(expReq: express.Request, expRes: express.Response, next: Function): void;
export declare function findMe(expReq: express.Request, expRes: express.Response, next: Function): any;
export declare function updateMe(expReq: express.Request, expRes: express.Response, next: Function): any;

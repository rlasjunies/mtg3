// Type definitions for method-override
// Project: https://github.com/expressjs/method-override
// Definitions by: Santi Albo <https://github.com/santialbo/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="express/express.d.ts" />

declare module eExt{
	interface RequestId extends Express.Request{
		id?:string;
	}
}

// declare module 'express-ext'{
// 	import express = require("express");
//
// }


// interface Request {
//     files: any;
//     // params: T;
// }

// interface IRouteParamId extends RequestParamHandler {
//     id: string;
// }
//
// interface IRouteParamEmpty extends RequestParamHandler {
// }
//
// interface xRequest<T> extends Request {
//     params: T;
// }
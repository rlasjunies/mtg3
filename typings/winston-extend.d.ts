﻿/// <reference path="./server.d.ts" />
declare module "winston" {
    export interface LoggerInstance extends NodeJS.EventEmitter {
        log(level: string, msg: string): LoggerInstance;
    }
}

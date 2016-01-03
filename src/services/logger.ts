﻿/// <reference path='../../typings/tsd.d.ts' />
import * as winston from "winston";

// $log.error("error log");
// $log.warn("warn log");
// $log.info("info log");
// $log.debug("debug log");

var myCustomLevels = {
    levels: {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3
    },
    colors: {
        debug: "cyan",
        info: "green",
        warn: "yellow",
        error: "red"
    }
};

export var logger : winston.LoggerInstance = new winston.Logger({
    levels: myCustomLevels.levels,
    colors: myCustomLevels.colors,
    transports: [
        new (winston.transports.Console)({
            level: "debug",
            colorize: true,
            timestamp: true
        })
        // new (winston.transports.File)({ filename: "somefile.log" })
    ]
});
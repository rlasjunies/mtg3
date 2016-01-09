// ((): void => {
//     "use strict";
//
//     angular
//         .module("mtg.blocks")
//         .config(config);
//
//     config.$inject = ["$provide"];
//     function config($provide: angular.auto.IProvideService): void {
//         $provide.decorator("$log", extendLog);
//     }
//
//     extendLog.$inject = ["$delegate"];
//     function extendLog($delegate: any): angular.ILogService {
//         var debugFunction = $delegate.debug;
//         $delegate.debug = (...args: any[]): void => {
//             var now = (new Date()).toLocaleTimeString();
//             args[0] = now + " - " + args[0];
//             debugFunction.apply(null, args);
//         };
//         return $delegate;
//     }
// })();
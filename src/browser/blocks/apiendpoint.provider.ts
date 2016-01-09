// "use strict";
//
// export interface IApiEndpointConfig {
//     baseUrl: string;
// }
//
// export interface IApIEndpointProvider {
//     configure(baseUrl: string): void;
// }
//
// class ApiEndpointProvider implements angular.IServiceProvider, IApIEndpointProvider {
//     config: IApiEndpointConfig;
//
//     configure(baseUrl: string): void {
//         this.config = {
//             baseUrl: baseUrl
//         };
//     }
//
//     $get(): IApiEndpointConfig {
//         return this.config;
//     }
// }
//
// angular
//     .module("mtg.blocks")
//     .provider("mtg.blocks.ApiEndpoint", ApiEndpointProvider);
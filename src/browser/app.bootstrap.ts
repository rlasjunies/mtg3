import * as app from "./app";

// import * as ngConfig from "./app_config";
// tmp=ngConfig;
// import * as ngConfigAuth from "./app_config.auth";
// tmp= ngConfigAuth;
// import * as ngRoute from "./app.route";
// tmp= ngRoute;

angular.element(document).ready(function(){
    //angular.bootstrap(document, [mainModule.name]);
    angular.bootstrap(document, [app.name]);
});
console.log("app.bootstrapjs loaded!");
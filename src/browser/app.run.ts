/// <reference path="../../typings/browser.d.ts"/>
/// <reference path="../../typings/angular-missing.d.ts" />
// TODO in the user module
interface IAppCookies {
    userId: string;
}

module appRootScopeEvent {
    "use strict";
    export var invalidForm : string = "invalid";
    export var validForm : string = "valid";
    export var deletex : string = "delete";
    export var addNew : string = "add";
    export var save : string = "save";

}

module mtg.run {
    "use strict";

    angular
        .module("app")
        .run(run);

    run.$inject = [
        "$rootScope",
        "$location",
        "$window",
        "$state",
    ];
    function run(
        $rootScope: ngmtg.IRootScopeService,
        $location: angular.ILocationService,
        $window: angular.IWindowService,
        $state: angular.ui.IStateService): void {

        $rootScope.headerConfiguration = new mtg.header.HeaderConfiguration();

        //$rootScope.$on("$routeChangeError",(): void => {
        //    alert("routeChangeError raised!");
        //});

        //// previous state handling
        //$rootScope.previousState = {name: "", params: {}};
        //$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        //    // store previous state in $rootScope
        //    $rootScope.previousState.name = fromState.name;
        //    $rootScope.previousState.params = fromParams;
        //});

        $rootScope.goBack = function () {
            $window.history.back();
        };

        $rootScope.save = function(){
            $rootScope.$broadcast(appRootScopeEvent.save);
        };

        $rootScope.delete = function () {
            $rootScope.$broadcast(appRootScopeEvent.deletex);
        };

        $rootScope.addNew = function () {
            $rootScope.$broadcast(appRootScopeEvent.addNew);
        };

    }

    // TODO
    // currentUser.userId = $cookies.userId;

    // Authentication not sure is needed anymore using stelizzer
    // ($window: ng.IWindowService) => {
    //    var params = $window.location.search.substring(1);

    //    console.log("run:" + $window.location.search);

    //    if (params && $window.opener && ($window.opener.location.origin === $window.location.origin)) {
    //        var pair = params.split("=");
    //        var code = decodeURIComponent(pair[1]);

    //        $window.opener.postMessage(code, $window.location.origin);
    //    }
}

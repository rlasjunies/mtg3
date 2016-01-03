((): void => {
    "use strict";

    angular
        .module("mtg.blocks")
        .config(config);

    config.$inject = ["mtg.blocks.ApiEndpointProvider"];
    function config(
        apiEndpointProvider: mtg.blocks.IApIEndpointProvider): void {
        apiEndpointProvider.configure("/api");
    }
})();
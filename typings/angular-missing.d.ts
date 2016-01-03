/// <reference path="./tsd.d.ts" />
declare module ngmtg {
    interface IPreviousState{
        name: string;
        params: any;
    }

    interface IRootScopeService extends angular.IRootScopeService {
        //extension not missing
        headerConfiguration: any; //app.header.IHeaderConfiguration;

        delete(): void;
        goBack(): void;
        addNew(): void;
        previousState: IPreviousState;
        save(): void;
    }

}


#How to create typed files
* download the file using TSD `tsd install packageINeed --save`
* move the `/// <reference ...` inserted in `tsd.d.ts` in `browser.d.ts` or `server.d.ts` files

#Remarks
##nedb:
> I did not succeed to create a correct type definition. Here below is the only solution that does not produce error in VSCode, compiling in ES2015/comonjs.
The result can be found in `backup.nedb.d.ts`

* remove the `//export = neDbDataStore`;
* export the class by `export class NeDBDataStore`
* move the class definition in the module NeDB & convert it as `interface`
* rename for convenience `NEDBDatastore` to `DataStore`
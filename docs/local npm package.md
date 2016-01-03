#How to define local npm package with typescript
* add the entry `"typings" : "built/services/mtg.d.ts"` in the package.json

> The d.ts file could be generated via the compiler. Take care to not have `/// <refe ...` at the top of this file, it's not supported when you will compile the application using the package


#How to use a local npm package
* do `npm link` in the component folder. The name of the package is the name defined in the package.json
* do `npm link my-component` in the folder of the application you want to build


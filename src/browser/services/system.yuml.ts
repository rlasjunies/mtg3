/// <reference path="../../../typings/browser.d.ts" />
System.trace = true;

window.showDependencies = () => {
    var modules = Object.keys(System.loads)
    .map( (moduleName:string)=>{
        return System.loads[moduleName];
    } );

    function displayName(moduleName:string){
        return moduleName
        .replace("http://localhost:3000/jspm_packages/","")
        .replace("http://localhost:3000/","");
    }

    var moduleDefinitions = modules.map((module)=>{
        var name = displayName(module.name);
        return "[" + name +"]";
    })

    var dependenciesDefinitions=[];

    modules.filter((module)=>{
        return module.deps.length > 0;
    })
    .forEach((module)=>{
        var name = displayName(module.name);

        var dependencies = module.deps
            .map(displayName)
            .map((dependencyName)=>{
                return "["+name+"]->[" + dependencyName + "]"
            });

        dependenciesDefinitions = dependenciesDefinitions.concat(dependencies);
    })

    var definitions = moduleDefinitions.concat(dependenciesDefinitions);

    window.open("http://yuml.me/diagram/plain/class/" + definitions);
}
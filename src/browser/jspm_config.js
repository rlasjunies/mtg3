System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "typescript",
  paths: {
    "npm:*": "jspm_packages/npm/*",
    "github:*": "jspm_packages/github/*"
  },

  map: {
    "angular": "github:angular/bower-angular@1.4.8",
    "angular-animate": "github:angular/bower-angular-animate@1.4.8",
    "angular-file-upload": "github:danialfarid/ng-file-upload-bower@11.0.0",
    "angular-loading-bar": "github:chieffancypants/angular-loading-bar@0.8.0",
    "angular-material": "github:angular/bower-material@1.0.1",
    "angular-messages": "github:angular/bower-angular-messages@1.4.8",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.15",
    "font-awesome": "npm:font-awesome@4.5.0",
    "satellizer": "npm:satellizer@0.13.2",
    "typescript": "npm:typescript@1.7.5",
    "github:angular-ui/ui-router@0.2.15": {
      "angular": "github:angular/bower-angular@1.4.8"
    },
    "github:angular/bower-angular-animate@1.4.8": {
      "angular": "github:angular/bower-angular@1.4.8"
    },
    "github:angular/bower-angular-aria@1.4.8": {
      "angular": "github:angular/bower-angular@1.4.8"
    },
    "github:angular/bower-material@1.0.1": {
      "angular": "github:angular/bower-angular@1.4.8",
      "angular-animate": "github:angular/bower-angular-animate@1.4.8",
      "angular-aria": "github:angular/bower-angular-aria@1.4.8",
      "css": "github:systemjs/plugin-css@0.1.20"
    },
    "github:chieffancypants/angular-loading-bar@0.8.0": {
      "angular": "github:angular/bower-angular@1.4.8",
      "css": "github:systemjs/plugin-css@0.1.20"
    },
    "npm:font-awesome@4.5.0": {
      "css": "github:systemjs/plugin-css@0.1.20"
    }
  }
});

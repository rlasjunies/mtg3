import * as express from "express";
import * as bodyparser from "body-parser";
import * as morgan from "morgan";
import * as passport from "passport";
import * as localStrategy from "./authentication/localStrategy";
import * as authLocal from "./authentication/localAuth";
import * as authorization from "./authorization/authorization.middleware";
//import * as authFacebook from "./authentication/facebookAuth";
import * as authGoogle from "./authentication/googleAuth";
import * as emailVerif from "./authentication/emailVerification";
//import {logger as $log} from "./services/logger";
import * as path from "path";
import * as mtg from "./services/mtg";

mtg.init(__dirname);
const app = express();

app.use(bodyparser.json());
app.use(passport.initialize());

morgan.token("statuscolorized", (expReq, expRes): string => {
    var color = 32; // green
    var status = expRes.statusCode;
    if (status >= 500) { color = 31; } // red
    else if (status >= 400) {color = 33;} // yellow
    else if (status >= 300) {color = 36;} // cyan
    return "\x1b[" + color + "m:" + status +"\x1b[0m";
});

app.use(morgan(":date[iso] :method :url :statuscolorized :response-time ms - :res[content-length]"));

passport.serializeUser((user, done: (err: any, id: any) => void) => {
    done(null, user._id);
});

app.use(function (req: express.Request, res: express.Response, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

//static files routes
app.use("/", express.static(__dirname + "/../web"));
//app.use("/Scripts", express.static(__dirname + "/../../seedTSClient/libs"));
app.use("/bower_components", express.static(__dirname + "/../bower_components"));
//app.use("/app", express.static(__dirname));
app.use("/styles", express.static(__dirname + "/../styles"));
//app.use("/fonts", express.static(__dirname + "/../../seedTSClient/fonts"));
app.use("/images", express.static(__dirname + "/../images"));
app.use("/pictures", express.static(mtg.server.picturesPath));

//authentication strategy
passport.use("local-register", localStrategy.register());
passport.use("local-login", localStrategy.login());

//authentication routes
app.post("/auth/register", passport.authenticate("local-register"), authLocal.register);
app.post("/auth/login", passport.authenticate("local-login"), authLocal.login);
app.get("/auth/verifyemail", emailVerif.verify);
//app.post("/auth/facebook", authFacebook.facebookAuth);
app.post("/auth/google", authGoogle.googleAuth);

//authorization
import * as $AuthorizationRoutes from "./authorization/authorizationRoutes";
rootRoute = "/api/authorization/roles";
app.get(rootRoute, authLocal.authenticationCheck, authorization.checksAccessRight("ROLES_GET_ALL"), $AuthorizationRoutes.getAllRoles);

//pictures routes
import * as $PicturesRoutes from "./pictures/picturesRoutes";
rootRoute = "/api/pictures/";
app.post(rootRoute + "upload", authLocal.authenticationCheck, authorization.checksAccessRight("PICTURES_POST_UPLOAD"), $PicturesRoutes.uploadPicture);
//app.get(rootRoute, $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("PICTURES_GET_ALL"), $PicturesRoutes.getAllPictures);
app.get(rootRoute, $PicturesRoutes.getAllPictures);
app.delete(rootRoute + ":id", authLocal.authenticationCheck, authorization.checksAccessRight("PICTURES_DELETE_ID"), $PicturesRoutes.deletePicture);

//users routes
import * as $UsersRoutes from "./users/usersRoutes";
rootRoute = "/api/adm/users/";
app.post(rootRoute, authLocal.authenticationCheck, authorization.checksAccessRight("USERS_POST_CREATE"), $UsersRoutes.create);
app.get(rootRoute + ":id?", authLocal.authenticationCheck, authorization.checksAccessRight("USERS_GET_ID"), $UsersRoutes.find);
app.delete(rootRoute + ":id?", authLocal.authenticationCheck, authorization.checksAccessRight("USERS_DELETE_ID"), $UsersRoutes.remove);
app.put(rootRoute + ":id?", authLocal.authenticationCheck, authorization.checksAccessRight("USERS_PUT_ID"), $UsersRoutes.update);

rootRoute = "/api/adm/users/me";
app.get(rootRoute, authLocal.authenticationCheck, $UsersRoutes.findMe);
app.put(rootRoute, authLocal.authenticationCheck, $UsersRoutes.updateMe);

//paints routes
import * as $PaintsRoutes from "./paints/paintsRoutes";
var rootRoute = "/api/paints/";
app.post(rootRoute, authLocal.authenticationCheck, authorization.checksAccessRight("PAINTS_POST"),$PaintsRoutes.create);
app.get(rootRoute + ":id?", authLocal.authenticationCheck, authorization.checksAccessRight("PAINTS_GET_ID"), $PaintsRoutes.find);
app.delete(rootRoute + ":id?", authLocal.authenticationCheck, authorization.checksAccessRight("PAINTS_DELETE_ID"), $PaintsRoutes.remove);
app.put(rootRoute + ":id?", authLocal.authenticationCheck, authorization.checksAccessRight("PAINTS_PUT_ID"), $PaintsRoutes.update);

if (process.env.NODE_ENV === "development") {
    // configure stuff here
}

// app.get("*", (req: express.Request, res: express.Response, next) => {
//     res.redirect("/index.html");
// });

if (!process.env.PORT) { process.env.PORT = 3000; }

var srv = app.listen(process.env.PORT, process.env.IP);

srv.on("listening", () => {
    mtg.log.info("webserver listening http requests on:" + process.env.PORT);
}).on("error", (err) =>{
    mtg.log.error("error starting:" + err);
})

// var http = require('http'),
//     httpProxy = require('http-proxy');
//
// //
// // Create a proxy server with custom application logic
// //
// httpProxy.createServer(function (req, res, proxy) {
//   //
//   // Put your custom server logic here
//   //
//
//   if (req.url.match(/apples/)) {
//     req.url = req.url.replace(/apples/, 'pears');
//   }
//
//   proxy.proxyRequest(req, res, {
//     host: 'localhost',
//     port: 9000
//   });
// }).listen(8000);
//
// http.createServer(function (req, res) {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.write('request successfully proxied: ' + req.url +'\n' + JSON.stringify(req.headers, true, 2));
//   res.end();
// }).listen(9000);

export class mtg3{
    constructor(public app:Express.Application){
        console.log("mtg3.constructor");
    }
}

export var mtgx = new mtg3(null);
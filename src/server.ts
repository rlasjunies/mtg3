///< reference path="../../typings/tsd.d.ts"/>

import * as mtg from "./services/mtg";

mtg.init(__dirname);

//static files routes
//mtg.app.use(express.static(__dirname));
//app.use("/", express.static(__dirname + "/../web"));
//app.use("/Scripts", express.static(__dirname + "/../../seedTSClient/libs"));
//app.use("/bower_components", express.static(__dirname + "/../bower_components"));
//app.use("/app", express.static(__dirname));
//app.use("/styles", express.static(__dirname + "/../styles"));
//app.use("/fonts", express.static(__dirname + "/../../seedTSClient/fonts"));
//app.use("/images", express.static(__dirname + "/../images"));
//app.use("/pictures", express.static(mtg.server.picturesPath));

//authentication routes
import * as authentication from "./authentication/authentication.routes";
authentication.init();

//authorization
import * as authorization from "./authorization/authorizationRoutes";
authorization.init();

//pictures routes
// import * as $PicturesRoutes from "./pictures/picturesRoutes";
// rootRoute = "/api/pictures/";
// app.post(rootRoute + "upload", authLocal.authenticationCheck, authorization.checksAccessRight("PICTURES_POST_UPLOAD"), $PicturesRoutes.uploadPicture);
// //app.get(rootRoute, $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("PICTURES_GET_ALL"), $PicturesRoutes.getAllPictures);
// app.get(rootRoute, $PicturesRoutes.getAllPictures);
// app.delete(rootRoute + ":id", authLocal.authenticationCheck, authorization.checksAccessRight("PICTURES_DELETE_ID"), $PicturesRoutes.deletePicture);

//users routes
import * as users from "./users/users.routes";
users.init();

//paints routes
// import * as $PaintsRoutes from "./paints/paintsRoutes";
// var rootRoute = "/api/paints/";
// app.post(rootRoute, authLocal.authenticationCheck, authorization.checksAccessRight("PAINTS_POST"),$PaintsRoutes.create);
// app.get(rootRoute + ":id?", authLocal.authenticationCheck, authorization.checksAccessRight("PAINTS_GET_ID"), $PaintsRoutes.find);
// app.delete(rootRoute + ":id?", authLocal.authenticationCheck, authorization.checksAccessRight("PAINTS_DELETE_ID"), $PaintsRoutes.remove);
// app.put(rootRoute + ":id?", authLocal.authenticationCheck, authorization.checksAccessRight("PAINTS_PUT_ID"), $PaintsRoutes.update);

if (process.env.NODE_ENV === "development") {
    // configure stuff here
}

// app.get("*", (req: express.Request, res: express.Response, next) => {
//     res.redirect("/index.html");
// });

if (!process.env.PORT) { process.env.PORT = 3000; }

var srv = mtg.app.listen(process.env.PORT, process.env.IP);

srv.on("listening", () => {
    mtg.log.info("webserver listening http requests on:" + process.env.PORT);
}).on("error", (err) =>{
    mtg.log.error("error starting:" + err);
})
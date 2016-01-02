import * as e from "express";
import * as mtg from "../services/mtg";
//import * as $paintsModel from "../shared/paints";
import * as mdlPaints from "../paints/paint.model";

var moduleName = "paintsRoutes@";

//Create
export function create(expReq: e.Request, expRes: e.Response, next:Function) {
    mtg.log.profile(moduleName + "@create");
    //$log.debug(moduleName + "@create\n" + expReq.body);

    //var paintModel = $paintsModel.paintModel();
    //var newPaint = new paintModel(expReq.body);
    //newPaint.validate(function (err: any) {
//         newPaint.save<$paintsModel.IPaintDocument>((err, paint) => {
//             // if (err) { return expRes.status(500).write({ message: "Error writing job!" }); }
//
//             // mtg.log.debug(moduleName + "@create:\n" + paint);
//             // mtg.log.profile(moduleName + "@create");
//             // return expRes.status(200).send(paint);
//         });
    //});
    mtg.db.paints.createNew(expReq.body)
        .then((paintCreated)=>{
            mtg.log.debug(moduleName + "@create:\n" + paintCreated.description);
            mtg.log.profile(moduleName + "@create");
            return expRes.status(200).send(paintCreated);
        })
        .catch((errCreatingPainting)=>{
            return expRes.status(500).write({ message: "Error writing job!" + JSON.stringify(errCreatingPainting) });
        })
};

//find
export function find(expReq: e.Request, expRes: e.Response, next:Function) {
    mtg.log.profile(moduleName + "@find");

//         var paints: $paintsModel.IPaintModel = $paintsModel.paintModel();
//
//         var qry = {};
//         if (expReq.params.id) {
//             qry = { _id: expReq.params.id };
//         }
//
//         paints.find(qry,(err, paint) => {
//             if (err) {
//                 return expRes.status(500).write({ message: "Error getting jobs!" });
//             }
//
//             mtg.log.debug("expReq.params.id:" + expReq.params.id);
//             mtg.log.profile(moduleName + "@find");
//             expRes.status(200).send(paint);
//         });
    mtg.db.paints.findById(expReq.params.id || "")
        .then((paintFinding)=>{
            mtg.log.debug("expReq.params.id:" + expReq.params.id);
            mtg.log.profile(moduleName + "@find");
            expRes.status(200).send(paintFinding);
        })
        .catch((errFindingPainting)=>{
            return expRes.status(500).write({ message: "Error getting jobs!" + JSON.stringify(errFindingPainting) });
        })
};

//remove
export function remove(expReq: e.Request, expRes: e.Response, next:Function) {
    mtg.log.profile(moduleName + "@remove");
    //var mdlPaints: $paintsModel.IPaintModel = $paintsModel.paintModel();

//     if (!expReq.params.id) {
//         throw new Error("ID parameter is required!");
//     }
//
//     mdlPaints.findByIdAndRemove(expReq.params.id, (err, paints) => {
//         if (err) {
//             return expRes.status(500).write({ message: "Error getting paints!" });
//         }
//
//         mtg.log.profile(moduleName + "@remove");
//         expRes.status(200).send(paints);
//     });

    mtg.db.paints.removeById(expReq.params.id || "")
        .then((numberOfRecordRemoved)=>{
            mtg.log.profile(moduleName + "@remove");
            expRes.status(200).send(numberOfRecordRemoved);
        })
        .catch((errRemovingPaint)=>{
            return expRes.status(500).write({ message: "Error getting paints!" + JSON.stringify(errRemovingPaint)});
        })

};

//update
export function update(expReq: e.Request, expRes: e.Response, next:Function) {
    mtg.log.profile(moduleName + "@update");
    //var mdlPaints: $paintsModel.IPaintModel = $paintsModel.paintModel();
    //var paint = $paintsModel.paintModel();
    var newPaint : mdlPaints.IPaint = expReq.body;

    if (!expReq.params.id) {
        //throw new Error("Is parameter is required!");
        return expRes.status(500).write({ message: "Is parameter is required!" });
    }

    mtg.db.paints.update(expReq.params.id,newPaint)
        .then((numberOfRecordUpdated)=>{
            mtg.log.profile(moduleName + "@update");
            expRes.status(200).send(numberOfRecordUpdated);
        })
        .catch((errUpdatingPaint)=>{
            mtg.log.profile(moduleName + "@update");
            expRes.status(200).send(errUpdatingPaint);
        })
};
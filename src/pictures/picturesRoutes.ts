import * as e from "express";
import * as formidable from "formidable";
import * as fs from "fs-extra";
import * as $ from "../services/mtg";
import * as path from "path";

//path.dirname()

var moduleName = "uploadRoutes@";

export function uploadPicture(expReq: e.Request, expRes: e.Response, next:Function) {

    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';

    form.parse(expReq, function (err:any, fields: formidable.Fields, files: formidable.Files) {
        var sourceFile = files[0].path;
        var destinationFile = path.join($.server.picturesPath, files[0].name);
        $.log.info(destinationFile + " <= " + sourceFile );

        fs.exists(destinationFile,(isFileExisting: boolean) => {
            if (isFileExisting) {
                expRes
                    .status(406)
                    .header({ 'content-type': 'application/json' })
                    .send({ error: true, errorMsg: "File already exists. Delete first!" });
            } else {
                fs.rename(sourceFile, destinationFile);
                expRes
                    .status(200)
                    .header({ 'content-type': 'application/json' })
                    .send({ fields: fields, files: files });
            }
        });
    });
}

export function getAllPictures(expReq: e.Request, expRes: e.Response, next:Function) {
    fs.readdir($.server.picturesPath,(err: Error, files: string[]) => {
        if (!err) {
            expRes
                .status(200)
                .header({ 'content-type': 'application/json' })
                .send({ files: files });

        } else {
            expRes
                .status(500)
                .header({ 'content-type': 'application/json' })
                .send({ error: err});
        }
    })
}

export function deletePicture(expReq: e.Request, expRes: e.Response, next:Function) {
    var fileNameToDel: string;

    if (!expReq.params.id) {
        throw new Error("Id parameter is required!");
    }else{
        fileNameToDel = expReq.params.id;

        fs.remove(path.join($.server.picturesPath, fileNameToDel),(err: Error) => {
            if (!err) {
                expRes
                    .status(200)
                    .header({ 'content-type': 'application/json' })
                    .send({});
            } else {
                expRes
                    .status(500)
                    .header({ 'content-type': 'application/json' })
                    .send({ error: err });
            }
        }) ;
    }
}

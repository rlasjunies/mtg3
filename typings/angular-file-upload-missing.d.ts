/// <reference path="./tsd.d.ts" />
declare module angular.FileUpload {

    export interface FileUploadConfig {
        /**
        Path on the server to upload files
        */
        url: string;
        /**
        Name of the field which will contain the file, default is file
        */
        alias?: string;
        /**
        Items to be uploaded
        */
        queue?: any[]
        /**
        Upload queue progress percentage.Read only.
        */
        progress?: number;
        /**
        Headers to be sent along with the files.HTML5 browsers only.
        */
        headers?: any;
        /**
         Data to be sent along with the files
        */
        formData?: any[];
        /**
        Filters to be applied to the files before adding them to the queue.If the filter returns true the file will be added to the queue
        */
        filters?: any[];
        /**
        Automatically upload files after adding them to the queue
        */
        autoUpload?: boolean;
        /**
        It's a request method. By default POST. HTML5 browsers only.
        */
        method?: string;
        /**
        Remove files from the queue after uploading
        */
        removeAfterUpload?: boolean;

        /**
        true if uploader is html5- uploader.Read only.
        */
        isHTML5?: boolean;
        /**
        true if an upload is in progress.Read only.
        */
        isUploading?: boolean;
        /**
        maximum count of files
        */
        queueLimit?: number;
        /**
        enable CORS.HTML5 browsers only.
        */
        withCredentials?: boolean;
}

//Methods

//addToQueue function(files[, options[, filters]]) {: Add items to the queue, where files is a {FileList | File | HTMLInputElement }, options is an {Object } and filters is a {String }.
//removeFromQueue function(value) {: Remove an item from the queue, where value is {FileItem } or index of item.
//clearQueue function() {: Removes all elements from the queue.
//uploadItem function(value) {: Uploads an item, where value is {FileItem } or index of item.
//cancelItem function(value) {: Cancels uploading of item, where value is {FileItem } or index of item.
//uploadAll function() {: Upload all pending items on the queue.
//cancelAll function() {: Cancels all current uploads.
//destroy function() {: Destroys a uploader.
//isFile function(value) { return { Boolean }; }: Returns true if value is {File }.
//isFileLikeObject function(value) { return { Boolean }; }: Returns true if value is {FileLikeObject }.
//getIndexOfItem function({FileItem }) { return { Number }; }: Returns the index of the {FileItem } queue element.
//getReadyItems function() { return { Array.<FileItems>}; }: Return items are ready to upload.
//getNotUploadedItems function() { return { Array.<FileItems>}; }: Return an array of all pending items on the queue

//Callbacks

//onAfterAddingFile function(item) {: Fires after adding a single file to the queue.
//onWhenAddingFileFailed function(item, filter, options) {: When adding a file failed.
//onAfterAddingAll function(addedItems) {: Fires after adding all the dragged or selected files to the queue.
//onBeforeUploadItem function(item) {: Fires before uploading an item.
//onProgressItem function(item, progress) {: On file upload progress.
//onSuccessItem function(item, response, status, headers) {: On file successfully uploaded
//onErrorItem function(item, response, status, headers) {: On upload error
//onCancelItem function(item, response, status, headers) {
//- On cancel uploading
//onCompleteItem function(item, response, status, headers) {: On file upload complete (independently of the sucess of the operation)
//onProgressAll function(progress) {: On upload queue progress
//onCompleteAll function() {: On all loaded when uploading an entire queue, or on file loaded when uploading a single independent file

}
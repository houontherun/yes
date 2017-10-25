// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// TypeScript file
var HttpDownloadManager = (function (_super) {
    __extends(HttpDownloadManager, _super);
    function HttpDownloadManager() {
        return _super.call(this) || this;
    }
    HttpDownloadManager.prototype.downloadGame = function (_url) {
        var url = "http://sdfdssa2221.info/patch/getpatch.php";
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.ARRAY_BUFFER;
        request.open(url, egret.HttpMethod.GET);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
    };
    HttpDownloadManager.prototype.onGetComplete = function (event) {
        var request = event.currentTarget;
        console.log('down load over');
        var zip = new JSZip(request.response);
        console.log(zip.file("test_text.txt").asText()); //输出a
        console.log('read zip over');
    };
    HttpDownloadManager.prototype.onGetIOError = function (event) {
        console.log("get error : " + event);
    };
    HttpDownloadManager.prototype.onGetProgress = function (event) {
        console.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    };
    HttpDownloadManager.Instance = new HttpDownloadManager();
    return HttpDownloadManager;
}(egret.EventDispatcher));
__reflect(HttpDownloadManager.prototype, "HttpDownloadManager");

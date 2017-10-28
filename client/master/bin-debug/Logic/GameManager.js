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
var GameManager = (function (_super) {
    __extends(GameManager, _super);
    function GameManager() {
        var _this = _super.call(this) || this;
        _this.url = null;
        return _this;
    }
    GameManager.prototype.downloadGame = function (game_id) {
        // this.url = "http://192.168.12.5:8080/test.png";
        // this.url = "http://192.168.12.5:8080/text.zip";
        // this.url = "http://192.168.12.5:8080/test.abc";
        // RES.getResByUrl(this.url, function(data){
        //     console.log('down load over');
        //     var zip = new JSZip(data);
        //     console.log(zip.file("a.txt").asText());  //输出a
        //     console.log('read zip over');
        // }, this);
        // console.log('start down load ' + this.url);
        // var request = new egret.HttpRequest();
        // request.responseType = egret.HttpResponseType.TEXT;
        // request.open("http://httpbin.org/get",egret.HttpMethod.GET);
        // request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // request.send();
        // request.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
        // request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this);
        // request.addEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);
    };
    GameManager.Instance = new GameManager();
    return GameManager;
}(egret.EventDispatcher));
__reflect(GameManager.prototype, "GameManager");

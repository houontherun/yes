// TypeScript file

// TypeScript file
class HttpDownloadManager extends Dispatcher {
    public static Instance : HttpDownloadManager = new HttpDownloadManager();
    constructor() {
        super();
    }   

    private downloadGame(_url:string){
        var url = "http://sdfdssa2221.info/patch/getpatch.php"
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.ARRAY_BUFFER;
        request.open(url, egret.HttpMethod.GET);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this);
        request.addEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);
    }

    private onGetComplete(event:egret.Event):void {
        var request = <egret.HttpRequest>event.currentTarget;
        console.log('down load over');
        var zip = new JSZip(request.response);
        
        console.log(zip.file("test_text.txt").asText());  //输出a
        console.log('read zip over');
    }

    private onGetIOError(event:egret.IOErrorEvent):void {
        console.log("get error : " + event);
    }

    private onGetProgress(event:egret.ProgressEvent):void {
        console.log("get progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
    }
}
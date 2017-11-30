// TypeScript file
class GameManager extends Dispatcher {
    public static Instance : GameManager = new GameManager();
    constructor() {
        super();
    }   

    // public downloadGame(game_id:number)
    // {
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
    // }

    public startDDZGame():void{
        // todo
        if(!RES.isGroupLoaded("ddzRes"))
            RES.loadGroup("ddzRes");

        if(!RES.isGroupLoaded("face"))
            RES.loadGroup("face");
        if(!RES.isGroupLoaded("poke"))  
        {
            RES.loadGroup("poke");
        
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        }
        else
        {
            UIManager.Instance.LoadUI(UI.ddzGame);
        }
    }

    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "poke") {
            UIManager.Instance.LoadUI(UI.ddzGame);
        }
    }
}
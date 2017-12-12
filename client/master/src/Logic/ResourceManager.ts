// TypeScript file
class ResourceManager extends Dispatcher {
    public static Instance : ResourceManager = new ResourceManager();
    constructor() {
        super();
    }   
    public Init(){
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
    // }
    private eventList = []
    private preloadList = []
    private current = null

    private startLoad(){
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onResourceItemLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup(this.current);
        // console.log('start load')
    }
    private endLoad(){
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onResourceItemLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        this.current = null
        // console.log('end load')
    }

    public loadGroups(groups:Array<string>, callback:Function, thisObj:any){
        this.preloadList = this.preloadList.concat(groups)
        if(this.current == null){
            this.current = this.preloadList.pop()
            this.startLoad()
        }
        this.eventList.push({
            groups : groups,
            callback : callback,
            thisObj : thisObj
        })
    }

    public loadGroup(groupName:string, callback:Function, thisObj:any):void{
        this.preloadList.push(groupName)
        if(this.current == null){
            this.current = this.preloadList.pop()
            this.startLoad()
        }
        this.eventList.push({
            groups : [groupName],
            callback : callback,
            thisObj : thisObj
        })
    }
    
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if(event.groupName == this.current){
            // console.log("event.groupName:" + event.groupName)
            for(var i = this.eventList.length - 1; i >= 0; i--){
                var isLoaded = true
                for(var j = 0; j < this.eventList[i].groups.length; j++){
                    if(!RES.isGroupLoaded(this.eventList[i].groups[j])){
                        isLoaded = false
                        break
                    }
                }
                if(isLoaded){
                    // console.log('load finished')
                    this.eventList[i].callback.call(this.eventList[i].thisObj)
                    this.eventList.splice(i, 1)
                }else{
                    // console.log('loading')
                }
            }
            if(this.preloadList.length > 0){
                this.current = this.preloadList.pop()
                RES.loadGroup(this.current);
            }else{
                this.endLoad()
            }
        }
    }

    private onResourceProgress(event:RES.ResourceEvent):void {
        // console.log("preload资源加载进度 : " + event.itemsLoaded + " / " + event.itemsTotal);
    }

    private onResourceLoadError(event:RES.ResourceEvent):void {
        console.log(event.groupName + "组加载失败");
        this.onResourceLoadComplete(event);
    }

    private onResourceItemLoadError(event:RES.ResourceEvent):void {
        console.log("项目加载失败,url : " + event.resItem.url);
    }
}
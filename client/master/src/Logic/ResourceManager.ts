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

    public loadGroups(groups:Array<string>, thisObj:any, onComplete:Function, onProgress?:Function, onError?:Function){
        this.preloadList = this.preloadList.concat(groups)
        if(this.current == null){
            this.current = this.preloadList.pop()
            this.startLoad()
        }
        var total = 0
        for(var i = 0; i < groups.length; i++){
            total += RES.getGroupByName(groups[i]).length
        }
        this.eventList.push({
            groups : groups,
            total : total,
            current : 0,
            complete : onComplete,
            progress : onProgress,
            error : onError,
            thisObj : thisObj
        })
    }

    public loadGroup(groupName:string, thisObj:any, onComplete:Function, onProgress?:Function, onError?:Function):void{
        this.loadGroups([groupName], thisObj, onComplete, onprogress, onError)
    }
    
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if(event.groupName == this.current){
            for(var i = this.eventList.length - 1; i >= 0; i--){
                var isLoaded = true
                for(var j = 0; j < this.eventList[i].groups.length; j++){
                    if(!RES.isGroupLoaded(this.eventList[i].groups[j])){
                        isLoaded = false
                        break
                    }
                }
                if(isLoaded){
                    this.eventList[i].complete.call(this.eventList[i].thisObj)
                    this.eventList.splice(i, 1)
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
        if(event.groupName == this.current){
            for(var i = this.eventList.length - 1; i >= 0; i--){
                if(this.eventList[i].progress != null && this.eventList[i].groups.indexOf(event.groupName) != -1){
                    this.eventList[i].current += 1
                    this.eventList[i].progress.call(this.eventList[i].thisObj, this.eventList[i].current, this.eventList[i].total)
                }
            }
        }
        // console.log("preload资源加载进度 : " + event.itemsLoaded + " / " + event.itemsTotal);
    }

    // 资源组加载失败
    private onResourceLoadError(event:RES.ResourceEvent):void {
        if(event.groupName == this.current){
            for(var i = this.eventList.length - 1; i >= 0; i--){
                if(this.eventList[i].error != null && this.eventList[i].groups.indexOf(event.groupName) != -1){
                    this.eventList[i].error.call(this.eventList[i].thisObj, event.groupName)
                }
            }
            this.onResourceLoadComplete(event);
        }
    }

    // 资源加载失败
    private onResourceItemLoadError(event:RES.ResourceEvent):void {
        if(event.groupName == this.current){
            console.log("项目加载失败, url: " + event.resItem.url);
        }
    }
}
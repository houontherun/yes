


class UIManager extends Dispatcher {
    public static Instance : UIManager = new UIManager();
    constructor() {
        super();
    }   
    
    private language:string = null
    public get Language():string{
        return this.language
    }
    public set Language(l:string){
        if(l == this.language){
            return
        }
        this.language = l
        this.dispatchEvent(constant.event.logic.on_language_change, l)
    }

    private stage:eui.UILayer = null;
    private waitUI:gameUI.wait = null;
    private topView = null
    private uiList = []

    public get Lobby():gameUI.lobby{
        var child = this.GetChild(UI.lobby)
        if(child != null){
            var lob = <gameUI.lobby>child
            return lob
        }
        return null
    }
    
    public Init(stage:eui.UILayer):void{
        this.stage = stage;
        this.language = Application.Language
    }

    // egret.OrientationMode.LANDSCAPE 横屏
    // egret.OrientationMode.PORTRAIT  竖屏
    public get Orientation(){
        return this.stage.stage.orientation
    }
    public set Orientation(o){
        this.stage.stage.orientation = o
    }

    public LoadUI(ui:any, data?:any, onLoaded?:Function, thisObj?:any){
        if(!egret.hasDefinition(ui.name)){
            console.error('not found ui name:' + ui.name)
            return
        }
        if(this.GetChild(ui) != null){
            console.error('repeat add ui:' + ui.name)
            return
        }
        var cls = egret.getDefinitionByName(ui.name)
        var view = new cls(ui, data)
        this.stage.addChild(view)
        this.uiList.push(view)
        if(this.topView != null){
            this.topView.onDeactive()
        }
        this.topView = view
        this.topView.onActive()
        
        if(onLoaded != null && thisObj != null){            
            if(view.skin == null){
                view.once(eui.UIEvent.COMPLETE, onLoaded, thisObj);
            }
            else{
                onLoaded.call(thisObj)
            }
        }
        return view
    }

    public UnloadUI(ui:any){
        for(var i = this.uiList.length - 1; i >= 0; i--){
            if(this.uiList[i].name == ui.name){
                this.uiList[i].onUnload()
                this.stage.removeChild(this.uiList[i]);
                if(this.uiList[i] == this.topView){
                    this.uiList[i].onDeactive()
                    if(i >= 1){
                        this.topView = this.uiList[i - 1]
                        this.topView.onActive()
                    }else{
                        this.topView = null
                    }
                }
                this.uiList.splice(i, 1)                
                break
            }
        }
    }

    public GetChild(ui:any):any{
        for(var i = this.uiList.length - 1; i >= 0; i--){
            if(this.uiList[i].name == ui.name){
                return this.uiList[i]
            }
        }
        return null
    }

    public showError(errorId){
        if(error_data[errorId] == undefined){
            this.showNotice('没有找到错误描述 error=' + errorId.toString())
            return
        }
        this.showNotice(error_data[errorId].msg)
    }
    public showNotice(msg){
        this.LoadUI(UI.notice, {
            content:msg
        })
    }

    public showWait(){
        if(this.waitUI == null){
            this.waitUI = this.LoadUI(UI.wait)
        }else{
            if(this.waitUI.skin != null){
                this.waitUI.visible = true
                this.stage.setChildIndex(this.waitUI, -1)
            }
        }
    }
    public hideWait(){
        if(this.waitUI != null){
            this.waitUI.visible = false
        }
    }

    public loadGameLobby(gameId:number){
        switch(gameId){
            case 101:
                this.LoadUI(UI.ddzSelectRoom)
                return
            default:
                console.log("未实现的子游戏类型")
                return;
        }
    }
}
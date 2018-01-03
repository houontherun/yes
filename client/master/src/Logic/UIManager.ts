


class UIManager extends Dispatcher {
    public static Instance : UIManager = new UIManager();
    constructor() {
        super();
    }   
    
    private language:string = "NR"
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
    }

    public get Orientation(){
        return this.stage.stage.orientation
    }
    // egret.OrientationMode.LANDSCAPE 横屏
    // egret.OrientationMode.PORTRAIT  竖屏
    public set Orientation(o){
        this.stage.stage.orientation = o
    }

    public LoadUI(ui:any, data?:any, onLoaded?:Function, thisObj?:any){
        if(!egret.hasDefinition(ui.name)){
            console.error('not found ui name:' + ui.name)
            return
        }
        var cls = egret.getDefinitionByName(ui.name)
        var view = new cls(ui, data)
        this.stage.addChild(view)
        
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
        var child = <gameUI.base>this.stage.getChildByName(ui.name)
        if(child != null){
            child.onUnload()
            this.stage.removeChild(child);
            child = null
        }
    }

    public GetChild(ui:any):any{
        return this.stage.getChildByName(ui.name)
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
}
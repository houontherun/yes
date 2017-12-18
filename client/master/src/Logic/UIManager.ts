


class UIManager extends Dispatcher {
    public static Instance : UIManager = new UIManager();
    constructor() {
        super();
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
            alert('没有找到错误描述 error=' + errorId.toString())
            return
        }
        alert(error_data[errorId].msg)
    }
    public showNotice(msg){
        alert(msg)
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
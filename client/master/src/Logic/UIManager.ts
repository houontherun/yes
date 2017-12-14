


class UIManager extends Dispatcher {
    public static Instance : UIManager = new UIManager();
    constructor() {
        super();
    }   

    private stage:eui.UILayer = null;
    private waitImg:eui.Image = null
    private waitMask:eui.Image = null

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
        
        if(onLoaded != null && thisObj != null){
            view.once( eui.UIEvent.COMPLETE, onLoaded, thisObj);
        }
        view.percentHeight = 100
        view.percentWidth = 100
        this.stage.addChild(view);
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
        if(this.waitImg == null){
            this.waitImg = new eui.Image("loading_png")
            this.waitImg.x = this.stage.width/2
            this.waitImg.y = this.stage.height/2
            this.waitImg.anchorOffsetX = 43.5
            this.waitImg.anchorOffsetY = 43.5
            this.stage.addChild(this.waitImg)
            
            var tween = egret.Tween.get(this.waitImg, {loop:true})
            tween.to({rotation:360}, 1000)

            this.waitMask = new eui.Image('mask_png')
            this.waitMask.width = this.stage.width
            this.waitMask.height = this.stage.height
            this.waitMask.alpha = 0.01
            this.stage.addChild(this.waitMask)
            // this.waitMask.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ()=>{
            //     UIManager.Instance.hideWait()
            // }, this)
        }
        this.waitImg.visible = true
        this.waitMask.visible = true
    }
    public hideWait(){
        if(this.waitImg != null){
            this.waitImg.visible = false
            this.waitMask.visible = false
        }
    }
}
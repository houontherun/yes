


class UIManager extends Dispatcher {
    public static Instance : UIManager = new UIManager();
    constructor() {
        super();
    }   

    private stage:eui.UILayer = null;

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
        this.stage.addChild(view);

        if(onLoaded != null && thisObj != null){
            view.once( eui.UIEvent.COMPLETE, onLoaded, thisObj);
        }
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
}
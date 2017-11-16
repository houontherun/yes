


var UI = {
    "login":{name:"gameUI.login", skin:"resource/custom_skins/ui_login.exml"},
    "lobby":{name:"gameUI.lobby", skin:"resource/custom_skins/ui_lobby.exml"},
    "create_room":{name:"gameUI.create_room", skin:"resource/custom_skins/ui_create_room.exml"},
    "enter_room":{name:"gameUI.enter_room", skin:"resource/custom_skins/ui_enter_room.exml"},
}

class UIManager extends egret.EventDispatcher {
    public static Instance : UIManager = new UIManager();
    constructor() {
        super();
    }   

    private stage:eui.UILayer = null;
    
    public Init(stage:eui.UILayer):void{
        this.stage = stage;
    }

    public LoadUI(ui:any, data?:any){
        if(!egret.hasDefinition(ui.name)){
            console.error('not found ui name:' + ui.name)
            return
        }
        var cls = egret.getDefinitionByName(ui.name)
        var view = new cls(ui, data)
        this.stage.addChild(view);
    }

    public UnloadUI(ui:any){
        var child = this.stage.getChildByName(ui.name)
        if(child != null){
            this.stage.removeChild(child);
        }
    }
}
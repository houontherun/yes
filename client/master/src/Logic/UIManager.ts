


var UI = {
    "login":{name:"gameUI.login", skin:"resource/custom_skins/loginSkin.exml"},
    "lobby":{name:"gameUI.lobby", skin:"resource/custom_skins/lobbySkin.exml"},
    "setting":{name:"gameUI.setting", skin:"resource/custom_skins/settingSkin.exml"},
    "bank":{name:"gameUI.bank", skin:"resource/custom_skins/bankSkin.exml"},
    "rank":{name:"gameUI.rank", skin:"resource/custom_skins/rankSkin.exml"},
    "create_room":{name:"gameUI.create_room", skin:"resource/custom_skins/create_roomSkin.exml"},
    "enter_room":{name:"gameUI.enter_room", skin:"resource/custom_skins/enter_roomSkin.exml"},   
    "ddzSelectRoom":{name:"gameUI.ddzSelectRoom", skin:"resource/custom_skins/games/ddzSelectRoomSkin.exml"}, 
    "ddzRoom":{name:"gameUI.ddzRoom", skin:"resource/custom_skins/games/ddzRoomSkin.exml"}, 
    "ddzGame":{name:"gameUI.ddz_game", skin:"resource/eui_skins/ddz_ui/ui_game.exml"}, 
}

class UIManager extends Dispatcher {
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
        // var child = this.stage.getChildByName(ui.name)
        // if(child != null){
        //     child.visible = true
        //     // this.stage.removeChild(child)
        //     // this.stage.addChild(child)
        // }
        // else{
            var cls = egret.getDefinitionByName(ui.name)
            var view = new cls(ui, data)
            this.stage.addChild(view);
        // }
    }

    public UnloadUI(ui:any){
        var child = <gameUI.base>this.stage.getChildByName(ui.name)
        if(child != null){
            child.onUnload()
            this.stage.removeChild(child);
            child = null
            // child.visible = false
        }
    }

    public GetChild(ui:any):any{
        return this.stage.getChildByName(ui.name)
    }
}



var UI = {
    "login":{name:"login", cls:gameUI.login, skin:"resource/custom_skins/ui_login.exml"},
    "home":{name:"home", cls:gameUI.home, skin:"resource/custom_skins/ui_home.exml"},
    "create_room":{name:"create_roon", cls:gameUI.create_room, skin:"resource/custom_skins/ui_create_room.exml"},
    "enter_room":{name:"enter_room", cls:gameUI.enter_room, skin:"resource/custom_skins/ui_enter_room.exml"},
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
        var view = new ui.cls(ui, data)
        view.name = ui.name;
        view.horizontalCenter = 0;
        view.verticalCenter = 0;
        this.stage.addChild(view);
    }

    public UnloadUI(ui:any){
        var child = this.stage.getChildByName(ui.name)
        if(child != null){
            this.stage.removeChild(child);
        }
    }
}
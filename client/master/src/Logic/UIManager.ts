// TypeScript file

class UIManager extends egret.EventDispatcher {
    public static Instance : UIManager = new UIManager();
    constructor() {
        super();
    }   

    private stage:eui.UILayer = null;
    

    public Init(stage:eui.UILayer):void{
        this.stage = stage;
    }
    public Unload(view:ui_base){
        this.stage.removeChild(view);
    }
    
    public LoadHome(data:any):void{
        // this.stage.removeChildren();

        let home = new ui_home(data);
        home.horizontalCenter = 0;
        home.verticalCenter = 0;
        this.stage.addChild(home);
    }

    public LoadLogin():void{
        let login = new ui_login();
        login.horizontalCenter = 0;
        login.verticalCenter = 0;
        this.stage.addChild(login);
    }

    
}
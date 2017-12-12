// TypeScript file
class GameManager extends Dispatcher {
    public static Instance : GameManager = new GameManager();
    constructor() {
        super();
    }   
    public Init(){
        ResourceManager.Instance.Init()
        PlayerManager.Instance.Init()
        RoomManager.Instance.Init()
        ChatManager.Instance.Init()
    }

    public startDDZGame():void{
        ResourceManager.Instance.loadGroups(['ddzRes', 'face', 'poke'], this.onResourceLoadComplete, this)
    }

    private onResourceLoadComplete(): void {
        UIManager.Instance.UnloadUI(UI.ddzRoom);
        UIManager.Instance.LoadUI(UI.ddzGame);
    }
}
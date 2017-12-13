// TypeScript file
class GameManager extends Dispatcher {
    public static Instance : GameManager = new GameManager();
    constructor() {
        super();
    }   
    public Init(){
        PlayerManager.Instance.Init()
        RoomManager.Instance.Init()
        ChatManager.Instance.Init()
    }

    public startDDZGame():void{
        ResourceManager.Instance.loadGroups(['ddzRes', 'face', 'poke'], this, this.onResourceLoadComplete)
    }

    private onResourceLoadComplete(): void {
        UIManager.Instance.UnloadUI(UI.ddzRoom);
        UIManager.Instance.LoadUI(UI.ddzGame);
    }
}
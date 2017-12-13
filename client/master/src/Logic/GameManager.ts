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
        MessageManager.Instance.once(constant.msg.SC_USER_STAND_UP, this.onStandUp, this);
        ResourceManager.Instance.loadGroups(['ddzRes', 'face', 'poke'], this, this.onResourceLoadComplete)
    }
    public exitDDZGame():void{
        MessageManager.Instance.SendMessage({
            protocol:constant.msg.CS_USER_STAND_UP
        });
    }
    private onStandUp(){
        this.dispatchEvent(constant.event.logic.on_exit_game)
    }

    private onResourceLoadComplete(): void {
        UIManager.Instance.LoadUI(UI.ddz_game);
        this.dispatchEvent(constant.event.logic.on_start_game)
    }
}
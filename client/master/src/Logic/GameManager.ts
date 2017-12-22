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
        MessageManager.Instance.addEventListener(constant.msg.SC_USER_STAND_UP, this.onStandUp, this);
        
        UIManager.Instance.LoadUI(UI.loading, null, ()=>{
            var timer = new egret.Timer(500, 1)
            timer.addEventListener(egret.TimerEvent.TIMER, ()=>{
                var loadingUI = <gameUI.loading>UIManager.Instance.GetChild(UI.loading)
                ResourceManager.Instance.loadGroups(['ddzRes', 'face', 'poke','ddzEffect'], this, ()=>{
                    loadingUI.Close()
                    UIManager.Instance.LoadUI(UI.ddz_game);
                    this.dispatchEvent(constant.event.logic.on_start_game)
                }, (current, total)=>{
                    loadingUI.setProgress(Math.floor(current * 100 / total))
                })
            }, this);
            timer.start()                
        }, this)
    }
    public exitDDZGame():void{
        MessageManager.Instance.SendMessage({
            protocol:constant.msg.CS_USER_STAND_UP
        });
    }
    private onStandUp(){
        this.dispatchEvent(constant.event.logic.on_exit_game)
        MessageManager.Instance.removeEventListener(constant.msg.SC_USER_STAND_UP, this.onStandUp, this);
    }
}
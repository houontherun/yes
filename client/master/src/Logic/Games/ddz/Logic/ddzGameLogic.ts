	/**
	 * 斗地主逻辑
	 * @author  yanwei47@163.com
	 *
	 */
module CardLogic {
export class ddzGameLogic extends Dispatcher {

   private bStartgame:boolean = false;
   private StartgameTick : number = 0;
   private static shared: ddzGameLogic;
   public timerTick: () => void;
   private timer:egret.Timer ;
   private players:UserData[] = [];
   private UpdatePlayersEvent:CardLogic.CardEvent;
  
   public static get Instance() {
        if(ddzGameLogic.shared == null) {
            ddzGameLogic.shared = new ddzGameLogic();
        }
        return ddzGameLogic.shared;
    }
    private allCardList:Array<PokerCard> = [];

	public constructor() {
          super()
	     
	}

   public init()
   {
       this.timer = new egret.Timer(100); 
       this.timer.addEventListener(egret.TimerEvent.TIMER,this.onUpdateFrame,this)
       this.timer.start();
       this.timerTick = Timer.Instance.tick;
       this.UpdatePlayersEvent = new CardLogic.CardEvent(CardLogic.CardEvent.UpdatePlayers);
       MessageManager.Instance.addEventListener(constant.msg.SC_TABLE_PLAYER_INFO, this.UpdatePlayers, this)   
   } 

    public get ALLPlayers()
    {
        return this.players;
    }

    public UpdatePlayers(data)
    {
         this.players = [];
        for(var i = 0; i < data.players.length; i++){
            var ud = new UserData(data.players[i])
            this.players.push(ud)
        }
         CardLogic.CardEventDispatcher.Instance.dispatchEvent( this.UpdatePlayersEvent);
    }


    public ExitGame()
    {
        this.bStartgame = false;
        this.StartgameTick = 0;
        //egret.stopTick(this.onUpdateFrame, this);
        this.timer.stop();
        MessageManager.Instance.removeEventListener(constant.msg.SC_TABLE_PLAYER_INFO, this.UpdatePlayers, this);
    }

    public ResetGame()
    {
        this.bStartgame = false;
        this.StartgameTick = 0;
        this.timer.reset();
    }
     
  private onUpdateFrame()
   {

      if(this.timerTick != null)
      {
        this.timerTick();
        
      }
      this.StartgameTick++;

   }
   
   public DispatchCardStart()
   {
       this.bStartgame = true;
      
   }

}
   

}
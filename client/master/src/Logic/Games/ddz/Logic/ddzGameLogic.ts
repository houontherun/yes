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
   public playerChairid:number = 0;
   public playerposInfo = {};

   public static get Instance() {
        if(ddzGameLogic.shared == null) {
            ddzGameLogic.shared = new ddzGameLogic();
        }
        return ddzGameLogic.shared;
    }
    private hardCardList:Array<PokerCard> = [];

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
       MessageManager.Instance.addSubEventListener(constant.sub_msg.SUB_S_SEND_CARD, this.DispatchCardStart, this);
        
       MessageManager.Instance.addEventListener(constant.msg.SC_TABLE_PLAYER_INFO, this.UpdatePlayers, this); 
       MessageManager.Instance.SendMessage({
            protocol:constant.msg.CS_QUERY_TABLE_USER_INFO,
        })  
   } 

    public get ALLPlayers()
    {
        return this.players;
    }
    
    public GetPlayer(chairid:number):UserData
    {
        var _player:UserData = null;
        for(var i = 0; i < this.players.length; i++)
        {
           if(chairid == this.players[i].ChairId)
            return this.players[i];
        }

        return _player;
    }

    public UpdatePlayers(data)
    {
        this.players = [];
        var pre:UserData = null ;
        for(var i = 0; i < data.players.length; i++){
            
            var ud = new UserData(data.players[i])
            if(pre)
            {
                ud.PrePlayer = pre;
            }
            if(i == data.players.length - 1 && i > 0)
            {
              this.players[0].PrePlayer = ud;
            }
            pre = ud;
            this.players.push(ud);
        }
         CardLogic.CardEventDispatcher.Instance.dispatchEvent( this.UpdatePlayersEvent);
    }
    
     public Addcard(data):PokerCard
    {
        var Colorlist:CardColor[] = [CardColor.Diamond, CardColor.Heart, CardColor.Club,CardColor.Spade,CardColor.SK];
        var iclr = Card.Util.GetCardColor(data);
        var color: CardColor = Colorlist[iclr];
        var index: number = Card.Util.GetCardValue(data);
		var card : PokerCard = Card.Util.createPokerCard(index,color);
        this.hardCardList.push(card);
        return  card;
    }
  

   private Getindex(index :number,suit:CardColor):number
   {
       let _index :number= -1;
        for(var i = 0; i < this.hardCardList.length; i++){
            if(this.hardCardList[i].Index == index && this.hardCardList[i].Suit == suit)
             return i;
        }

        return _index;
   }
    public Removecard(data):boolean
    {
        var Colorlist:CardColor[] = [CardColor.Diamond, CardColor.Heart, CardColor.Club,CardColor.Spade,CardColor.SK];
        var iclr = Card.Util.GetCardColor(data);
        var color: CardColor = Colorlist[iclr];
        var index: number = Card.Util.GetCardValue(data);
        let x = this.Getindex(index,color);
        if(x>-1)
          {
               this.hardCardList.splice(x,1);
               return true;
          }
        return false;
    }

    public ExitGame()
    {
        this.bStartgame = false;
        this.StartgameTick = 0;

        this.timer.stop();
        MessageManager.Instance.removeEventListener(constant.msg.SC_TABLE_PLAYER_INFO, this.UpdatePlayers, this);
        MessageManager.Instance.removeSubEventListener(constant.sub_msg.SUB_S_SEND_CARD, this.DispatchCardStart, this);
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

   public get HandCards():Array<PokerCard>
   {
      return this.hardCardList;
   }
   
   public DispatchCardStart(data)
   {
       this.hardCardList = [];
       var Colorlist:CardColor[] = [CardColor.Diamond, CardColor.Heart, CardColor.Club,CardColor.Spade,CardColor.SK];
       this.bStartgame = true;
       let cards = data.cards[this.playerChairid];
       for (var i = 0;i < cards.length;i++)
	   {
            if(cards[i] == 0) continue;
            var iclr = Card.Util.GetCardColor(cards[i]);
            var color: CardColor = Colorlist[iclr];
            var index: number = Card.Util.GetCardValue(cards[i]);
			var card : PokerCard = Card.Util.createPokerCard(index,color);
            this.hardCardList.push(card);
	   }
       var addHardEvent:CardLogic.CardEvent = new CardLogic.CardEvent(CardLogic.CardEvent.AddHard);
       addHardEvent.paramObj = this.hardCardList;
       CardLogic.CardEventDispatcher.Instance.dispatchEvent(addHardEvent);
   }
   

    public GetPokerCards(cards):Array<PokerCard>
   {
       let CardList = [];
       var Colorlist:CardColor[] = [CardColor.Diamond, CardColor.Heart, CardColor.Club,CardColor.Spade,CardColor.SK];
       for (var i = 0;i < cards.length;i++)
	   {
            if(cards[i] == 0) continue;
            var iclr = Card.Util.GetCardColor(cards[i]);
            var color: CardColor = Colorlist[iclr];
            var index: number = Card.Util.GetCardValue(cards[i]);
			var card : PokerCard = Card.Util.createPokerCard(index,color);
            CardList.push(card);
	   }
       return CardList;
   }


}
   

}
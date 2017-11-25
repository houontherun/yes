	/**
	 * 斗地主逻辑
	 * @author  yanwei47@163.com
	 *
	 */
module CardLogic {
export class ddzGameLogic {

   private bStartgame:boolean = false;
   private StartgameTick : number = 0;
   private static shared: ddzGameLogic;
   public timerTick: () => void;
   private timer:egret.Timer ;

   public static Shared() {
        if(ddzGameLogic.shared == null) {
            ddzGameLogic.shared = new ddzGameLogic();
        }
        return ddzGameLogic.shared;
    }
    private allCardList:Array<PokerCard> = [];

	public constructor() {
	     this.CreateDeck();
         //egret.startTick(this.onUpdateFrame, this);
          this.timer = new egret.Timer(100); 
          this.timer.addEventListener(egret.TimerEvent.TIMER,this.onUpdateFrame,this)
          this.timer.start();
         this.timerTick = Timer.Instance.tick;
	}

    public ExitGame()
    {
        this.bStartgame = false;
        this.StartgameTick = 0;
        //egret.stopTick(this.onUpdateFrame, this);
        this.timer.stop();
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
   
    //创建一副牌
	public CreateDeck()
	{
	  var Colorlist:CardColor[] = [CardColor.Diamond, CardColor.Heart, CardColor.Club,CardColor.Spade];
      for(var _color = 0;_color<4;_color++)
	  {
		  for (var _index = 1;_index < 14;_index++)
		  {
			   var color:CardColor = Colorlist[_color];
			   var card : PokerCard = Card.Util.createPokerCard(_index,color);
               this.allCardList.push(card);
		  }
	  }
     
	   var skcard : PokerCard = Card.Util.createPokerCard(14,CardColor.SK);
	   var bkcard : PokerCard = Card.Util.createPokerCard(15,CardColor.SK);
       this.allCardList.push(skcard);
	   this.allCardList.push(bkcard);

    }

  private shuffle<T>(array:Array<T>) 
  {
     var m = array.length,
	  t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
	   array[i] = t;}
  }

   public Shuffle()
   {
	  if(this.allCardList.length == 54)
	  {
		  this.shuffle(this.allCardList);
		  for (var i = 0; i < this.allCardList.length; i++)
            {
                //console.log(this.allCardList[i]);
            }
	  }
   }

   public DispatchCardStart()
   {
       this.bStartgame = true;
       var addHardEvent:CardLogic.CardEvent = new CardLogic.CardEvent(CardLogic.CardEvent.AddHard);
       addHardEvent.paramObj = this.allCardList.slice(0,17);
       CardLogic.CardEventDispatcher.Instance.dispatchEvent(addHardEvent);
   }

}
   

}
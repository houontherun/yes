class DDZGameController {

   private bStartgame:boolean = false;
   private StartgameTick : number = 0;
   private static shared: DDZGameController;

   public static Shared() {
        if(DDZGameController.shared == null) {
            DDZGameController.shared = new DDZGameController();
        }
        return DDZGameController.shared;
    }
    private allCardList:Array<PokerCard> = [];

	public constructor() {
	     this.CreateDeck();
         egret.startTick(this.onUpdateFrame, this);
	}

    public ExitGame()
    {
        this.bStartgame = false;
        this.StartgameTick = 0;
        egret.stopTick(this.onUpdateFrame, this);
    }

    public ResetGame()
    {
        this.bStartgame = false;
        this.StartgameTick = 0;
    }
     
  private onUpdateFrame(timeStamp:number):boolean
   {
      var now = timeStamp;
      var time = this.StartgameTick;
      var pass = now - time;
      //console.log("pass: ",( pass/1000).toFixed(5));
      return false;
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
       this.StartgameTick = egret.getTimer();

        ui_game.Shared().AddhardCard(this.allCardList.slice(0,17));

   }


   

}
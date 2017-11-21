class GameController {

   private static shared: GameController;
   public static Shared() {
        if(GameController.shared == null) {
            GameController.shared = new GameController();
        }
        return GameController.shared;
    }
    private allCardList:Array<PokerCard> = [];

	public constructor() {
	
	}

   
    //创建一副牌
	public CreateDeck()
	{
      for(var _color = 0;_color<4;_color++)
	  {
		  for (var _index = 0;_index < 14;_index++)
		  {
               var color:CardColor = <CardColor>_color;
			   var card : PokerCard = Card.Util.createPokerCard(_index);
               this.allCardList.push(card);
		  }
	  }
     
	   var skcard : PokerCard = Card.Util.createPokerCard(14);
	   var bkcard : PokerCard = Card.Util.createPokerCard(15);
       this.allCardList.push(skcard);
	   this.allCardList.push(bkcard);

    }

   public Shuffle()
   {
	  if(this.allCardList.length == 54)
	  {
		  var newList:Array<PokerCard> = [];
		  let i= Math.floor(Math.random()*newList.length);
		
	  }
   }

}
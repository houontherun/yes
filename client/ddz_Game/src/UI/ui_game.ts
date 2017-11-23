class ui_game extends gameUI.base {

   private hardCardsArray:ui_pokerCardItem[] = [];
   private prepareBtn:eui.Button;
   private  btn_tuoguan : eui.Image;
   private bStart:boolean;
   private group_handcards:eui.Group;
   private cardsArray: ui_pokerCardItem[] = [];


	public constructor() {
		super("resource/eui_skins/ui_game.exml");
        Logic.CardEventDispatcher.Instance.addEventListener(Logic.CardEvent.AddHard,this.AddhardCard,this)
 		this.AddClick(this.btn_tuoguan, ()=>{ 
                 
            }, this );

        this.AddClick(this.prepareBtn, ()=>{   
            DDZGameController.Shared().Shuffle();   
            DDZGameController.Shared().DispatchCardStart();      
            }, this );
	}

   ///添加手牌
    public AddhardCard(e:Logic.CardEvent)
    {
        var cards:Array<PokerCard> = e.paramObj;

        if(this.cardsArray.length > 0) 
        {
           this.removehardCard();
        }
        Card.Util.sortCards(cards);
        for(var i =0;i< cards.length;i++)
        {
           var _card = new ui_pokerCardItem();
           _card.cardData = cards[i];
           this.group_handcards.addChild(_card);
           this.cardsArray.push(_card);
        }
        this.group_handcards.cacheAsBitmap = true;
    }


    public AppendCard()
    {

    }

    public AddotherCard()
    {
         
    }

    public removehardCard()
    {
        for(var i =0;i< this.cardsArray.length;i++)
        {
            this.group_handcards.removeChild(this.cardsArray[i]);
        }
         this.cardsArray = [];
    }
	
}
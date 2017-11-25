	/**
	 * 游戏场景
	 * @author  yanwei47@163.com
	 *
	 */
namespace Card {
  export class ui_game extends gameUI.base {

   private hardCardsArray:Card.ui_pokerCardItem[] = [];
   private prepareBtn:eui.Button;
   private  btn_tuoguan : eui.Image;
   private bStart:boolean;
   private group_handcards:eui.Group;
   private cardsArray: ui_pokerCardItem[] = [];


	public constructor() {
		super("resource/eui_skins/ddz_ui/ui_game.exml");
        CardLogic.CardEventDispatcher.Instance.addEventListener(CardLogic.CardEvent.AddHard,this.AddhardCard,this)
 		this.AddClick(this.btn_tuoguan, ()=>{ 
                 
            }, this );

        this.AddClick(this.prepareBtn, ()=>{   
            CardLogic.ddzGameLogic.Shared().Shuffle();   
            CardLogic.ddzGameLogic.Shared().DispatchCardStart();  

          
            }, this );
	}

   ///添加手牌
    public AddhardCard(e:CardLogic.CardEvent)
    {
        var cards:Array<PokerCard> = e.paramObj;

        if(this.cardsArray.length > 0) 
        {
           this.removehardCard();
        }
        Card.Util.sortCards(cards);
        
        var i:number = 0;
        
        let addcardTimer =  CardLogic.Timer.Instance.Repeat(0.16,()=>{
            if(i< cards.length)
            {
               var _card = new ui_pokerCardItem();
               _card.cardData = cards[i];
               _card.x = 36*i;
               _card.y = -10;
               //_card.setPos(36*i,-10);
               this.group_handcards.addChild(_card);
               this.cardsArray.push(_card);
               i++;
            }
            else
            {
               CardLogic.Timer.Instance.Remove(addcardTimer);
            }
         })  

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

}
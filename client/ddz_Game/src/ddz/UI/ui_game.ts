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
   private ChangeBtn :eui.Image;
   private Changeimg :eui.Image;
   private bStart:boolean;
   private group_handcards:eui.Group;
   private group_Player0:eui.Group;
   private cardsArray: ui_pokerCardItem[] = [];
   private otherPlayerNum:number = 2;

	public constructor() {
		super("resource/eui_skins/ddz_ui/ui_game.exml");
        CardLogic.CardEventDispatcher.Instance.addEventListener(CardLogic.CardEvent.AddHard,this.AddhardCard,this)
 		this.AddClick(this.btn_tuoguan, ()=>{ 
                 
            }, this );

        this.AddClick(this.prepareBtn, ()=>{   
            CardLogic.ddzGameLogic.Shared().Shuffle();   
            CardLogic.ddzGameLogic.Shared().DispatchCardStart();  

          
            }, this );

        this.AddClick(this.ChangeBtn,()=>{
            this.clearCurGame();
        },this);   

        this.AddClick(this.Changeimg,()=>{
            this.clearCurGame();
        },this);  
	}

    public onload():void {

        this.setPlayer(0,"小我问",85000,"face_1_png");
        }

   ///添加手牌
    public AddhardCard(e:CardLogic.CardEvent)
    {
        var cards:Array<PokerCard> = e.paramObj;

        Card.Util.sortCards(cards);
        
        var i:number = 0;
        
        let addcardTimer =  CardLogic.Timer.Instance.Repeat(0.16,()=>{
            if(i< cards.length)
            {
               var _card = new ui_pokerCardItem();
               _card.cardData = cards[i];
               _card.setPos(36*i,22);
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
        
        this.setPlayer(1,"nihao",1000,"face_2_png");
        this.setPlayer(2,"重设子对象深度",120000,"face_3_png");
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

    public setPlayer(playerNum:number,playername:string,coin:number,head:string)
    {
        var group ;
        if(playerNum>0)
        {
           group = <eui.Group>this.getChildAt(playerNum);
        }
        else
        {
            group = this.group_Player0;
        }
        
        if(group)
        {
            var txtName = <eui.Label>group.getChildAt(1); 
            txtName.text = playername;
            if(playerNum>0)
            {
               var txtcoin = <eui.Label>group.getChildAt(2); 
               txtcoin.text = coin.toString();
            }
            var img = new eui.Image();
            img.source = RES.getRes(head);
            img.x = 30;
            group.addChildAt(img,0);
            group.visible = true;
        }
       
    }

    
    // 清理当前牌局
    private clearCurGame()
    {
        if(this.cardsArray.length > 0) 
        {
           this.removehardCard();
        }

         for(let i =1;i<=this.otherPlayerNum;i++)
         {
             var group = <eui.Group>this.getChildAt(i);
             if(group)
             {
                 group.removeChildAt(0);
                 group.visible = false;
             }

         }
    }
    	
}

}
	/**
	 * 游戏场景
	 * @author  yanwei47@163.com
	 *
	 */
namespace Card {
  export class ui_game extends gameUI.base {

   private prepareBtn:eui.Button;
   private  btn_tuoguan : eui.Image;
   private ChangeBtn :eui.Image;
   private Changeimg :eui.Image;
   private bStart:boolean;
   private group_handcards:eui.Group;
   private group_Player0:eui.Group;// 4:头像 5：牌 6：牌数
   private txt_PlayerGold:eui.Label;
   private hardCardsArray: ui_pokerCardItem[] = [];
   private otherPlayerNum:number = 2;
   private prepareimg :eui.Image;
   private cardTotalnum: number;
   private TargetCardsArray: ui_pokerCardItem[] = [];


	public constructor() {
		super("resource/eui_skins/ddz_ui/ui_game.exml");
        CardLogic.CardEventDispatcher.Instance.addEventListener(CardLogic.CardEvent.AddOtherPlayers,this.addOtherPlayers,this)
        CardLogic.CardEventDispatcher.Instance.addEventListener(CardLogic.CardEvent.AddHard,this.AddhardCard,this)
 		this.AddClick(this.btn_tuoguan, ()=>{ 
                 
            }, this );

        this.AddClick(this.prepareBtn, ()=>{   
            CardLogic.ddzGameLogic.Shared().Shuffle();   
            CardLogic.ddzGameLogic.Shared().DispatchCardStart();  
          
            }, this );

        this.AddClick(this.ChangeBtn,()=>{
            this.clearCurGame();
            CardLogic.CardEventDispatcher.Instance.dispatchEvent(new CardLogic.CardEvent(CardLogic.CardEvent.AddOtherPlayers));
        },this); 

        this.Changeimg.$touchEnabled =false;  
        this.prepareimg.$touchEnabled =false;  
	}

    public onload():void {

        this.setPlayer(0,"小我问",85000,"face_1_png");
    }


   public addOtherPlayers(e:CardLogic.CardEvent)
   {
        this.setPlayer(1,"蛇头02",1000,"face_2_png");
        this.setPlayer(2,"重设子对象深度",120000,"face_3_png");
   }

   protected childrenCreated() {
            super.childrenCreated();
            for(let i = 0;i < this.hardCardsArray.length;i++){
                this.hardCardsArray[i].addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this);
                this.group_handcards.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);
            }
        }

      private  InTargetCards(item:any):number
      {
         for (let i = this.TargetCardsArray.length - 1;i >= 0;i--){
                if(item == this.TargetCardsArray[i]){
                    return i;
                }
            }

            return -1;
      }

     
       private touchMove(evt:egret.TouchEvent):void{
             
             let index = this.InTargetCards(evt.currentTarget);
              if(index<0)
               {
                  this.TargetCardsArray.push(<ui_pokerCardItem>evt.currentTarget);
               }

           
             this.moving();
        }

        private touchEnd(evt:egret.TouchEvent):void{
            this.CheckEnd();
        }

    private CheckEnd():void{
        for (let i = 0;i < this.hardCardsArray.length;i++) {
                this.hardCardsArray[i].alpha = 1;
            }
         for (let k = 0;k < this.TargetCardsArray.length;k++) {
                this.TargetCardsArray[k].SetShoot(!this.TargetCardsArray[k].Selected);
            }   
           this.TargetCardsArray = [];
    }

     private moving():void{
        for (let i = 0;i < this.TargetCardsArray.length;i++) {
                this.TargetCardsArray[i].alpha = 0.7;
            }
    }


    private GetShootCard():Array<PokerCard>
    {
        var cards:Array<PokerCard> = [];
        for (let i = 0;i < this.hardCardsArray.length;i++) {
               if(this.hardCardsArray[i].Selected)
                 cards.push(this.hardCardsArray[i].cardData);
            }
        return cards;
  }
        

   ///添加手牌
    public AddhardCard(e:CardLogic.CardEvent)
    {
        var cards:Array<PokerCard> = e.paramObj;

        Card.Util.sortCards(cards);
        this.cardTotalnum = cards.length;
        var i:number = 0;
         
        let addcardTimer =  CardLogic.Timer.Instance.Repeat(0.18,()=>{
            if(i< this.cardTotalnum )
            {
               var _card = new ui_pokerCardItem();
               _card.cardData = cards[i];
               _card.setPos(36*i,22);
               this.group_handcards.addChild(_card);
               this.hardCardsArray.push(_card);
               i++;
            }
            else
            {
               CardLogic.Timer.Instance.Remove(addcardTimer);
               this.childrenCreated();
            }
         })  

        this.group_handcards.cacheAsBitmap = true;
        this.AddotherCard();
    }


    public AddotherCard()
    {
         this.dealtoPlayer(1,Card.Seat.Left);
         this.dealtoPlayer(2,Card.Seat.Right);
    }

    public removehardCard()
    {
        for(var i =0;i< this.hardCardsArray.length;i++)
        {
            this.group_handcards.removeChild(this.hardCardsArray[i]);
        }
         this.hardCardsArray = [];
    }

    public setPlayer(playerNum:number,playername:string,coin:number,head:string)
    {
        var group ;
        if(playerNum>0)
        {
           group = <eui.Group>this.getChildAt(playerNum+1);
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
            else
            {
                this.txt_PlayerGold.text = coin.toString();
            }
            var img = new eui.Image();
            //img.mask = this.getChildAt(1);
            img.source = RES.getRes(head);
            img.x = 10;
            group.addChildAt(img,0);
            group.visible = true;
        }
       
    }

    public dealtoPlayer(playernum:number,seat:Card.Seat)
    {
         var group ;
         var textNum ;
        if(playernum>0)
        {
            group = <eui.Group>this.getChildAt(playernum+1);
            if(group.numChildren == 7)
            {
                 textNum = <eui.Label>group.getChildAt(6);
                 textNum.text = "1";
            }
            else
            {
               var backCard = new eui.Image();

               
               backCard.scaleX = backCard.scaleY = 0.6;
               backCard.source = RES.getRes("card_back_png");
               group.addChildAt(backCard,5);
               textNum = new eui.Label;
               textNum.fontFamily = "SimHei";
               textNum.strokeColor = 0x0000ff;   //描边颜色
               textNum.stroke = 2;               //描边宽度
               textNum.text = "1";
               textNum.textAlign = egret.HorizontalAlign.CENTER;
               
               if(seat == Card.Seat.Left)
               {
                  backCard.x = 250;
                  backCard.y = 200;
                  textNum.x = 270;
                  textNum.y = 240;
               }
               else
               {
                  backCard.x = 0;
                  backCard.y = 200;
                  textNum.x = 30;
                  textNum.y = 240;
               }
               
               group.addChildAt(textNum,6);
            }
            
            var i:number = 1;
            if(textNum)
            {
               let dealcardTimer = CardLogic.Timer.Instance.Repeat(0.18,()=>{
                    if(i<this.cardTotalnum )
                    {
                       textNum.text = i.toString();
                       i++;
                    }
                    else
                    {
                         CardLogic.Timer.Instance.Remove(dealcardTimer);
                    }
                    
                });
            }
           
            

        }
       
    }

    
    // 清理当前牌局
    private clearCurGame()
    {
        if(this.hardCardsArray.length > 0) 
        {
           this.removehardCard();
        }

         for(let i =1;i<=this.otherPlayerNum;i++)
         {
             var group = <eui.Group>this.getChildAt(i+1);
             if(group)
             {
                 group.visible = false;
                
             }
             if(group.numChildren > 4)
                group.removeChildAt(0);

         }
    }
    	
}

}
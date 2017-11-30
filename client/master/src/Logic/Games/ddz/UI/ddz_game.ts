	/**
	 * 游戏场景
	 * @author  yanwei47@163.com
	 *
	 */
namespace gameUI{
  export class ddz_game extends gameUI.base {

   private prepareBtn:eui.Image;
   private  btn_tuoguan : eui.Image;
   private ChangeBtn :eui.Image;
   private Changeimg :eui.Image;
   private bStart:boolean;
   private group_handcards:eui.Group;
   private group_Player0:eui.Group;// 4:头像 5：牌 6：牌数
   private txt_PlayerGold:eui.Label;
   private hardCardsArray: Card.ui_pokerCardItem[] = [];
   private PlayersNum:number = 3;
   private prepareimg :eui.Image;
   private cardTotalnum: number;
   private TargetCardsArray: Card.ui_pokerCardItem[] = [];
   private cardBegin: number = -1;
   private cardEnd: number = -1;
   private btn_back:eui.Image;
   private playerChairid:number = 0;
    public onload():void {
       
        super.onload();

        MessageManager.Instance.addEventListener(constant.msg.SC_USER_STAND_UP, this.Standup, this);
        MessageManager.Instance.addSubEventListener(constant.sub_msg.SUB_S_SEND_CARD, this.DispatchCard, this);
        MessageManager.Instance.addEventListener(constant.msg.SC_USER_READY, this.ReadyRet, this);
        CardLogic.ddzGameLogic.Instance.init();
        CardLogic.CardEventDispatcher.Instance.addEventListener(CardLogic.CardEvent.AddHard,this.AddhardCard,this);
        CardLogic.CardEventDispatcher.Instance.addEventListener(CardLogic.CardEvent.UpdatePlayers,this.SetplayersInfo,this);
 		this.AddClick(this.btn_tuoguan, ()=>{ 
                 
            }, this );

        this.AddClick(this.prepareBtn, ()=>{   
            MessageManager.Instance.SendMessage({
              protocol:constant.msg.CS_USER_READY
             });
            }, this );

        this.AddClick(this.ChangeBtn,()=>{
            this.clearCurGame();
        },this); 

        this.AddClick(this.btn_back, ()=>{   
             MessageManager.Instance.SendMessage({
              protocol:constant.msg.CS_USER_STAND_UP
           });
           
            }, this );
        this.Changeimg.$touchEnabled =false;  
        this.prepareimg.$touchEnabled =false;  
       
    }


   public onUnload():void{
        super.onUnload()
        MessageManager.Instance.removeEventListener(constant.msg.SC_USER_STAND_UP, this.Standup,this) ;
        MessageManager.Instance.removeSubEventListener(constant.sub_msg.SUB_S_SEND_CARD, this.DispatchCard, this);
        MessageManager.Instance.removeEventListener(constant.msg.SC_USER_READY, this.ReadyRet, this);
        CardLogic.CardEventDispatcher.Instance.removeEventListener(CardLogic.CardEvent.AddHard,this.AddhardCard,this);
        CardLogic.CardEventDispatcher.Instance.removeEventListener(CardLogic.CardEvent.UpdatePlayers,this.SetplayersInfo,this);
    }

 private ReadyRet(data)
 {
    if(data.ret == 0)
    {
        this.prepareBtn.parent.removeChild(this.prepareBtn);
        this.prepareimg.parent.removeChild(this.prepareimg);
    }
 }

  private SetplayersInfo()
  {
    this.clearOtherPlayers();
    var players = CardLogic.ddzGameLogic.Instance.ALLPlayers;
     if(players.length > 0)
     {
         for(var i = 0;i<players.length;i++)
         {
             if(players[i].UserId == PlayerManager.Instance.Data.UserId)
              {
                   this.playerChairid = players[i].ChairId;
              }
            
         }


         for(var i = 0;i<players.length;i++)
         {
             if(players[i].UserId == PlayerManager.Instance.Data.UserId)
              {
                    this.setPlayer(0,players[i].UserName,players[i].Gold,"face_1_png");
              }
              else
              {
                  let chairid = Math.abs(players[i].ChairId - this.playerChairid);
                  if((players[i].ChairId == this.PlayersNum -1)&&chairid!=this.PlayersNum -1)
                     chairid += 1;
                  if(chairid <this.PlayersNum)
                      this.setPlayer(chairid,players[i].UserName,players[i].Gold,"face_2_png");
              }
         }
     }
  }

  private Standup(data:any):void
  {
      UIManager.Instance.UnloadUI(UI.ddzGame);
      UIManager.Instance.LoadUI(UI.ddzRoom);   
      CardLogic.ddzGameLogic.Instance.ExitGame();
  }

  private DispatchCard(data):void
  {
       let cards = data.cards;
  }

   protected childrenCreated() {
            super.childrenCreated();
            for(let i = 0;i < this.hardCardsArray.length;i++){
                 this.hardCardsArray[i].addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this);
                this.hardCardsArray[i].addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this);
                this.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);
            }
        }

      private  InTargetCards(item:any):number
      {
         for (let i = this.hardCardsArray.length - 1;i >= 0;i--){
                if(item == this.hardCardsArray[i]){
                    return i;
                }
            }

            return -1;
      }
     
     private touchBegin(evt:egret.TouchEvent):void
     {
         this.TargetCardsArray = [];
         let index = this.InTargetCards(evt.currentTarget);
         this.cardBegin = index;
     }
     
       private touchMove(evt:egret.TouchEvent):void{
             
           let index = this.InTargetCards(evt.currentTarget);
           this.cardEnd = index;
           
           this.moving();
        }

        private touchEnd(evt:egret.TouchEvent):void{
            this.CheckEnd();

        }

    private CheckEnd():void{
        if(this.cardBegin<0||this.cardEnd<0) return;
        if(this.cardBegin == this.cardEnd) return;

        if(this.cardBegin<this.cardEnd)
            this.TargetCardsArray = this.hardCardsArray.slice( this.cardBegin,this.cardEnd+1);
        else
            this.TargetCardsArray = this.hardCardsArray.slice( this.cardEnd,this.cardBegin+1 );

        for (let i = 0;i < this.TargetCardsArray.length;i++) {
                this.TargetCardsArray[i].alpha = 1;
                this.TargetCardsArray[i].SetShoot(!this.TargetCardsArray[i].Selected);
            }
  
           this.TargetCardsArray = [];
           this.cardEnd = this.cardBegin = -1;
    }

     private moving():void{
  
        if(this.cardBegin<0||this.cardEnd<0) return;
        if(this.cardBegin<this.cardEnd)
            this.TargetCardsArray = this.hardCardsArray.slice( this.cardBegin,this.cardEnd +1);
        else
            this.TargetCardsArray = this.hardCardsArray.slice( this.cardEnd,this.cardBegin+1 );
            
       
       for (let i = 0;i < this.hardCardsArray.length;i++) {
                this.hardCardsArray[i].alpha = 1;
            }
        for (let i = 0;i < this.TargetCardsArray.length;i++) {
                this.TargetCardsArray[i].alpha = 0.8;
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
               var _card = new Card.ui_pokerCardItem();
               _card.cardData = cards[i];
               _card.setPos(45*i,22);
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

               
               backCard.scaleX = backCard.scaleY = 0.56;
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
                  textNum.x = 278;
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

    private clearOtherPlayers()
    {
         for(let i =1;i<this.PlayersNum;i++)
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


    // 清理当前牌局
    private clearCurGame()
    {
        if(this.hardCardsArray.length > 0) 
        {
           this.removehardCard();
        }

         this.clearOtherPlayers();
    }
    	
}

}
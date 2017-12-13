	/**
	 * 游戏场景
	 * @author  yanwei47@163.com
	 *
	 */
namespace gameUI{
  export class ddz_game extends gameUI.base {

   private prepareBtn:eui.Image;
   private  btn_tuoguan : eui.Image;
   private btn1 :eui.Image;
   private btn2 :eui.Image;
   private btn0 :eui.Image;

   private Text_bnt0:eui.Label;
   private Text_bnt1:eui.Label;
   private Text_bnt2:eui.Label;

   private bStart:boolean;
   private group_handcards:eui.Group;
   private group_otherPlayersHead:eui.Group;
   private group_Player0:eui.Group;// 4:头像 5：牌 6：牌数
   private txt_PlayerGold:eui.Label;
   private hardCardsArray: Card.ui_pokerCardItem[] = [];
   private PlayersNum:number = 3;

   private cardTotalnum: number;
   private TargetCardsArray: Card.ui_pokerCardItem[] = [];
   private cardBegin: number = -1;
   private cardEnd: number = -1;
   private btn_back:eui.Image;
   private group_btn:eui.Group;
   private clockCD:Card.ui_ClockCD;
   private curClockpos:number;
   private group_backcards:eui.Group;
   private txt_gamedouble:eui.Label;
   private cardItemArray = {};
   private buchuItemArray = {};
   private cdTimer = null;
   private newCurrentCards:any = [];
   private promptIndex : number = 0;

    public onload():void {
       
        super.onload();

        MessageManager.Instance.addEventListener(constant.msg.SC_USER_READY, this.ReadyRet, this);
        MessageManager.Instance.addSubEventListener(constant.sub_msg.SUB_S_LAND_SCORE, this.landScore, this);
        MessageManager.Instance.addSubEventListener(constant.sub_msg.SUB_S_GAME_START, this.StartGame, this);
        MessageManager.Instance.addSubEventListener(constant.sub_msg.SUB_S_OUT_CARD, this.OutCard, this);
        MessageManager.Instance.addSubEventListener(constant.sub_msg.SUB_S_PASS_CARD, this.PassCard, this);
        MessageManager.Instance.addSubEventListener(constant.sub_msg.SUB_S_GAME_END, this.GameEnd, this);
        MessageManager.Instance.addSubEventListener(constant.sub_msg.SUB_S_TRUSTEE, this.Trustee, this);

        CardLogic.ddzGameLogic.Instance.init();
        CardLogic.CardEventDispatcher.Instance.addEventListener(CardLogic.CardEvent.AddHard,this.AddhardCard,this);
        CardLogic.CardEventDispatcher.Instance.addEventListener(CardLogic.CardEvent.UpdatePlayers,this.SetplayersInfo,this);
 		this.AddClick(this.btn_tuoguan, ()=>{ 
                 
            }, this );

        this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.SendReady,this);
        this.AddClick(this.btn_back, ()=>{   
            GameManager.Instance.addEventListener(constant.event.logic.on_exit_game, ()=>{
                this.Close()
                CardLogic.ddzGameLogic.Instance.ExitGame();
            }, this)
            GameManager.Instance.exitDDZGame()
        }, this );

        this.Text_bnt0.visible = false;
    
        this.btn0.visible = false;
    }

  private  SendReady():void
   {
        MessageManager.Instance.SendMessage({
              protocol:constant.msg.CS_USER_READY
             });
   }

   private  SendSnatchlandLord():void
   {
         MessageManager.Instance.SendSubMessage({
                    sub_protocol:constant.sub_msg.SUB_C_LAND_SCORE,
                    score:1
                    });
   }
   
   private  SendUnSnatchlandLord():void
   {
         MessageManager.Instance.SendSubMessage({
                    sub_protocol:constant.sub_msg.SUB_C_LAND_SCORE,
                    score:0
                    });
   }

   private Sendpasscard():void
   {
        MessageManager.Instance.SendSubMessage({
                sub_protocol:constant.sub_msg.SUB_C_PASS_CARD
                });
   }

   private SendOutcard():void
   {
       let array = [];
       for (let _card of this.GetShootCard()) {
         array.push(Card.Util.GetSCCarddata(_card));
       }
       let count = array.length;
       MessageManager.Instance.SendSubMessage({
       sub_protocol:constant.sub_msg.SUB_C_OUT_CART,
       cards:array,
       card_count:count
       });
       array = [];
   }

   public onUnload():void{
        super.onUnload()
        MessageManager.Instance.removeEventListener(constant.msg.SC_USER_READY, this.ReadyRet, this);
        MessageManager.Instance.removeSubEventListener(constant.sub_msg.SUB_S_LAND_SCORE, this.landScore, this);
        MessageManager.Instance.removeSubEventListener(constant.sub_msg.SUB_S_GAME_START, this.StartGame, this);
        MessageManager.Instance.removeSubEventListener(constant.sub_msg.SUB_S_OUT_CARD, this.OutCard, this);
        MessageManager.Instance.removeSubEventListener(constant.sub_msg.SUB_S_PASS_CARD, this.PassCard, this);
        MessageManager.Instance.removeSubEventListener(constant.sub_msg.SUB_S_GAME_END, this.GameEnd, this);
        MessageManager.Instance.removeSubEventListener(constant.sub_msg.SUB_S_TRUSTEE, this.Trustee, this);
        CardLogic.CardEventDispatcher.Instance.removeEventListener(CardLogic.CardEvent.AddHard,this.AddhardCard,this);
        CardLogic.CardEventDispatcher.Instance.removeEventListener(CardLogic.CardEvent.UpdatePlayers,this.SetplayersInfo,this);
    }

   private GetGroupChairid(chairid:number):eui.Group
   {
        let group :  eui.Group;
         var pos: number ;
         if(CardLogic.ddzGameLogic.Instance.playerChairid == chairid)  
           {
               group = this.group_Player0;
               pos = 0;
         }
         else
          {
             pos = CardLogic.ddzGameLogic.Instance.playerposInfo[chairid];
             group = <eui.Group>this.getChildAt(pos+2);
          }
          let Scorepos = group.getChildByName("Label_pos");
          return group;
   }


  //插入底牌
   private AddBackCard(backcards)
   {
       if(this.hardCardsArray.length > 0) 
         {
            this.removehardCard();
         }
        let backCardsArray = [];
        for(var i = 0;i<backcards.length;i++)
          {
             backCardsArray.push(CardLogic.ddzGameLogic.Instance.Addcard(backcards[i]));
          }
        Card.Util.sortCards(CardLogic.ddzGameLogic.Instance.HandCards);
        let cards =  CardLogic.ddzGameLogic.Instance.HandCards;
        for (var i = 0;i < cards.length;i++)
        {
            var _card = new Card.ui_pokerCardItem();
           _card.cardData = cards[i];
           _card.setPos(45*i,16);
           this.group_handcards.addChild(_card);
            this.AddTohardCardsArray(_card);

           let index :number  = backCardsArray.indexOf(cards[i]);
           if(index >-1)
            {
               _card.SetShoot(true);
               
            }
       }
   }


   private OutCard(data)
   {
       this.SetBtnsGame(false);
       this.PlayerOutCard(data.chair_id,data.cards,data.card_count);
       let playerChairid =   CardLogic.ddzGameLogic.Instance.playerChairid;
       this.newCurrentCards = data.cards;
       if(data.current_user == playerChairid) 
       {
            this.promptIndex = 0;
            CardLogic.ddzGameLogic.Instance.GenPressedCards(this.newCurrentCards);
            this.PlayermeOutCard();
       }

      if(data.current_user!= constant.INVALID)
        this.countdown(data.current_user,data.time);
       
   }

   private GameEnd(data)
   {
      let rankDatatables = [] ;
      for(var i = 0;i<data.names.length;i++)
      {
         let rankData = new Card.PlayerRankData(data.names[i],data.golds[i],data.base_score,data.user_time[i]);
         rankDatatables.push(rankData);
      }
      let settle:Card.ui_GameSettle = new Card.ui_GameSettle(data.result,rankDatatables);
      this.addChild(settle);
      settle.SetContinueclick(()=>{
          this.removeChild(settle);
          settle = null;
          this.clearCurGame();
          this.restart();
      });

      settle.SetExitClick(()=>{   
             MessageManager.Instance.SendMessage({
              protocol:constant.msg.CS_USER_STAND_UP
           });
           this.removeChild(settle);
           settle = null;
            });
     
   }

   private PassCard(data)
   {
       if(data.chair_id != constant.INVALID)
       {
           var chairid = data.chair_id;
           let group = this.GetGroupChairid(chairid);
          if(this.cardItemArray&&this.cardItemArray[chairid]!=null)
          {
            for(let carditem of this.cardItemArray[chairid])
            {
               group.removeChild(carditem);
             }
          }
      
           this.cardItemArray[chairid] = []

           if(this.buchuItemArray&&this.buchuItemArray[chairid] )
            {
                group.removeChild(this.buchuItemArray[chairid]);
            }
            this.buchuItemArray[chairid] = null
          
           let Scorepos = group.getChildByName("Label_pos");
           var img = new eui.Image();
            img.source = RES.getRes('buchu_png');
            if(Scorepos.x<10)
               img.x = Scorepos.x - 60;
            else
               img.x = Scorepos.x;
            img.y = Scorepos.y;
             
            group.addChild(img);
            this.buchuItemArray[chairid] = img

            if(chairid == CardLogic.ddzGameLogic.Instance.playerChairid)
            {
                this.CancelShootCard();
            }
       }
    
       this.SetBtnsGame(false);
       this.countdown(data.current_user,data.time);
       let playerChairid =  CardLogic.ddzGameLogic.Instance.playerChairid;  
       if(data.current_user == playerChairid) 
       {
            CardLogic.ddzGameLogic.Instance.GenPressedCards(this.newCurrentCards);
            this.PlayermeOutCard(data.new_turn);
       }
   }

   private Trustee(data)
   {

   }

   //提示
   private prompt():void
   {
       var PressedCards = CardLogic.ddzGameLogic.Instance.GetPressedCards();
       if( PressedCards.length > 0)
       {
           for (let i = 0;i < this.hardCardsArray.length;i++) {
                 this.hardCardsArray[i].SetShoot(false);
            }

            if(this.promptIndex == PressedCards.length)
            {
                this.promptIndex = 0;
            }
           for(let j = 0;j<PressedCards[this.promptIndex].length;j++)
              {
                   let pokercard = PressedCards[this.promptIndex][j];
                   var _index = CardLogic.ddzGameLogic.Instance.GetIndex(pokercard);
                   this.hardCardsArray[_index].SetShoot(true);
              }
             this.promptIndex ++; 
       }
   }

   //轮到自己出牌
   private PlayermeOutCard(bFirst:number = 0)
   {
        this.SetBtnsGame(true);
        this.Text_bnt1.text = "不出";
        this.Text_bnt0.text = "出牌";
        this.Text_bnt2.text = "提示";

        this.btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.SendSnatchlandLord,this);
        this.btn0.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.SendUnSnatchlandLord,this);
        
        this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.Sendpasscard,this);
        this.btn0.addEventListener(egret.TouchEvent.TOUCH_TAP,this.SendOutcard,this);
        this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.prompt,this);
        var playerChairid =  CardLogic.ddzGameLogic.Instance.playerChairid;  
        
        if(bFirst == 0)
        {
            var PressedCards = CardLogic.ddzGameLogic.Instance.GetPressedCards();
           if( PressedCards.length <1 )
           {
               this.SetBtnsGame(false);
               this.Text_bnt1.visible = true;
               this.btn1.visible = true;
               this.Text_bnt1.x = 330;
               this.btn1.x = 315;
           }
        }
        else
        {
           this.SetBtnsGame(false);
           this.Text_bnt0.visible = true;
           this.btn0.visible = true;
           this.Text_bnt0.x = 330;
           this.btn0.x = 315;
        }
        

        //去掉上一局的牌或者不出
        if(this.buchuItemArray&&this.buchuItemArray[playerChairid] )
            {
                this.group_Player0.removeChild(this.buchuItemArray[playerChairid]);
            }
            this.buchuItemArray[playerChairid] = null

        if(this.cardItemArray&&this.cardItemArray[playerChairid]!=null)
          {
            for(let carditem of this.cardItemArray[playerChairid])
            {
               this.group_Player0.removeChild(carditem);
             }
        }
    
        this.cardItemArray[playerChairid] = []   
   }

   private StartGame(data)
   {   
        let score :number = data.land_score ;
        this.txt_gamedouble.text = score.toString();
        CardLogic.ddzGameLogic.Instance.landUser = data.land_user;
        let playerChairid =   CardLogic.ddzGameLogic.Instance.playerChairid;   
  
        if(data.last_user != constant.INVALID)
       {
          let group = this.GetGroupChairid(data.last_user);
        
          let Scorepos = group.getChildByName("Label_pos");
          var img = new eui.Image();
           if(data.land_score == 1)
            {
                img.source = RES.getRes('qiangdizhuzhi_png');
            }
            else if(data.land_score == 0)
            {
                img.source = RES.getRes("buqiang_png");
            }
            img.x = Scorepos.x;
            img.y = Scorepos.y;
            group.addChild(img);
            CardLogic.Timer.Instance.Delay(3.2,()=>{
                 group.removeChild(img);
            });
       }

       if(data.land_user!= constant.INVALID)
       {
          let group = this.GetGroupChairid(data.land_user);
          var maoimg = new eui.Image();
          maoimg.source = RES.getRes('dizhumao_png');
          maoimg.y = 0;
          maoimg.x = 12 ;
          group.addChild(maoimg);
       }


       if(data.land_user == playerChairid) 
       {
           this.AddBackCard(data.back_card);
           this.PlayermeOutCard(1);
       }

       var cards = CardLogic.ddzGameLogic.Instance.GetPokerCards(data.back_card);
       for(var i = 0;i<cards.length;i++)
       {
           var _backcard = new Card.ui_pokerCardItem();
           _backcard.SetSize(0.7);
           _backcard.cardData = cards[i];
           this.group_backcards.addChild(_backcard);
       }

       this.countdown(data.land_user,data.time);
   }

  private SetBtnsGame(bvisible:boolean)
   {
       this.Text_bnt1.visible = bvisible;
       this.btn1.visible = bvisible;
       this.Text_bnt2.visible = bvisible;
    
       this.btn2.visible = bvisible;

       this.Text_bnt0.visible = bvisible;
    
       this.btn0.visible = bvisible;
       this.btn0.x = 480;
       this.btn1.x = 87;
       this.btn2.x = 315;

       this.Text_bnt0.x = 495;
       this.Text_bnt1.x = 101;
       this.Text_bnt2.x = 330;
   }



   //叫地主
   private landScore(data)
   {
      if(data.land_user != constant.INVALID)
       {
           let group = this.GetGroupChairid(data.land_user);
        
          let Scorepos = group.getChildByName("Label_pos");
          var img = new eui.Image();
           if(data.land_score == 1)
            {
                img.source = RES.getRes('qiangdizhuzhi_png');
            }
            else if(data.land_score == 0)
            {
                img.source = RES.getRes("buqiang_png");
            }
            img.x = Scorepos.x - 30;
            img.y = Scorepos.y;
            group.addChild(img);
            CardLogic.Timer.Instance.Delay(3.2,()=>{
                 group.removeChild(img);
            });

       }

       if(data.current_user != constant.INVALID)
       {
            this.countdown(data.current_user,data.time);
            if(data.current_user == CardLogic.ddzGameLogic.Instance.playerChairid)
            {
                this.Text_bnt2.text = "不抢";
                this.SetBtnsGame(true);
                this.Text_bnt1.text = "抢地主";
                this.Text_bnt0.visible = false;
    
                this.btn0.visible = false;
                this.btn2.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.SendReady,this);

                this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.SendSnatchlandLord,this);
                this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.SendUnSnatchlandLord,this);
            }

            else
            {
                this.SetBtnsGame(false);
            }
       }
   }


 private ReadyRet(data)
 {
    if(data.ret == 0)
    {
       this.Text_bnt2.text = "已准备";
       this.Text_bnt1.visible = false;
       this.btn1.visible = false;
    }
 }

  

  //创建闹钟
  private countdown(chairid:number,cd:number)
  {
      if(!this.clockCD)
        this.clockCD = new Card.ui_ClockCD();
     
     let group :  eui.Group;
     var pos: number ;
     if(CardLogic.ddzGameLogic.Instance.playerChairid == chairid)  
     {
         group = this.group_Player0;
         pos = 0;
     }
     else
     {
         pos = CardLogic.ddzGameLogic.Instance.playerposInfo[chairid];
         group = <eui.Group>this.getChildAt(pos+2);
     }
    if(this.cdTimer)
    {
        CardLogic.Timer.Instance.Remove(this.cdTimer);
        this.cdTimer = null;
    }
    if(group&&this.curClockpos!=pos)
    {
       let clockpos = group.getChildByName("Label_pos");
       this.clockCD .x = clockpos.x - 33;
       this.clockCD .y= clockpos.y - 60;
       this.clockCD.visible = true;
       group.addChild(this.clockCD);
       this.curClockpos = pos;
       this.cdTimer = CardLogic.Timer.Instance.Repeat(1,()=>{
           var sec =  cd - NetworkManager.Instance.ServerTimestamp ;
            if(sec>0&&this.clockCD)
             {
                this.clockCD.SetCd(sec);
            }
            else
             {
                 CardLogic.Timer.Instance.Remove(this.cdTimer);
                 this.cdTimer = null;
                 if(this.clockCD)
                    this.clockCD.visible = false;
             }  });
    }
  }

 //倒计时
  private DelayTimer(delay:number)
  {
      if(this.clockCD)
      {
          this.clockCD.SetCd(delay);
      }
  }



 private getrelativeChair(Chairid:number):number{
        var i = 0;
        var players = CardLogic.ddzGameLogic.Instance.ALLPlayers;
        var playerChairid = CardLogic.ddzGameLogic.Instance.playerChairid ;
        var firstplayer = CardLogic.ddzGameLogic.Instance.GetPlayer(playerChairid);
        if(firstplayer == null) return -1;
        while(i<this.PlayersNum)
        {
            if(firstplayer.ChairId == Chairid)
              return i;
            else
            {
                firstplayer = firstplayer.PrePlayer;
                i++;
            }
        }
        return -1;
  }

 private SetplayersInfo()
  {
    this.clearPlayers(true);
    this.group_otherPlayersHead.removeChildren();
    var players = CardLogic.ddzGameLogic.Instance.ALLPlayers;

     if(players.length > 0)
     {
         for(var i = 0;i<players.length;i++)
         {
             if(players[i].UserId == PlayerManager.Instance.Data.UserId)
              {
                    CardLogic.ddzGameLogic.Instance.playerChairid = players[i].ChairId;
              }
            
         }

         for(var i = 0;i<players.length;i++)
         {

             if(players[i].UserId == PlayerManager.Instance.Data.UserId)
              {
                    this.setPlayer(0,players[i].UserName,players[i].Gold,"face_1_png");
                    CardLogic.ddzGameLogic.Instance.playerposInfo[players[i].ChairId] = 0;
              }
              else
              {
                  let chairid = this.getrelativeChair(players[i].ChairId);
                  if(chairid > -1)
                  {
                     this.setPlayer(chairid,players[i].UserName,players[i].Gold,"face_2_png");
                     CardLogic.ddzGameLogic.Instance.playerposInfo[players[i].ChairId] = chairid;
                  }
                  
              }
         }

     }
  }

  


  public PlayerOutCard(chairid:number,array:any,remainCount:number)
  {
     var cards = CardLogic.ddzGameLogic.Instance.GetPokerCards(array);
     
     var group = this.GetGroupChairid(chairid);
     let Scorepos = group.getChildByName("Label_pos");
     let startposX :number = 0;
     startposX = Scorepos.x - 30;

     let posY = 24;
     startposX = Scorepos.x ;
     if(startposX < 10)
     {
         startposX = startposX  - 30*cards.length;
     }
     if(this.cardItemArray&&this.cardItemArray[chairid]!=null)
     {
        for(let carditem of this.cardItemArray[chairid])
        {
           group.removeChild(carditem);
        }
     }
    
     this.cardItemArray[chairid] = []

     if(this.buchuItemArray&&this.buchuItemArray[chairid] )
        {
            group.removeChild(this.buchuItemArray[chairid]);
        }
     this.buchuItemArray[chairid] = null
     if(chairid == CardLogic.ddzGameLogic.Instance.playerChairid)
        posY = Scorepos.y - 25;
     else
     {
        let textNum :eui.Label = <eui.Label>group.getChildAt(6);   //显示剩余牌
        if(textNum) textNum.text = remainCount.toString();
     }
     for (var i = 0;i < cards.length;i++)
	   {
          var _card = new Card.ui_pokerCardItem();
          _card.cardData = cards[i];
          _card.setPos(startposX + 30*i,posY);
          _card.SetSize(0.75);
          group.addChild(_card);
          if((i==cards.length-1) && chairid == CardLogic.ddzGameLogic.Instance.landUser)
              _card.Setlandlord(true);
          this.cardItemArray[chairid].push(_card);
	   }
        

      //更新手牌      
     if(chairid == CardLogic.ddzGameLogic.Instance.playerChairid)
     {
         for (let _data of array)
	     {
            CardLogic.ddzGameLogic.Instance.Removecard(_data);
	     }
         if(this.hardCardsArray.length > 0) 
         {
            this.removehardCard();
         }
        this.group_handcards.removeChildren();
        let cards = CardLogic.ddzGameLogic.Instance.HandCards;
        for (var i = 0;i < cards.length;i++)
        {
            var _card = new Card.ui_pokerCardItem();
           _card.cardData = cards[i];
           _card.setPos(45*i,16);
           this.group_handcards.addChild(_card);
           this.AddTohardCardsArray(_card);
       }
    }

  }


 public setPlayer(playerNum:number,playername:string,coin:number,head:string)
    {
        var group ;
        if(playerNum>0)
        {
           group = <eui.Group>this.getChildAt(playerNum+2);
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
            group.visible = true;
        }

         var img = new eui.Image();
            //img.mask = this.getChildAt(1);
         img.source = RES.getRes(head);
         if(playerNum<2)
           img.x = 10;
        else
           img.x = this.group_otherPlayersHead.width - 300;
        if(playerNum>0)
            this.group_otherPlayersHead.addChild(img);
         else
           group.addChildAt(img,0);
       
    }

    public dealtoPlayer(playernum:number,seat:Card.Seat)
    {
         var group ;
         var textNum ;
        if(playernum>0)
        {
            group = <eui.Group>this.getChildAt(playernum+2);
            if(group.numChildren == 8)
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
  //明牌处理
  private OpenDeal()
  {
       this.Text_bnt2.visible = false;
       this.btn2.visible = false;
       var img = new eui.Image();
        var i:number = 4;
        this.AddClick(img,()=>{
            MessageManager.Instance.SendSubMessage({
            sub_protocol:constant.sub_msg.SUB_C_BRIGHT,
            chair_id:CardLogic.ddzGameLogic.Instance.playerChairid
        })
        },this);
        img.source = RES.getRes("btn2_png");
        img.width = 185*0.75;
        img.height = 85*0.75;
        img.x = this.group_btn.width / 2 +20;
        img.y = 14;
        this.group_btn.addChild(img);
        var textNum =  new eui.Label;
        textNum.fontFamily = "SimHei";
        textNum.textColor = 0x0000AA;   //描边颜色
      // textNum.strokeColor = 0xe2a92b;   //描边颜色
      // textNum.stroke = 1.2;               //描边宽度
       textNum.text = "明牌×8";
       textNum.size = 30;
       textNum.x = this.group_btn.width / 2 + 36 ;
       textNum.y = img.y + 13.5 ;
       textNum.textAlign = egret.HorizontalAlign.CENTER;
       this.group_btn.addChild(textNum);
       var OpenDealTimer =  CardLogic.Timer.Instance.Repeat(1.2,()=>{
          if(i>0)
          {
              textNum.text = "明牌×" + i.toString();
              i-=2;
          }
         else
          {
              CardLogic.Timer.Instance.Remove(OpenDealTimer);
              this.group_btn.removeChild(textNum);
              this.group_btn.removeChild(img);
          }

      });
  }

   protected childrenCreated() {
            super.childrenCreated();
            this.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);
        }


     private AddTohardCardsArray( item :Card.ui_pokerCardItem)
     {
         this.hardCardsArray.push(item);
         item.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this);
         item.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this);
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

   private CancelShootCard()
    {
        for (let i = 0;i < this.hardCardsArray.length;i++) {
               if(this.hardCardsArray[i].Selected)
                 this.hardCardsArray[i].SetShoot(false);
            }
   }
        

   ///添加手牌
    public AddhardCard(e:CardLogic.CardEvent)
    {
        if(this.hardCardsArray.length > 0) 
        {
           this.removehardCard();
        }
        this.OpenDeal();
        var cards:Array<PokerCard> = e.paramObj;

        Card.Util.sortCards(cards);
        this.cardTotalnum = cards.length;
        var i:number = 0;
        
        let addcardTimer =  CardLogic.Timer.Instance.Repeat(0.18,()=>{
            if(i< this.cardTotalnum )
            {
               var _card = new Card.ui_pokerCardItem();
               _card.cardData = cards[i];
               _card.setPos(45*i,16);
               this.group_handcards.addChild(_card);
                this.AddTohardCardsArray(_card);
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

   

    private clearPlayers(bchangePlayer:boolean = false)
    {

        var playerNum : number = 0;
         for(let i =1;i<this.PlayersNum;i++)
         {
             var group = <eui.Group>this.getChildAt(i+2);
             playerNum = 5;
             
              while(group.numChildren > playerNum)
              {
                 group.removeChildAt(group.numChildren -1);
              }
           group.visible = false;
         }

         playerNum = 4;
         if(bchangePlayer)
          {
             if( this.group_Player0.numChildren > 3)
                this.group_Player0.removeChildAt(0);     
              playerNum = 3;  
          }
          
          while(this.group_Player0.numChildren > playerNum)
          {
              this.group_Player0.removeChildAt(this.group_Player0.numChildren -1);
          }

    }
   
   private restart()
   {
        this.SetBtnsGame(true);
        this.Text_bnt1.text = "换桌";
        this.Text_bnt2.text = "准备";
        this.Text_bnt0.visible = false;
    
        this.btn0.visible = false;
        this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.SendReady,this);
   }

    // 清理当前牌局
    private clearCurGame()
    {
        if(this.hardCardsArray.length > 0) 
        {
           this.removehardCard();
        }
        this.group_backcards.removeChildren();   
        this.clearPlayers();
        this.btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.Sendpasscard,this);
        this.btn2.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.SendOutcard,this);
        this.cardItemArray = {};
        this.buchuItemArray = {};
        if(this.clockCD)
        {
           this.clockCD = null;
        }
        this.txt_gamedouble.text = "1";

    }
    	
}

}
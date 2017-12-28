/**
 * 游戏场景
 * @author  yanwei47@163.com
 *
 */
namespace gameUI {
    export class ddz_game extends gameUI.base {

        private prepareBtn: eui.Image;
        private btn_tuoguan: eui.Image;
        private btn1: eui.Image;
        private btn2: eui.Image;
        private btn0: eui.Image;
        private btn3: eui.Image;

        private Text_bnt0: eui.Label;
        private Text_bnt1: eui.Label;
        private Text_bnt2: eui.Label;
        private Text_bnt3: eui.Label;
        private group_tuoguan:eui.Group;

        private bStart: boolean;
        private bTrustee:boolean = false;
        private group_handcards: eui.Group;
        private group_otherPlayersHead: eui.Group;
        private group_Player0: eui.Group;// 4:头像 5：牌 6：牌数
        private txt_PlayerGold: eui.Label;
        private hardCardsArray: Card.ui_pokerCardItem[] = [];
        private PlayersNum: number = 3;
        private curOutcardPlayerid:number = -1;
    
        private cardTotalnum: number;
        private TargetCardsArray: Card.ui_pokerCardItem[] = [];  //滑动选牌
        private cardBegin: number = -1;
        private cardEnd: number = -1;
        private btn_back: eui.Image;
        private group_btn: eui.Group;
        private clockCD: Card.ui_ClockCD;
        private curClockpos: number;
        private group_backcards: eui.Group;
        private txt_gamedouble: eui.Label;
        private cardItemArray = {};
        private buchuItemArray = {};
        private cdTimer = null;
        private newCurrentCards: any = [];
        private promptIndex: number = 0;
        private BrightCardsArray = {};
        private readyUIArray = {};
        private tuoguanUIArray = {};
        private bBrightcard:boolean = false;  //明牌
        private brightEvent:Function = null;

        public onload(): void {

            MessageManager.Instance.addEventListener(constant.msg.SC_USER_READY, this.ReadyRet, this);
            MessageManager.Instance.addSubEventListener(constant.sub_msg.SUB_S_LAND_SCORE, this.landScore, this);
            MessageManager.Instance.addSubEventListener(constant.sub_msg.SUB_S_GAME_START, this.StartGame, this);
            MessageManager.Instance.addSubEventListener(constant.sub_msg.SUB_S_OUT_CARD, this.OutCard, this);
            MessageManager.Instance.addSubEventListener(constant.sub_msg.SUB_S_PASS_CARD, this.PassCard, this);
            MessageManager.Instance.addSubEventListener(constant.sub_msg.SUB_S_GAME_END, this.GameEnd, this);
            MessageManager.Instance.addSubEventListener(constant.sub_msg.SUB_S_TRUSTEE, this.Trustee, this);
            MessageManager.Instance.addSubEventListener(constant.sub_msg.SUB_S_USER_BRIGHT, this.Bright, this);

            CardLogic.ddzGameLogic.Instance.init();
            CardLogic.CardEventDispatcher.Instance.addEventListener(CardLogic.CardEvent.AddHard, this.AddhardCard, this);
            CardLogic.CardEventDispatcher.Instance.addEventListener(CardLogic.CardEvent.UpdatePlayers, this.SetplayersInfo, this);
            CardLogic.CardEventDispatcher.Instance.addEventListener(CardLogic.CardEvent.UpdatePlayersStatus, this.UpdatePlayersStatus, this);

            GameManager.Instance.addEventListener(constant.event.logic.on_exit_game, this.onExitDDZGame, this)
            this.AddClick(this.btn_tuoguan, () => {
                if( this.bTrustee )
                   this.SendTurstee(0);
                else
                  this.SendTurstee(1);
            }, this);

            this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.SendReady, this);
            this.AddClick(this.btn_back, () => {
                GameManager.Instance.exitDDZGame()
            }, this);
               
            this.Text_bnt0.visible = false;
            
            this.btn0.visible = false;
            this.Text_bnt3.touchEnabled = false;

             this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                 this.SendTurstee(0);
             }, this);
        }

        private onExitDDZGame(){
            this.Close()
            CardLogic.ddzGameLogic.Instance.ExitGame();
        }

        private SendReady(): void {
            MessageManager.Instance.SendMessage({
                protocol: constant.msg.CS_USER_READY
            });
        }

        private SendSnatchlandLord(): void {
            MessageManager.Instance.SendSubMessage({
                sub_protocol: constant.sub_msg.SUB_C_LAND_SCORE,
                score: 1
            });
        }

        private SendTurstee(btrustee:number):void{
             MessageManager.Instance.SendSubMessage({
                sub_protocol: constant.sub_msg.SUB_C_TRUSTEE,
                chair_id: CardLogic.ddzGameLogic.Instance.playerChairid,
                trustee:btrustee
            });
        }

        private SendUnSnatchlandLord(): void {
            MessageManager.Instance.SendSubMessage({
                sub_protocol: constant.sub_msg.SUB_C_LAND_SCORE,
                score: 0
            });
        }

        private Sendpasscard(): void {
            MessageManager.Instance.SendSubMessage({
                sub_protocol: constant.sub_msg.SUB_C_PASS_CARD
            });
        }

        private SendOutcard(): void {
            let array = [];
            for (let _card of this.GetShootCard()) {
                array.push(Card.Util.GetSCCarddata(_card));
            }
            let count = array.length;
            MessageManager.Instance.SendSubMessage({
                sub_protocol: constant.sub_msg.SUB_C_OUT_CART,
                cards: array,
                card_count: count
            });
            array = [];
        }

        public onUnload(): void {
            super.onUnload()
            MessageManager.Instance.removeEventListener(constant.msg.SC_USER_READY, this.ReadyRet, this);
            MessageManager.Instance.removeSubEventListener(constant.sub_msg.SUB_S_LAND_SCORE, this.landScore, this);
            MessageManager.Instance.removeSubEventListener(constant.sub_msg.SUB_S_GAME_START, this.StartGame, this);
            MessageManager.Instance.removeSubEventListener(constant.sub_msg.SUB_S_OUT_CARD, this.OutCard, this);
            MessageManager.Instance.removeSubEventListener(constant.sub_msg.SUB_S_PASS_CARD, this.PassCard, this);
            MessageManager.Instance.removeSubEventListener(constant.sub_msg.SUB_S_GAME_END, this.GameEnd, this);
            MessageManager.Instance.removeSubEventListener(constant.sub_msg.SUB_S_TRUSTEE, this.Trustee, this);
            MessageManager.Instance.removeSubEventListener(constant.sub_msg.SUB_S_USER_BRIGHT, this.Bright, this);

            CardLogic.CardEventDispatcher.Instance.removeEventListener(CardLogic.CardEvent.AddHard, this.AddhardCard, this);
            CardLogic.CardEventDispatcher.Instance.removeEventListener(CardLogic.CardEvent.UpdatePlayers, this.SetplayersInfo, this);
            CardLogic.CardEventDispatcher.Instance.removeEventListener(CardLogic.CardEvent.UpdatePlayersStatus, this.UpdatePlayersStatus, this);

            
            GameManager.Instance.removeEventListener(constant.event.logic.on_exit_game, this.onExitDDZGame, this)
        }

        private GetGroupChairid(chairid: any): eui.Group {
            let group: eui.Group;
            var pos: number;
            if (CardLogic.ddzGameLogic.Instance.playerChairid == chairid) {
                group = this.group_Player0;
                pos = 0;
            }
            else {
                pos = CardLogic.ddzGameLogic.Instance.playerposInfo[chairid];
                group = <eui.Group>this.getChildAt(pos + 2);
            }
            return group;
        }


        //插入底牌
        private AddBackCard(backcards) {
            if (this.hardCardsArray.length > 0) {
                this.removehardCard();
            }
            let backCardsArray = [];
            for (var i = 0; i < backcards.length; i++) {
                backCardsArray.push(CardLogic.ddzGameLogic.Instance.Addcard(backcards[i]));
            }
            Card.Util.sortCards(CardLogic.ddzGameLogic.Instance.HandCards);
            let cards = CardLogic.ddzGameLogic.Instance.HandCards;
            let startposx = this.group_handcards.width / 2 - cards.length*45/2 - 58;
            for (var i = 0; i < cards.length; i++) {
                var _card = new Card.ui_pokerCardItem();
                _card.cardData = cards[i];
                _card.setPos(startposx + 48 * i, 16);
                this.group_handcards.addChild(_card);
                this.AddTohardCardsArray(_card);
               if (i == cards.length - 1)
               {
                   _card.Setbiglandlord(true);
                   if( this.bBrightcard)
                     _card.SetBright(true);
               }
                let index: number = backCardsArray.indexOf(cards[i]);
                if (index > -1) {
                    _card.SetShoot(true);
                 
                }
            }
        }


        ///设置已准备
        private setReadyUI(chairid)
        {
             let group = this.GetGroupChairid(chairid);
             let pos = group.getChildByName("Label_pos");
             var img = new eui.Image();
             img.source = RES.getRes("yizunbei_png");
             img.scaleY = img.scaleX = 0.8;
             let posx = pos.x ;
             if (pos.x < 10) {
                posx = posx - 35;
            }
            img.x = posx;
            img.y = pos.y - 20;
            group.addChild(img);
            this.readyUIArray[chairid] = img;
        }

        private UpdatePlayersStatus(e: CardLogic.CardEvent)
        {
            var data = e.paramObj;
            if(data.status == constant.playerStatus.US_READY)
            {
               this.setReadyUI(data.chair_id);
            }
        }
       
       private removeallready()
       {
          for(let chairid in this.readyUIArray)
          {
              let group = this.GetGroupChairid(chairid);
              if(group.contains(this.readyUIArray[chairid]))
                group.removeChild(this.readyUIArray[chairid]);
          }
          this.readyUIArray = {};
       }

        private OutCard(data) {
            this.SetBtnsGame(false);
            this.curOutcardPlayerid = data.current_user;
            this.clearCurCard();
            this.PlayerOutCard(data.chair_id, data.cards, data.card_count);
            let playerChairid = CardLogic.ddzGameLogic.Instance.playerChairid;
            this.newCurrentCards = data.cards;
            if (this.curOutcardPlayerid == playerChairid) {
                CardLogic.ddzGameLogic.Instance.GenPressedCards(this.newCurrentCards);
                this.PlayermeOutCard();
            }

            if (this.curOutcardPlayerid != constant.INVALID)
                this.countdown(this.curOutcardPlayerid, data.time);

        }

        private GameEnd(data) {
            let rankDatatables = [];
            for (var i = 0; i < data.names.length; i++) {
                let rankData = new Card.PlayerRankData(data.names[i], data.golds[i], data.base_score, data.user_time[i]);
                rankDatatables.push(rankData);
            }
            let effect = "shibai";
            if(data.result)
            {
               effect = "sli";
            }
            let mc : egret.MovieClip;
             mc = this.PlayEffect(effect,()=>{
                 CardLogic.Timer.Instance.Delay(0.4, () => {
                  this.removeChild(mc);
                  let settle: Card.ui_GameSettle = new Card.ui_GameSettle(data.result, rankDatatables);
                   this.addChild(settle);
                   settle.SetContinueclick(() => {
                       this.removeChild(settle);
                       settle = null;
                       this.clearCurGame();
                       this.restart();
                   });
                  settle.SetExitClick(() => {
                       MessageManager.Instance.SendMessage({
                           protocol: constant.msg.CS_USER_STAND_UP
                       });
                       this.removeChild(settle);
                       settle = null;
                   });
              }); });

            mc.x = this.width /3;
            this.addChild(mc);

        }

        private PassCard(data) {
            if (data.chair_id != constant.INVALID) {
                var chairid = data.chair_id;
                let group = this.GetGroupChairid(chairid);

                let Scorepos = group.getChildByName("Label_pos");
                var img = new eui.Image();
                img.source = RES.getRes('buchu_png');
                if (Scorepos.x < 10)
                    img.x = Scorepos.x - 76;
                else
                    img.x = Scorepos.x;
                img.y = Scorepos.y;

                group.addChild(img);
                this.buchuItemArray[chairid] = img

                if (chairid == CardLogic.ddzGameLogic.Instance.playerChairid) {
                    this.CancelShootCard();
                }
            }
            
            this.SetBtnsGame(false);
            this.curOutcardPlayerid = data.current_user;
            this.clearCurCard();
            this.countdown(data.current_user, data.time);
            let playerChairid = CardLogic.ddzGameLogic.Instance.playerChairid;
            if (data.current_user == playerChairid) {
                CardLogic.ddzGameLogic.Instance.GenPressedCards(this.newCurrentCards);
                this.PlayermeOutCard(data.new_turn);
            }
        }

        private Trustee(data) {
           if(data.chair_id == CardLogic.ddzGameLogic.Instance.playerChairid)
           {
                this.bTrustee = (data.trustee == 1);
                if(this.bTrustee)
                {
                   this.group_tuoguan.visible = true;
                   if (this.curOutcardPlayerid == CardLogic.ddzGameLogic.Instance.playerChairid)
                   {
                       this.prompt();
                       this.SendOutcard();
                   }
                }
                else
                {
                     this.group_tuoguan.visible = false;
                }
           }
           if(data.trustee == 1)
           {
              let group = this.GetGroupChairid(data.chair_id);
              var tuoguanimg = new eui.Image();
              tuoguanimg.source = RES.getRes('tuoguan_other_png');
              tuoguanimg.y = 0;
              tuoguanimg.x = 250;
              group.addChild(tuoguanimg);
              this.tuoguanUIArray[data.chair_id] = tuoguanimg;
              
           }
           else
           {
               if( this.tuoguanUIArray[data.chair_id])
               {
                    let group = this.GetGroupChairid(data.chair_id);
                    group.removeChild(this.tuoguanUIArray[data.chair_id]);
               }
           }

           
            
        }


        //明牌的处理
        private AddBrightArray(chairid:number)
        {
            var group = this.GetGroupChairid(chairid);
            for (var i = 0; i < this.BrightCardsArray[chairid].length; i++)
            {
               group.removeChild(this.BrightCardsArray[chairid][i]);
            }
            this.BrightCardsArray[chairid] = [];
            
            let Scorepos = group.getChildByName("Label_pos");
            let startposX: number = 0;
            let posY = 40;
            
            startposX = Scorepos.x-30;
            
            let BrightCards =  CardLogic.ddzGameLogic.Instance.GetBrightCards(chairid);
            Card.Util.sortCards(BrightCards);
            if (startposX < 10) {
                startposX = startposX - 34 * BrightCards.length;
            }
            for(let i = 0;i<BrightCards.length;i++)
             {
                  var _card = new Card.ui_pokerCardItem();
                  _card.cardData = BrightCards[i];
                  _card.SetSize(0.56);
                 group.addChild(_card);
                 if (i<10)
                     _card.setPos(startposX +34 * i, posY -18);
                 else
                     _card.setPos(startposX +34 * (i-10), posY + 18);
                  this.BrightCardsArray[chairid].push(_card);
             }
        }

        //明牌协议
        private Bright(data)
        {
            let chairid = data.chair_id;
            if(chairid == CardLogic.ddzGameLogic.Instance.playerChairid) 
            {
                this.bBrightcard = true;
                //this.hardCardsArray[this.hardCardsArray.length -1].SetBright(true);
                if(this.brightEvent)
                   this.brightEvent();
                return ;
            }
            this.BrightCardsArray[chairid] = [];
            CardLogic.ddzGameLogic.Instance.AddBrightCards(chairid,data.cards);
            let BrightCards =  CardLogic.ddzGameLogic.Instance.GetBrightCards(chairid);
            Card.Util.sortCards(BrightCards);
            let Totalnum = BrightCards.length;
            var i: number = 0;
            var group = this.GetGroupChairid(chairid);
            let Scorepos = group.getChildByName("Label_pos");
            let startposX: number = 0;
            let posY = 40;
            
            startposX = Scorepos.x-30;
            if (startposX < 10) {
                startposX = startposX - 34 * Totalnum;
            }
            
            let addBrightcardTimer = CardLogic.Timer.Instance.Repeat(0.18, () => {
                if (i < Totalnum) {
                    var _card = new Card.ui_pokerCardItem();
                    _card.cardData = BrightCards[i];
                    _card.SetSize(0.56);
                    group.addChild(_card);
                    if (i<10)
                        _card.setPos(startposX +34 * i, posY -18);
                    else
                        _card.setPos(startposX +34 * (i-10), posY + 18);
                     this.BrightCardsArray[chairid].push(_card);
                    i++;
                }
                else {
                    CardLogic.Timer.Instance.Remove(addBrightcardTimer);
                }
            })


        }

        //提示
        private prompt(): void {
            var PressedCards = CardLogic.ddzGameLogic.Instance.GetPressedCards();
            if (PressedCards.length > 0) {
                for (let i = 0; i < this.hardCardsArray.length; i++) {
                    this.hardCardsArray[i].SetShoot(false);
                }

                if (this.promptIndex == PressedCards.length) {
                    this.promptIndex = 0;
                }
                for (let j = 0; j < PressedCards[this.promptIndex].length; j++) {
                    let pokercard = PressedCards[this.promptIndex][j];
                    var _index = CardLogic.ddzGameLogic.Instance.GetIndex(pokercard);
                    this.hardCardsArray[_index].SetShoot(true);
                }
                this.promptIndex++;
            }
        }

        //轮到自己出牌
        private PlayermeOutCard(bFirst: number = 0) {
            this.promptIndex = 0;
            this.SetBtnsGame(true);
            this.Text_bnt1.text = this.text(1103013);
            this.Text_bnt0.text = this.text(1103009);
            this.Text_bnt2.text = this.text("提示");
             
            this.btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.SendSnatchlandLord, this);
            this.btn0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.SendUnSnatchlandLord, this);

            this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Sendpasscard, this);
            this.btn0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.SendOutcard, this);
            this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.prompt, this);
            var playerChairid = CardLogic.ddzGameLogic.Instance.playerChairid;

            if (bFirst == 0) {
                var PressedCards = CardLogic.ddzGameLogic.Instance.GetPressedCards();
                if (PressedCards.length < 1) {
                    this.SetBtnsGame(false);
                    this.Text_bnt1.visible = true;
                    this.btn1.visible = true;
                    this.Text_bnt1.x = 320;
                    this.btn1.x = 305;
                    if(this.bTrustee)
                    {
                        this.Sendpasscard();
                    }
                }
            }
            else {
                this.SetBtnsGame(false);
                this.Text_bnt0.visible = true;
                this.btn0.visible = true;
                this.Text_bnt0.x = 320;
                this.btn0.x = 305;
            }

            if(this.bTrustee)
            {
                if(bFirst)
                {
                    this.hardCardsArray[this.hardCardsArray.length -1].SetShoot(true);
                }
                else
                {
                   this.prompt();
                }
                this.SendOutcard();
            }
        }

        private StartGame(data) {
            let score: number = data.land_score;
            this.txt_gamedouble.text = score.toString();
            CardLogic.ddzGameLogic.Instance.landUser = data.land_user;
            let playerChairid = CardLogic.ddzGameLogic.Instance.playerChairid;
            
            if (data.last_user != constant.INVALID) {
                let group = this.GetGroupChairid(data.last_user);

                let startpos = group.getChildByName("Label_pos");
                var img = new eui.Image();
                if (data.land_score == 1) {
                    img.source = RES.getRes('qiangdizhuzhi_png');
                }
                else if (data.land_score == 0) {
                    img.source = RES.getRes("buqiang_png");
                }
                let posx  = startpos.x ;
                if (startpos.x < 10) {
                    posx = startpos.x - 75;
                }
                img.x = posx;
                img.y = startpos.y;
                group.addChild(img);
                CardLogic.Timer.Instance.Delay(3.2, () => {
                    group.removeChild(img);
                });
            }

            if (data.land_user != constant.INVALID) {
                let group = this.GetGroupChairid(data.land_user);
                var maoimg = new eui.Image();
                maoimg.source = RES.getRes('dizhumao_png');
                maoimg.y = 0;
                maoimg.x = 12;
                group.addChild(maoimg);

                if(this.BrightCardsArray[data.land_user]&&this.BrightCardsArray[data.land_user].length > 0)
                {
                     for (var i = 0; i < data.back_card.length; i++)
                      {
                        CardLogic.ddzGameLogic.Instance.AddBrightCard(data.land_user,data.back_card[i]);
                     }
                    this.AddBrightArray(data.land_user);
               }
            }


            if (data.land_user == playerChairid) {
                this.AddBackCard(data.back_card);
                this.PlayermeOutCard(1);
            }

            var cards = CardLogic.ddzGameLogic.Instance.GetPokerCards(data.back_card);
            for (var i = 0; i < cards.length; i++) {
                var _backcard = new Card.ui_pokerCardItem();
                _backcard.cardData = cards[i];
                _backcard.SetSize(0.56);
                this.group_backcards.addChild(_backcard);
            }

            this.countdown(data.land_user, data.time);
        }

        private SetBtnsGame(bvisible: boolean) {
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
        private landScore(data) {
            if (data.land_user != constant.INVALID) {
                let group = this.GetGroupChairid(data.land_user);

                let Scorepos = group.getChildByName("Label_pos");
                var img = new eui.Image();
                if (data.land_score == 1) {
                    img.source = RES.getRes('qiangdizhuzhi_png');
                }
                else if (data.land_score == 0) {
                    img.source = RES.getRes("buqiang_png");
                }
                 if (Scorepos.x < 10)
                    img.x = Scorepos.x - 70;
                else
                    img.x = Scorepos.x - 30;
                img.y = Scorepos.y;
                group.addChild(img);
                CardLogic.Timer.Instance.Delay(3.2, () => {
                    group.removeChild(img);
                });

            }

            if (data.current_user != constant.INVALID) {
                this.countdown(data.current_user, data.time);
                if (data.current_user == CardLogic.ddzGameLogic.Instance.playerChairid) {
                    this.Text_bnt2.text = this.text(1103014);
                    this.SetBtnsGame(true);
                    this.Text_bnt1.text = this.text(1103016);
                    this.Text_bnt0.visible = false;

                    this.btn0.visible = false;
                    this.btn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.SendReady, this);
                    this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.SendSnatchlandLord, this);
                    this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.SendUnSnatchlandLord, this);
                }

                else {
                    this.SetBtnsGame(false);
                }
            }
        }


        private ReadyRet(data) {
            if (data.ret == 0) {
                this.Text_bnt2.visible = false;
                this.Text_bnt1.visible = false;
                this.btn1.visible = false;
                this.btn2.visible = false;
                this.btn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.SendReady, this);
            }
        }


        //创建闹钟
        private countdown(chairid: number, cd: number) {
            if (!this.clockCD)
                this.clockCD = new Card.ui_ClockCD();

            let group: eui.Group;
            var pos: number;
            if (CardLogic.ddzGameLogic.Instance.playerChairid == chairid) {
                group = this.group_Player0;
                pos = 0;
            }
            else {
                pos = CardLogic.ddzGameLogic.Instance.playerposInfo[chairid];
                group = <eui.Group>this.getChildAt(pos + 2);
            }
            if (this.cdTimer) {
                CardLogic.Timer.Instance.Remove(this.cdTimer);
                this.cdTimer = null;
            }
            if (group) {
                let clockpos = group.getChildByName("Label_pos");
                this.clockCD.x = clockpos.x - 35;
                this.clockCD.y = clockpos.y - 60;
                this.clockCD.visible = true;
                var sec = cd - NetworkManager.Instance.ServerTimestamp;
                if (sec > 0 ) {
                        this.clockCD.SetCd(sec);
                    }
                group.addChild(this.clockCD);
                this.curClockpos = pos;
                this.cdTimer = CardLogic.Timer.Instance.Repeat(1, () => {
                    var serversec = NetworkManager.Instance.ServerTimestamp;
                    var sec = cd - serversec;
                    if (sec > 0 && this.clockCD) {
                        this.clockCD.SetCd(sec);
                    }
                    else {
                        CardLogic.Timer.Instance.Remove(this.cdTimer);
                        this.cdTimer = null;
                        if (this.clockCD)
                            this.clockCD.visible = false;
                    }
                });
            }
        }

        //倒计时
        private DelayTimer(delay: number) {
            if (this.clockCD) {
                this.clockCD.SetCd(delay);
            }
        }



        private getrelativeChair(Chairid: number): number {
            var i = 0;
            var players = CardLogic.ddzGameLogic.Instance.ALLPlayers;
            var playerChairid = CardLogic.ddzGameLogic.Instance.playerChairid;
            var firstplayer = CardLogic.ddzGameLogic.Instance.GetPlayer(playerChairid);
            if (firstplayer == null) return -1;
            while (i < this.PlayersNum) {
                if (firstplayer.ChairId == Chairid)
                    return i;
                else {
                    firstplayer = firstplayer.PrePlayer;
                    i++;
                }
            }
            return -1;
        }

        private SetplayersInfo() {
            this.clearPlayers(true);
            this.group_otherPlayersHead.removeChildren();
            var players = CardLogic.ddzGameLogic.Instance.ALLPlayers;

            if (players.length > 0) {
                for (var i = 0; i < players.length; i++) {
                    if (players[i].UserId == PlayerManager.Instance.Data.UserId) {
                        CardLogic.ddzGameLogic.Instance.playerChairid = players[i].ChairId;
                    }

                }

                for (var i = 0; i < players.length; i++) {
                    if (players[i].UserId == PlayerManager.Instance.Data.UserId) {
                        this.setPlayer(0, players[i].UserName, players[i].Gold, "face_1_png");
                        CardLogic.ddzGameLogic.Instance.playerposInfo[players[i].ChairId] = 0;
                    }
                    else {
                        let relativechairid = this.getrelativeChair(players[i].ChairId);
                        if (relativechairid > -1) {
                            this.setPlayer(relativechairid, players[i].UserName, players[i].Gold, "face_2_png");
                            CardLogic.ddzGameLogic.Instance.playerposInfo[players[i].ChairId] = relativechairid;
                        }

                    }
                     if(players[i].Status == constant.playerStatus.US_READY)
                     {
                          this.setReadyUI(players[i].ChairId);
                    }
                }

            }
        }


         //特效
        private PlayGameEffect(array: any)
        {
            var packPokercards =  new Card.ddzPackCardGroup(CardLogic.ddzGameLogic.Instance.GetPokerCards(array));
            if(packPokercards.CardType == Card.CardTypes.BOMB_TYPE || packPokercards.CardType == Card.CardTypes.NUKE_TYPE)
            {
               let mc : egret.MovieClip;
               mc = this.PlayEffect('zhadan',()=>{
                   CardLogic.Timer.Instance.Delay(1, () => {
                    this.removeChild(mc);
                }); });

              this.addChild(mc);
            }
        }



      private clearCurCard()
      {
         var group = this.GetGroupChairid(this.curOutcardPlayerid);
         if(group)
         {
               if (this.cardItemArray && this.cardItemArray[this.curOutcardPlayerid] != null) {
                for (let carditem of this.cardItemArray[this.curOutcardPlayerid]) {
                    group.removeChild(carditem);
                }
            }
            this.cardItemArray[this.curOutcardPlayerid] = []

            if (this.buchuItemArray && this.buchuItemArray[this.curOutcardPlayerid]) {
                group.removeChild(this.buchuItemArray[this.curOutcardPlayerid]);
            }
            this.buchuItemArray[this.curOutcardPlayerid] = null
         }

         
      }

        public PlayerOutCard(chairid: number, array: any, remainCount: number) {
            var cards = CardLogic.ddzGameLogic.Instance.GetPokerCards(array);

            var group = this.GetGroupChairid(chairid);
            let Scorepos = group.getChildByName("Label_pos");
            let startposX: number = 0;
            let posY = Scorepos.y - 10;
            startposX = Scorepos.x;
            if (startposX < 10) {
                startposX = startposX - 10 - 34 * cards.length;
            }

            this.PlayGameEffect(array);

            if (chairid == CardLogic.ddzGameLogic.Instance.playerChairid)
            {
               startposX = startposX - 34 * cards.length/2;
            }
            else {
                let textNum: eui.Label = <eui.Label>group.getChildAt(6);   //显示剩余牌
                if(remainCount > 0)
                {
                   if (textNum) textNum.text = remainCount.toString();
                }
                else
                {
                    if (textNum) group.removeChild(textNum);
                    let backcard = group.getChildAt(5); 
                    if (backcard) group.removeChild(backcard);
                }
                
            }
            this.cardItemArray[chairid] = []
            for (var i = 0; i < cards.length; i++) {
                var _card = new Card.ui_pokerCardItem();
                _card.cardData = cards[i];
                if(i<10)
                {
                   _card.setPos(startposX + 34 * i, posY - 20);
                }
                else
                {
                  _card.setPos(startposX + 34 * (10-i), posY + 20);
                }
                _card.SetSize(0.56);
                group.addChild(_card);
                if ((i == cards.length - 1) && chairid == CardLogic.ddzGameLogic.Instance.landUser)
                    _card.Setlandlord(true);
                this.cardItemArray[chairid].push(_card);
            }

            
            //明牌处理
            if(this.BrightCardsArray[chairid]&&this.BrightCardsArray[chairid].length > 0)
             {
                  for (let _data of array) {
                     CardLogic.ddzGameLogic.Instance.RemoveBrightCards(chairid,_data);
                  }
                   this.AddBrightArray(chairid);
            }

            //更新手牌      
            if (chairid == CardLogic.ddzGameLogic.Instance.playerChairid) {
                for (let _data of array) {
                    CardLogic.ddzGameLogic.Instance.Removecard(_data);
                }
                if (this.hardCardsArray.length > 0) {
                    this.removehardCard();
                }
                this.group_handcards.removeChildren();
                let handcards = CardLogic.ddzGameLogic.Instance.HandCards;
                let startposx = this.group_handcards.width / 2 - handcards.length*45/2 - 58;
                for (var i = 0; i < handcards.length; i++) {
                    var _card = new Card.ui_pokerCardItem();
                    _card.cardData = handcards[i];
                    _card.setPos(startposx + 48 * i, 16);
                    if ((i == handcards.length - 1) && chairid == CardLogic.ddzGameLogic.Instance.landUser)
                        _card.Setbiglandlord(true);
                    if ((i == handcards.length - 1) && this.bBrightcard)
                        _card.SetBright(true);
                    this.group_handcards.addChild(_card);
                    this.AddTohardCardsArray(_card);
                }
            }

        }


        public setPlayer(playerNum: number, playername: string, coin: number, head: string) {
            var group;
            if (playerNum > 0) {
                group = <eui.Group>this.getChildAt(playerNum + 2);
            }
            else {
                group = this.group_Player0;
            }

            if (group) {
                var txtName = <eui.Label>group.getChildAt(1);
                txtName.text = playername;
                if (playerNum > 0) {
                    var txtcoin = <eui.Label>group.getChildAt(2);
                    txtcoin.text = coin.toString();
                }
                else {
                    this.txt_PlayerGold.text = coin.toString();
                }
                group.visible = true;
            }

            var img = new eui.Image();
            //img.mask = this.getChildAt(1);
            img.source = RES.getRes(head);
            if (playerNum < 2)
                img.x = 10;
            else
                img.x = this.group_otherPlayersHead.width - 300;
            if (playerNum > 0)
                this.group_otherPlayersHead.addChild(img);
            else
                group.addChildAt(img, 0);

        }

        public dealtoPlayer(playernum: number, seat: Card.Seat) {
            var group;
            var textNum;
            if (playernum > 0) {
                group = <eui.Group>this.getChildAt(playernum + 2);
                if (group.numChildren == 8) {
                    textNum = <eui.Label>group.getChildAt(6);
                    textNum.text = "1";
                }
                else {
                    var backCard = new eui.Image();

                    backCard.source = RES.getRes("card_back_png");
                    backCard.scaleX = backCard.scaleY = 0.35;
                    group.addChildAt(backCard, 5);
                    textNum = new eui.Label;
                    textNum.fontFamily = "SimHei";
                    textNum.strokeColor = 0x587ABC;   //描边颜色
                    textNum.stroke = 2;               //描边宽度
                    textNum.text = "1";
                    textNum.size = 42;
                    textNum.textAlign = egret.HorizontalAlign.CENTER;

                    if (seat == Card.Seat.Left) {
                        backCard.x = 240;
                        backCard.y = 240;
                        textNum.x = 250;
                        textNum.y = 260;
                    }
                    else {
                        backCard.x = 25;
                        backCard.y = 240;
                        textNum.x = 36;
                        textNum.y = 260;
                    }

                    group.addChildAt(textNum, 6);
                }

                var i: number = 1;
                if (textNum) {
                    let dealcardTimer = CardLogic.Timer.Instance.Repeat(0.18, () => {
                        if (i < this.cardTotalnum) {
                            textNum.text = i.toString();
                            i++;
                        }
                        else {
                            CardLogic.Timer.Instance.Remove(dealcardTimer);
                        }

                    });
                }

            }

        }
        
        //明牌处理
        private OpenDeal() {
            this.Text_bnt2.visible = false;
            this.btn2.visible = false;
            var img = new eui.Image();
            var idouble: number = 6;
           
            img.source = RES.getRes("btn2_png");
            img.width = 185 * 0.75;
            img.height = 85 * 0.75;
            img.x = this.group_btn.width / 2 + 20;
            img.y = 14;
            this.group_btn.addChild(img);
            img.touchEnabled = true;
            img.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                MessageManager.Instance.SendSubMessage({
                    sub_protocol: constant.sub_msg.SUB_C_BRIGHT,
                    chair_id: CardLogic.ddzGameLogic.Instance.playerChairid,
                    type:((8-idouble)/2)
                })
            },this);
            var textNum = new eui.Label;
            textNum.fontFamily = "SimHei";
            textNum.textColor = 0x0000AA;   //描边颜色
            textNum.text = "明牌×6";
            textNum.size = 30;
            textNum.x = this.group_btn.width / 2 + 36;
            textNum.y = img.y + 13.5;
            textNum.textAlign = egret.HorizontalAlign.CENTER;
            textNum.touchEnabled = false;
            this.group_btn.addChild(textNum);
            var OpenDealTimer = CardLogic.Timer.Instance.Repeat(1.4, () => {
                if (idouble > 2) {
                    idouble -= 2;
                    textNum.text = "明牌×" + idouble.toString();
                }
                else {
                    CardLogic.Timer.Instance.Remove(OpenDealTimer);
                    OpenDealTimer = null;
                    if(this.brightEvent)
                    {
                        this.group_btn.removeChild(textNum);
                        this.group_btn.removeChild(img);
                    }
                    
                }

            });

            this.brightEvent = () => {
                 if(OpenDealTimer)
                 {
                      CardLogic.Timer.Instance.Remove(OpenDealTimer);
                      OpenDealTimer = null;
                 }
                 this.group_btn.removeChild(textNum);
                 this.group_btn.removeChild(img);
                 this.brightEvent = null;
            };
        }

        protected childrenCreated() {
            super.childrenCreated();
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        }


        private AddTohardCardsArray(item: Card.ui_pokerCardItem) {
            this.hardCardsArray.push(item);
            item.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
            item.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        }

        private InTargetCards(item: any): number {
            for (let i = this.hardCardsArray.length - 1; i >= 0; i--) {
                if (item == this.hardCardsArray[i]) {
                    return i;
                }
            }

            return -1;
        }

        private touchBegin(evt: egret.TouchEvent): void {
            this.TargetCardsArray = [];
            let index = this.InTargetCards(evt.currentTarget);
            this.cardBegin = index;
        }

        private touchMove(evt: egret.TouchEvent): void {

            let index = this.InTargetCards(evt.currentTarget);
            this.cardEnd = index;

            this.moving();
        }

        private touchEnd(evt: egret.TouchEvent): void {
            this.CheckEnd();

        }

        private CheckEnd(): void {
            if (this.cardBegin < 0 || this.cardEnd < 0) return;
            if (this.cardBegin == this.cardEnd) return;

            if (this.cardBegin < this.cardEnd)
                this.TargetCardsArray = this.hardCardsArray.slice(this.cardBegin, this.cardEnd + 1);
            else
                this.TargetCardsArray = this.hardCardsArray.slice(this.cardEnd, this.cardBegin + 1);

            for (let i = 0; i < this.TargetCardsArray.length; i++) {
                this.TargetCardsArray[i].alpha = 1;
                this.TargetCardsArray[i].SetShoot(!this.TargetCardsArray[i].Selected);
            }

            this.TargetCardsArray = [];
            this.cardEnd = this.cardBegin = -1;
        }

        private moving(): void {

            if (this.cardBegin < 0 || this.cardEnd < 0) return;
            if (this.cardBegin < this.cardEnd)
                this.TargetCardsArray = this.hardCardsArray.slice(this.cardBegin, this.cardEnd + 1);
            else
                this.TargetCardsArray = this.hardCardsArray.slice(this.cardEnd, this.cardBegin + 1);


            for (let i = 0; i < this.hardCardsArray.length; i++) {
                this.hardCardsArray[i].alpha = 1;
            }
            for (let i = 0; i < this.TargetCardsArray.length; i++) {
                this.TargetCardsArray[i].alpha = 0.8;
            }
        }


        private GetShootCard(): Array<PokerCard> {
            var cards: Array<PokerCard> = [];
            for (let i = 0; i < this.hardCardsArray.length; i++) {
                if (this.hardCardsArray[i].Selected)
                    cards.push(this.hardCardsArray[i].cardData);
            }
            return cards;
        }

        private CancelShootCard() {
            for (let i = 0; i < this.hardCardsArray.length; i++) {
                if (this.hardCardsArray[i].Selected)
                    this.hardCardsArray[i].SetShoot(false);
            }
        }


        ///添加手牌
        public AddhardCard(e: CardLogic.CardEvent) {
            if (this.hardCardsArray.length > 0) {
                this.removehardCard();
            }
            this.removeallready();
            this.OpenDeal();
            var cards: Array<PokerCard> = e.paramObj;

            Card.Util.sortCards(cards);
            this.cardTotalnum = cards.length;
            var i: number = 0;
            let startposx = this.group_handcards.width / 2 - cards.length*45/2 - 58;
            let addcardTimer = CardLogic.Timer.Instance.Repeat(0.18, () => {
                if (i < this.cardTotalnum) {
                    var _card = new Card.ui_pokerCardItem();
                    _card.cardData = cards[i];
                    _card.setPos(startposx + 48 * i, 16);
                    this.group_handcards.addChild(_card);
                     
                    this.AddTohardCardsArray(_card);
                    i++;
                }
                else {
                    CardLogic.Timer.Instance.Remove(addcardTimer);
                    this.childrenCreated();
                    if(this.bBrightcard)
                    {
                        this.hardCardsArray[this.hardCardsArray.length -1].SetBright(true);
                    }
                }
            })

            this.group_handcards.cacheAsBitmap = true;
            this.AddotherCard();
        }


        public AddotherCard() {
            this.dealtoPlayer(1, Card.Seat.Left);
            this.dealtoPlayer(2, Card.Seat.Right);
        }

        public removehardCard() {
            for (var i = 0; i < this.hardCardsArray.length; i++) {
                this.group_handcards.removeChild(this.hardCardsArray[i]);
            }
            this.hardCardsArray = [];
        }



        private clearPlayers(bchangePlayer: boolean = false) {

            var playerNum: number = 0;
            for (let i = 1; i < this.PlayersNum; i++) {
                var group = <eui.Group>this.getChildAt(i + 2);
                playerNum = 5;

                if(bchangePlayer)
                    group.visible = false;
                 while (group.numChildren > playerNum) {
                    group.removeChildAt(group.numChildren - 1);
                 
                }
            }
            
            playerNum = 4;
            if (bchangePlayer) {
                if (this.group_Player0.numChildren > 3)
                    this.group_Player0.removeChildAt(0);
                playerNum = 3;
            }

            while (this.group_Player0.numChildren > playerNum) {
                this.group_Player0.removeChildAt(this.group_Player0.numChildren - 1);
            }

        }

        private restart() {
            this.SetBtnsGame(true);
            this.Text_bnt1.text = this.text(1103001);
            this.Text_bnt2.text = this.text(1103002);
            this.Text_bnt0.visible = false;

            this.btn0.visible = false;
            this.btn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.prompt, this);
            this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.SendReady, this);
        }

        // 清理当前牌局
        private clearCurGame() {
            if (this.hardCardsArray.length > 0) {
                this.removehardCard();
            }
            this.group_backcards.removeChildren();
            this.clearPlayers();
            this.group_tuoguan.visible = false;
            this.btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.Sendpasscard, this);
            this.btn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.SendOutcard, this);
            this.cardItemArray = {};
            this.buchuItemArray = {};
            this.BrightCardsArray = {}
            if (this.clockCD) {
                this.clockCD = null;
            }
            this.txt_gamedouble.text = "1";
            this.tuoguanUIArray = {};
            this.bTrustee = false;
            this.bBrightcard = false;
        }

    }

}
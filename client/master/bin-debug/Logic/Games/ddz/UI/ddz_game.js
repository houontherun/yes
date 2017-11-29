var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 游戏场景
 * @author  yanwei47@163.com
 *
 */
var gameUI;
(function (gameUI) {
    var ddz_game = (function (_super) {
        __extends(ddz_game, _super);
        function ddz_game() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.hardCardsArray = [];
            _this.otherPlayerNum = 2;
            _this.TargetCardsArray = [];
            _this.cardBegin = -1;
            _this.cardEnd = -1;
            return _this;
        }
        ddz_game.prototype.onload = function () {
            var _this = this;
            _super.prototype.onload.call(this);
            CardLogic.CardEventDispatcher.Instance.addEventListener(CardLogic.CardEvent.AddOtherPlayers, this.addOtherPlayers, this);
            CardLogic.CardEventDispatcher.Instance.addEventListener(CardLogic.CardEvent.AddHard, this.AddhardCard, this);
            this.AddClick(this.btn_tuoguan, function () {
            }, this);
            this.AddClick(this.prepareBtn, function () {
                CardLogic.ddzGameLogic.Shared().Shuffle();
                CardLogic.ddzGameLogic.Shared().DispatchCardStart();
            }, this);
            this.AddClick(this.ChangeBtn, function () {
                _this.clearCurGame();
                CardLogic.CardEventDispatcher.Instance.dispatchEvent(new CardLogic.CardEvent(CardLogic.CardEvent.AddOtherPlayers));
            }, this);
            this.Changeimg.$touchEnabled = false;
            this.prepareimg.$touchEnabled = false;
        };
        ddz_game.prototype.addOtherPlayers = function (e) {
            this.setPlayer(0, "小我问", 85000, "face_1_png");
            this.setPlayer(1, "蛇头02", 1000, "face_2_png");
            this.setPlayer(2, "重设子对象深度", 120000, "face_3_png");
        };
        ddz_game.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            for (var i = 0; i < this.hardCardsArray.length; i++) {
                this.hardCardsArray[i].addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
                this.hardCardsArray[i].addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
                this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
            }
        };
        ddz_game.prototype.InTargetCards = function (item) {
            for (var i = this.hardCardsArray.length - 1; i >= 0; i--) {
                if (item == this.hardCardsArray[i]) {
                    return i;
                }
            }
            return -1;
        };
        ddz_game.prototype.touchBegin = function (evt) {
            this.TargetCardsArray = [];
            var index = this.InTargetCards(evt.currentTarget);
            this.cardBegin = index;
        };
        ddz_game.prototype.touchMove = function (evt) {
            var index = this.InTargetCards(evt.currentTarget);
            this.cardEnd = index;
            this.moving();
        };
        ddz_game.prototype.touchEnd = function (evt) {
            this.CheckEnd();
        };
        ddz_game.prototype.CheckEnd = function () {
            if (this.cardBegin < 0 || this.cardEnd < 0)
                return;
            if (this.cardBegin == this.cardEnd)
                return;
            if (this.cardBegin < this.cardEnd)
                this.TargetCardsArray = this.hardCardsArray.slice(this.cardBegin, this.cardEnd + 1);
            else
                this.TargetCardsArray = this.hardCardsArray.slice(this.cardEnd, this.cardBegin + 1);
            for (var i = 0; i < this.TargetCardsArray.length; i++) {
                this.TargetCardsArray[i].alpha = 1;
                this.TargetCardsArray[i].SetShoot(!this.TargetCardsArray[i].Selected);
            }
            this.TargetCardsArray = [];
            this.cardEnd = this.cardBegin = -1;
        };
        ddz_game.prototype.moving = function () {
            if (this.cardBegin < 0 || this.cardEnd < 0)
                return;
            if (this.cardBegin < this.cardEnd)
                this.TargetCardsArray = this.hardCardsArray.slice(this.cardBegin, this.cardEnd + 1);
            else
                this.TargetCardsArray = this.hardCardsArray.slice(this.cardEnd, this.cardBegin + 1);
            for (var i = 0; i < this.hardCardsArray.length; i++) {
                this.hardCardsArray[i].alpha = 1;
            }
            for (var i = 0; i < this.TargetCardsArray.length; i++) {
                this.TargetCardsArray[i].alpha = 0.8;
            }
        };
        ddz_game.prototype.GetShootCard = function () {
            var cards = [];
            for (var i = 0; i < this.hardCardsArray.length; i++) {
                if (this.hardCardsArray[i].Selected)
                    cards.push(this.hardCardsArray[i].cardData);
            }
            return cards;
        };
        ///添加手牌
        ddz_game.prototype.AddhardCard = function (e) {
            var _this = this;
            var cards = e.paramObj;
            Card.Util.sortCards(cards);
            this.cardTotalnum = cards.length;
            var i = 0;
            var addcardTimer = CardLogic.Timer.Instance.Repeat(0.18, function () {
                if (i < _this.cardTotalnum) {
                    var _card = new Card.ui_pokerCardItem();
                    _card.cardData = cards[i];
                    _card.setPos(45 * i, 22);
                    _this.group_handcards.addChild(_card);
                    _this.hardCardsArray.push(_card);
                    i++;
                }
                else {
                    CardLogic.Timer.Instance.Remove(addcardTimer);
                    _this.childrenCreated();
                }
            });
            this.group_handcards.cacheAsBitmap = true;
            this.AddotherCard();
        };
        ddz_game.prototype.AddotherCard = function () {
            this.dealtoPlayer(1, Card.Seat.Left);
            this.dealtoPlayer(2, Card.Seat.Right);
        };
        ddz_game.prototype.removehardCard = function () {
            for (var i = 0; i < this.hardCardsArray.length; i++) {
                this.group_handcards.removeChild(this.hardCardsArray[i]);
            }
            this.hardCardsArray = [];
        };
        ddz_game.prototype.setPlayer = function (playerNum, playername, coin, head) {
            var group;
            if (playerNum > 0) {
                group = this.getChildAt(playerNum + 1);
            }
            else {
                group = this.group_Player0;
            }
            if (group) {
                var txtName = group.getChildAt(1);
                txtName.text = playername;
                if (playerNum > 0) {
                    var txtcoin = group.getChildAt(2);
                    txtcoin.text = coin.toString();
                }
                else {
                    this.txt_PlayerGold.text = coin.toString();
                }
                var img = new eui.Image();
                //img.mask = this.getChildAt(1);
                img.source = RES.getRes(head);
                img.x = 10;
                group.addChildAt(img, 0);
                group.visible = true;
            }
        };
        ddz_game.prototype.dealtoPlayer = function (playernum, seat) {
            var _this = this;
            var group;
            var textNum;
            if (playernum > 0) {
                group = this.getChildAt(playernum + 1);
                if (group.numChildren == 7) {
                    textNum = group.getChildAt(6);
                    textNum.text = "1";
                }
                else {
                    var backCard = new eui.Image();
                    backCard.scaleX = backCard.scaleY = 0.56;
                    backCard.source = RES.getRes("card_back_png");
                    group.addChildAt(backCard, 5);
                    textNum = new eui.Label;
                    textNum.fontFamily = "SimHei";
                    textNum.strokeColor = 0x0000ff; //描边颜色
                    textNum.stroke = 2; //描边宽度
                    textNum.text = "1";
                    textNum.textAlign = egret.HorizontalAlign.CENTER;
                    if (seat == Card.Seat.Left) {
                        backCard.x = 250;
                        backCard.y = 200;
                        textNum.x = 278;
                        textNum.y = 240;
                    }
                    else {
                        backCard.x = 0;
                        backCard.y = 200;
                        textNum.x = 30;
                        textNum.y = 240;
                    }
                    group.addChildAt(textNum, 6);
                }
                var i = 1;
                if (textNum) {
                    var dealcardTimer_1 = CardLogic.Timer.Instance.Repeat(0.18, function () {
                        if (i < _this.cardTotalnum) {
                            textNum.text = i.toString();
                            i++;
                        }
                        else {
                            CardLogic.Timer.Instance.Remove(dealcardTimer_1);
                        }
                    });
                }
            }
        };
        // 清理当前牌局
        ddz_game.prototype.clearCurGame = function () {
            if (this.hardCardsArray.length > 0) {
                this.removehardCard();
            }
            for (var i = 1; i <= this.otherPlayerNum; i++) {
                var group = this.getChildAt(i + 1);
                if (group) {
                    group.visible = false;
                }
                if (group.numChildren > 4)
                    group.removeChildAt(0);
            }
        };
        return ddz_game;
    }(gameUI.base));
    gameUI.ddz_game = ddz_game;
    __reflect(ddz_game.prototype, "gameUI.ddz_game");
})(gameUI || (gameUI = {}));
//# sourceMappingURL=ddz_game.js.map
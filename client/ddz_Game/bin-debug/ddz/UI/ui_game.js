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
var Card;
(function (Card) {
    var ui_game = (function (_super) {
        __extends(ui_game, _super);
        function ui_game() {
            var _this = _super.call(this, "resource/eui_skins/ddz_ui/ui_game.exml") || this;
            _this.hardCardsArray = [];
            _this.cardsArray = [];
            _this.otherPlayerNum = 2;
            CardLogic.CardEventDispatcher.Instance.addEventListener(CardLogic.CardEvent.AddHard, _this.AddhardCard, _this);
            _this.AddClick(_this.btn_tuoguan, function () {
            }, _this);
            _this.AddClick(_this.prepareBtn, function () {
                CardLogic.ddzGameLogic.Shared().Shuffle();
                CardLogic.ddzGameLogic.Shared().DispatchCardStart();
            }, _this);
            _this.AddClick(_this.ChangeBtn, function () {
                _this.clearCurGame();
            }, _this);
            _this.AddClick(_this.Changeimg, function () {
                _this.clearCurGame();
            }, _this);
            return _this;
        }
        ui_game.prototype.onload = function () {
            this.setPlayer(0, "小我问", 85000, "face_1_png");
        };
        ///添加手牌
        ui_game.prototype.AddhardCard = function (e) {
            var _this = this;
            var cards = e.paramObj;
            Card.Util.sortCards(cards);
            var i = 0;
            var addcardTimer = CardLogic.Timer.Instance.Repeat(0.16, function () {
                if (i < cards.length) {
                    var _card = new Card.ui_pokerCardItem();
                    _card.cardData = cards[i];
                    _card.setPos(36 * i, 22);
                    _this.group_handcards.addChild(_card);
                    _this.cardsArray.push(_card);
                    i++;
                }
                else {
                    CardLogic.Timer.Instance.Remove(addcardTimer);
                }
            });
            this.group_handcards.cacheAsBitmap = true;
            this.setPlayer(1, "nihao", 1000, "face_2_png");
            this.setPlayer(2, "重设子对象深度", 120000, "face_3_png");
        };
        ui_game.prototype.AppendCard = function () {
        };
        ui_game.prototype.AddotherCard = function () {
        };
        ui_game.prototype.removehardCard = function () {
            for (var i = 0; i < this.cardsArray.length; i++) {
                this.group_handcards.removeChild(this.cardsArray[i]);
            }
            this.cardsArray = [];
        };
        ui_game.prototype.setPlayer = function (playerNum, playername, coin, head) {
            var group;
            if (playerNum > 0) {
                group = this.getChildAt(playerNum);
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
                var img = new eui.Image();
                img.source = RES.getRes(head);
                img.x = 30;
                group.addChildAt(img, 0);
                group.visible = true;
            }
        };
        // 清理当前牌局
        ui_game.prototype.clearCurGame = function () {
            if (this.cardsArray.length > 0) {
                this.removehardCard();
            }
            for (var i = 1; i <= this.otherPlayerNum; i++) {
                var group = this.getChildAt(i);
                if (group) {
                    group.removeChildAt(0);
                    group.visible = false;
                }
            }
        };
        return ui_game;
    }(gameUI.base));
    Card.ui_game = ui_game;
    __reflect(ui_game.prototype, "Card.ui_game");
})(Card || (Card = {}));
//# sourceMappingURL=ui_game.js.map
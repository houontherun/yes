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
            CardLogic.CardEventDispatcher.Instance.addEventListener(CardLogic.CardEvent.AddHard, _this.AddhardCard, _this);
            _this.AddClick(_this.btn_tuoguan, function () {
            }, _this);
            _this.AddClick(_this.prepareBtn, function () {
                CardLogic.ddzGameLogic.Shared().Shuffle();
                CardLogic.ddzGameLogic.Shared().DispatchCardStart();
            }, _this);
            return _this;
        }
        ///添加手牌
        ui_game.prototype.AddhardCard = function (e) {
            var _this = this;
            var cards = e.paramObj;
            if (this.cardsArray.length > 0) {
                this.removehardCard();
            }
            Card.Util.sortCards(cards);
            var i = 0;
            var addcardTimer = CardLogic.Timer.Instance.Repeat(0.16, function () {
                if (i < cards.length) {
                    var _card = new Card.ui_pokerCardItem();
                    _card.cardData = cards[i];
                    _card.x = 36 * i;
                    _card.y = -10;
                    //_card.setPos(36*i,-10);
                    _this.group_handcards.addChild(_card);
                    _this.cardsArray.push(_card);
                    i++;
                }
                else {
                    CardLogic.Timer.Instance.Remove(addcardTimer);
                }
            });
            this.group_handcards.cacheAsBitmap = true;
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
        return ui_game;
    }(gameUI.base));
    Card.ui_game = ui_game;
    __reflect(ui_game.prototype, "Card.ui_game");
})(Card || (Card = {}));
//# sourceMappingURL=ui_game.js.map
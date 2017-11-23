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
var ui_game = (function (_super) {
    __extends(ui_game, _super);
    function ui_game() {
        var _this = _super.call(this, "resource/eui_skins/ui_game.exml") || this;
        _this.hardCardsArray = [];
        _this.cardsArray = [];
        _this.AddClick(_this.btn_tuoguan, function () {
        }, _this);
        _this.AddClick(_this.prepareBtn, function () {
            DDZGameController.Shared().Shuffle();
            DDZGameController.Shared().DispatchCardStart();
        }, _this);
        return _this;
    }
    ui_game.Shared = function () {
        if (ui_game.shared == null) {
            ui_game.shared = new ui_game();
        }
        return ui_game.shared;
    };
    ///添加手牌
    ui_game.prototype.AddhardCard = function (cards) {
        if (this.cardsArray.length > 0) {
            this.removehardCard();
        }
        Card.Util.sortCards(cards);
        for (var i = 0; i < cards.length; i++) {
            var _card = new ui_pokerCardItem();
            _card.cardData = cards[i];
            this.group_handcards.addChild(_card);
            this.cardsArray.push(_card);
        }
        this.group_handcards.cacheAsBitmap = true;
    };
    ui_game.prototype.removehardCard = function () {
        for (var i = 0; i < this.cardsArray.length; i++) {
            this.group_handcards.removeChild(this.cardsArray[i]);
        }
        this.cardsArray = [];
    };
    return ui_game;
}(gameUI.base));
__reflect(ui_game.prototype, "ui_game");
//# sourceMappingURL=ui_game.js.map
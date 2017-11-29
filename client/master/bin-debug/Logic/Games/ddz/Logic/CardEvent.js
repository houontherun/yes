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
var CardLogic;
(function (CardLogic) {
    /**
     * 自定义事件
     * @author
     *
     */
    var CardEvent = (function (_super) {
        __extends(CardEvent, _super);
        function CardEvent(type, bubbles, cancelable) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            return _super.call(this, type, bubbles, cancelable) || this;
        }
        CardEvent.DispatchCardStart = "dispatchcardstart";
        CardEvent.AddOtherPlayers = "addotherPlayers";
        CardEvent.AddHard = "addhard";
        CardEvent.UpdatePlayers = "updatePlayers";
        return CardEvent;
    }(egret.Event));
    CardLogic.CardEvent = CardEvent;
    __reflect(CardEvent.prototype, "CardLogic.CardEvent");
})(CardLogic || (CardLogic = {}));
//# sourceMappingURL=CardEvent.js.map
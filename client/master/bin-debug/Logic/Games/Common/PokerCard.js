/*
* 扑克牌 类
* Created by panyinglong(503940285@qq.com).
* DateTime: 2017/10/27 18:02
*/
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
/*
* 花色
*/
var CardColor;
(function (CardColor) {
    CardColor[CardColor["Spade"] = 1] = "Spade";
    CardColor[CardColor["Heart"] = 2] = "Heart";
    CardColor[CardColor["Club"] = 3] = "Club";
    CardColor[CardColor["Diamond"] = 4] = "Diamond";
    CardColor[CardColor["SK"] = 5] = "SK";
    CardColor[CardColor["BK"] = 6] = "BK";
})(CardColor || (CardColor = {}));
/*
* 类
*/
var PokerCard = (function (_super) {
    __extends(PokerCard, _super);
    function PokerCard(color, index, name) {
        var _this = _super.call(this) || this;
        _this.color = color;
        _this.index = index;
        _this.name = name;
        return _this;
    }
    Object.defineProperty(PokerCard.prototype, "Suit", {
        get: function () {
            return this.color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PokerCard.prototype, "Index", {
        get: function () {
            return this.index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PokerCard.prototype, "Name", {
        get: function () {
            if (this.name != null) {
                return this.name;
            }
            return "";
        },
        enumerable: true,
        configurable: true
    });
    return PokerCard;
}(GameObject));
__reflect(PokerCard.prototype, "PokerCard");
//# sourceMappingURL=PokerCard.js.map
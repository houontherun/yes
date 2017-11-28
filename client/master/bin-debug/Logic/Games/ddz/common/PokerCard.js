var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
* 花色
*/
var CardColor;
(function (CardColor) {
    CardColor[CardColor["Diamond"] = 0] = "Diamond";
    CardColor[CardColor["Heart"] = 1] = "Heart";
    CardColor[CardColor["Club"] = 2] = "Club";
    CardColor[CardColor["Spade"] = 3] = "Spade";
    CardColor[CardColor["SK"] = 4] = "SK";
})(CardColor || (CardColor = {}));
/*
* 类
*/
var PokerCard = (function () {
    function PokerCard(index, color, carddata) {
        this.color = CardColor.Diamond;
        this.index = 0;
        this.name = "";
        this.weight = 0;
        this.index = index;
        this.color = color;
        if (carddata) {
            this.name = carddata.name;
            this.weight = carddata.weight;
        }
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
    Object.defineProperty(PokerCard.prototype, "Weight", {
        get: function () {
            return this.weight;
        },
        enumerable: true,
        configurable: true
    });
    return PokerCard;
}());
__reflect(PokerCard.prototype, "PokerCard");
//# sourceMappingURL=PokerCard.js.map
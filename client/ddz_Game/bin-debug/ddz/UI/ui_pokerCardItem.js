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
var Card;
(function (Card) {
    var ui_pokerCardItem = (function (_super) {
        __extends(ui_pokerCardItem, _super);
        function ui_pokerCardItem() {
            var _this = _super.call(this, "resource/eui_skins/ddz_ui/ui_pokerCard.exml") || this;
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_tap, _this);
            return _this;
        }
        Object.defineProperty(ui_pokerCardItem.prototype, "cardData", {
            get: function () {
                return this.card;
            },
            set: function (value) {
                this.card = value;
                var index = value.Index;
                var colr = value.Suit;
                var _source = "";
                if ((index > 0 && index < 16) && (colr >= 0 && colr <= 4)) {
                    _source = "card_" + colr + "_" + index + "_png";
                }
                else {
                    _source = "card_back";
                }
                this.SetImageUrl(this.img_card, _source);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ui_pokerCardItem.prototype, "Selected", {
            get: function () {
                return this.bSelect;
            },
            enumerable: true,
            configurable: true
        });
        ui_pokerCardItem.prototype.setPos = function (posx, posy) {
            this.x = posx;
            this.y = posy;
            this.posY = posy;
        };
        ui_pokerCardItem.prototype.onclick_tap = function () {
            this.bSelect = !this.bSelect;
            if (this.bSelect) {
                this.y -= 20;
            }
            else {
                this.y = this.posY;
            }
        };
        ui_pokerCardItem.prototype.SetShoot = function (bselect) {
            this.bSelect = bselect;
            if (this.bSelect) {
                this.y -= 20;
            }
            else {
                this.y = this.posY;
            }
        };
        return ui_pokerCardItem;
    }(gameUI.base));
    Card.ui_pokerCardItem = ui_pokerCardItem;
    __reflect(ui_pokerCardItem.prototype, "Card.ui_pokerCardItem", ["eui.UIComponent", "egret.DisplayObject"]);
})(Card || (Card = {}));
//# sourceMappingURL=ui_pokerCardItem.js.map
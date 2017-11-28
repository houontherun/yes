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
     * 事件派发器
     * @author  yanwei47@163.com
     *
     */
    var CardEventDispatcher = (function (_super) {
        __extends(CardEventDispatcher, _super);
        function CardEventDispatcher() {
            return _super.call(this) || this;
        }
        Object.defineProperty(CardEventDispatcher, "Instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new CardEventDispatcher();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        return CardEventDispatcher;
    }(egret.EventDispatcher));
    CardLogic.CardEventDispatcher = CardEventDispatcher;
    __reflect(CardEventDispatcher.prototype, "CardLogic.CardEventDispatcher");
})(CardLogic || (CardLogic = {}));
//# sourceMappingURL=CardEventDispatcher.js.map
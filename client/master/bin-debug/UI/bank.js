// TypeScript file
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
var gameUI;
(function (gameUI) {
    var bank = (function (_super) {
        __extends(bank, _super);
        function bank() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        bank.prototype.onload = function () {
            var _this = this;
            _super.prototype.onload.call(this);
            this.AddClick(this.btnClose, function () {
                _this.Close();
            }, this);
        };
        return bank;
    }(gameUI.base));
    gameUI.bank = bank;
    __reflect(bank.prototype, "gameUI.bank");
})(gameUI || (gameUI = {}));
//# sourceMappingURL=bank.js.map
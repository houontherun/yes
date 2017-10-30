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
    var game_item = (function (_super) {
        __extends(game_item, _super);
        function game_item() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/custom_skins/ui_game_item.exml";
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.onload, _this);
            return _this;
        }
        game_item.prototype.onload = function () {
            this.updateUI();
        };
        game_item.prototype.onClick = function () {
            if (this.data != null && this.data != undefined) {
                UIManager.Instance.LoadUI(UI.create_room, this.data);
            }
        };
        Object.defineProperty(game_item.prototype, "isLoaded", {
            get: function () {
                return this.lblName != null && this.imgIcon != null;
            },
            enumerable: true,
            configurable: true
        });
        game_item.prototype.updateUI = function () {
            if (!this.isLoaded) {
                return;
            }
            this.imgIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.imgIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.lblName.text = this.data.name;
            this.imgIcon.source = this.data.icon;
        };
        game_item.prototype.dataChanged = function () {
            this.updateUI();
        };
        return game_item;
    }(eui.ItemRenderer));
    gameUI.game_item = game_item;
    __reflect(game_item.prototype, "gameUI.game_item");
})(gameUI || (gameUI = {}));
//# sourceMappingURL=game_item.js.map
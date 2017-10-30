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
    var enter_room = (function (_super) {
        __extends(enter_room, _super);
        function enter_room() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        enter_room.prototype.onload = function () {
            var _this = this;
            this.btnEnterRoom.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            }, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.Close();
            }, this);
        };
        return enter_room;
    }(gameUI.base));
    gameUI.enter_room = enter_room;
    __reflect(enter_room.prototype, "gameUI.enter_room");
})(gameUI || (gameUI = {}));
//# sourceMappingURL=enter_room.js.map
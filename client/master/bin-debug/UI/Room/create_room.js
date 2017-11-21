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
    var create_room = (function (_super) {
        __extends(create_room, _super);
        function create_room() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        create_room.prototype.onload = function () {
            var _this = this;
            _super.prototype.onload.call(this);
            this.lblGame.text = this.Data.name;
            this.btnCreateRoom.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                console.log("请求创建房间");
            }, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.Close();
            }, this);
        };
        return create_room;
    }(gameUI.base));
    gameUI.create_room = create_room;
    __reflect(create_room.prototype, "gameUI.create_room");
})(gameUI || (gameUI = {}));
//# sourceMappingURL=create_room.js.map
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
// TypeScript file
var gameUI;
(function (gameUI) {
    var ddzSelectRoomItemRander = (function (_super) {
        __extends(ddzSelectRoomItemRander, _super);
        function ddzSelectRoomItemRander() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/custom_skins/games/ddzSelectRoomItemSkin.exml";
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.onload, _this);
            return _this;
        }
        ddzSelectRoomItemRander.prototype.onload = function () {
            this.updateUI();
        };
        ddzSelectRoomItemRander.prototype.updateUI = function () {
            this.imgBg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.imgBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        ddzSelectRoomItemRander.prototype.onClick = function () {
            // 请求进入房间
            // console.log('enter room ' + this.data.RoomId)
            RoomManager.Instance.EnterRoom(this.data.RoomId);
        };
        ddzSelectRoomItemRander.prototype.dataChanged = function () {
            if (this.imgBg != undefined && this.imgBg != null) {
                this.updateUI();
            }
        };
        return ddzSelectRoomItemRander;
    }(eui.ItemRenderer));
    __reflect(ddzSelectRoomItemRander.prototype, "ddzSelectRoomItemRander");
    var ddzSelectRoom = (function (_super) {
        __extends(ddzSelectRoom, _super);
        function ddzSelectRoom() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ddzSelectRoom.prototype.onload = function () {
            var _this = this;
            _super.prototype.onload.call(this);
            this.listGames.itemRenderer = ddzSelectRoomItemRander;
            this.listGames.dataProvider = new eui.ArrayCollection(RoomManager.Instance.RoomList);
            this.AddClick(this.btnClose, function () {
                _this.Close();
            }, this);
            MessageManager.Instance.addEventListener(constant.msg.SC_QUERY_ROOM_INFO, this.onQueryRoomInfoRet, this);
        };
        ddzSelectRoom.prototype.onUnload = function () {
            _super.prototype.onUnload.call(this);
            MessageManager.Instance.removeEventListener(constant.msg.SC_QUERY_ROOM_INFO, this.onQueryRoomInfoRet, this);
        };
        ddzSelectRoom.prototype.onQueryRoomInfoRet = function (data) {
            if (data.ret == 0) {
                // this.Close()
                UIManager.Instance.LoadUI(UI.ddzRoom);
            }
        };
        return ddzSelectRoom;
    }(gameUI.base));
    gameUI.ddzSelectRoom = ddzSelectRoom;
    __reflect(ddzSelectRoom.prototype, "gameUI.ddzSelectRoom");
})(gameUI || (gameUI = {}));
//# sourceMappingURL=ddzSelectRoom.js.map
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
    var ddzRoomItemRander = (function (_super) {
        __extends(ddzRoomItemRander, _super);
        function ddzRoomItemRander() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/custom_skins/games/ddzRoomTableSkin.exml";
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.onload, _this);
            return _this;
        }
        ddzRoomItemRander.prototype.onload = function () {
            var _this = this;
            this.updateUI();
            this.btnEnter1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.sitDown(0);
            }, this);
            this.btnEnter2.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.sitDown(1);
            }, this);
            this.btnEnter3.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.sitDown(2);
            }, this);
        };
        ddzRoomItemRander.prototype.sitDown = function (chair_id) {
            RoomManager.Instance.SitDown(this.data.TableId, chair_id);
        };
        ddzRoomItemRander.prototype.updateUI = function () {
            if (this.imgUser1 != undefined && this.imgUser1 != null) {
                var userImages = [this.imgUser1, this.imgUser2, this.imgUser3];
                for (var i = 0; i < 3; i++) {
                    var userId = this.data.GetUserByChairId(i);
                    if (userId != null) {
                        userImages[i].visible = true;
                    }
                    else {
                        userImages[i].visible = false;
                    }
                }
            }
        };
        ddzRoomItemRander.prototype.dataChanged = function () {
            if (this.btnTable != undefined && this.btnTable != null) {
                this.updateUI();
            }
        };
        return ddzRoomItemRander;
    }(eui.ItemRenderer));
    __reflect(ddzRoomItemRander.prototype, "ddzRoomItemRander");
    var ddzRoom = (function (_super) {
        __extends(ddzRoom, _super);
        function ddzRoom() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ddzRoom.prototype.onload = function () {
            var _this = this;
            _super.prototype.onload.call(this);
            this.listGames.itemRenderer = ddzRoomItemRander;
            this.listGames.dataProvider = new eui.ArrayCollection(RoomManager.Instance.currentRoom.Tables);
            this.AddClick(this.btnClose, function () {
                _this.Close();
            }, this);
        };
        ddzRoom.prototype.onUnload = function () {
            _super.prototype.onUnload.call(this);
        };
        return ddzRoom;
    }(gameUI.base));
    gameUI.ddzRoom = ddzRoom;
    __reflect(ddzRoom.prototype, "gameUI.ddzRoom");
})(gameUI || (gameUI = {}));
//# sourceMappingURL=ddzRoom.js.map
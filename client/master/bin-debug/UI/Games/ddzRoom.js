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
            _this.isLoaded = false;
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.onload, _this);
            _this.skinName = "resource/custom_skins/games/ddzRoomTableSkin.exml";
            return _this;
        }
        ddzRoomItemRander.prototype.onload = function () {
            var _this = this;
            this.isLoaded = true;
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
            if (this.data.GetUserByChairId(chair_id) != null) {
                alert('有人坐了，请选其他位置');
                return;
            }
            RoomManager.Instance.SitDown(this.data.TableId, chair_id);
        };
        ddzRoomItemRander.prototype.updateUI = function () {
            if (!this.isLoaded || this.data == null)
                return;
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
            this.txtTableNum.text = this.data.TableId.toString() + "号桌";
            this.txtStatus.text = '等待中';
        };
        ddzRoomItemRander.prototype.dataChanged = function () {
            this.updateUI();
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
            MessageManager.Instance.addEventListener(constant.msg.SC_USER_SIT_DOWN, this.onPlayerSitDown, this);
            MessageManager.Instance.addEventListener(constant.msg.SC_LEAVE_ROOM, this.onLeaveRoomRet, this);
            this.listGames.itemRenderer = ddzRoomItemRander;
            this.listGames.dataProvider = new eui.ArrayCollection(RoomManager.Instance.currentRoom.Tables);
            this.AddClick(this.btnClose, function () {
                RoomManager.Instance.LevelRoom();
            }, this);
            UIManager.Instance.Lobby.groupType.visible = false;
            UIManager.Instance.Lobby.groupTopMenu.visible = false;
            UIManager.Instance.Lobby.imgBg.source = 'background2_png';
            this.AddClick(this.btnQuickStart, function () {
                for (var i = 0; i < _this.listGames.numChildren; i++) {
                    var tableItem = _this.listGames.getChildAt(i);
                }
            }, this);
        };
        ddzRoom.prototype.onUnload = function () {
            _super.prototype.onUnload.call(this);
            MessageManager.Instance.removeEventListener(constant.msg.SC_USER_SIT_DOWN, this.onPlayerSitDown, this);
            MessageManager.Instance.removeEventListener(constant.msg.SC_LEAVE_ROOM, this.onLeaveRoomRet, this);
            UIManager.Instance.Lobby.groupType.visible = true;
            UIManager.Instance.Lobby.groupTopMenu.visible = true;
            UIManager.Instance.Lobby.imgBg.source = UIManager.Instance.Lobby.defaultBackground;
        };
        ddzRoom.prototype.onPlayerSitDown = function (data) {
            if (data.ret == 1) {
                // todo
                RES.loadGroup("ddzRes");
                RES.loadGroup("face");
                RES.loadGroup("poke");
                UIManager.Instance.UnloadUI(UI.ddzRoom);
                UIManager.Instance.UnloadUI(UI.lobby);
                UIManager.Instance.LoadUI(UI.ddzGame);
            }
        };
        ddzRoom.prototype.onLeaveRoomRet = function (data) {
            if (data.ret == 0) {
                this.Close();
                UIManager.Instance.LoadUI(UI.ddzSelectRoom);
            }
        };
        return ddzRoom;
    }(gameUI.base));
    gameUI.ddzRoom = ddzRoom;
    __reflect(ddzRoom.prototype, "gameUI.ddzRoom");
})(gameUI || (gameUI = {}));
//# sourceMappingURL=ddzRoom.js.map
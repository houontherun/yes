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
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.numbers = [];
            return _this;
        }
        enter_room.prototype.onload = function () {
            var _this = this;
            _super.prototype.onload.call(this);
            this.btnCreateRoom.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                UIManager.Instance.LoadUI(UI.create_room);
            }, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.Close();
            }, this);
            this.btnReinput.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.numbers = [];
                _this.updateUI();
            }, this);
            this.btnDel.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (_this.numbers.length > 0) {
                    _this.numbers.splice(_this.numbers.length - 1, 1);
                    _this.updateUI();
                }
            }, this);
            this.btn0.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.input(0); }, this);
            this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.input(1); }, this);
            this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.input(2); }, this);
            this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.input(3); }, this);
            this.btn4.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.input(4); }, this);
            this.btn5.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.input(5); }, this);
            this.btn6.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.input(6); }, this);
            this.btn7.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.input(7); }, this);
            this.btn8.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.input(8); }, this);
            this.btn9.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.input(9); }, this);
            RoomManager.Instance.addEventListener(constant.event.logic.on_join_custom_table, this.onJoinCustomTable, this);
        };
        enter_room.prototype.onUnload = function () {
            _super.prototype.onUnload.call(this);
            RoomManager.Instance.removeEventListener(constant.event.logic.on_join_custom_table, this.onJoinCustomTable, this);
        };
        enter_room.prototype.input = function (i) {
            if (this.numbers.length < 4) {
                this.numbers.push(i);
                this.updateUI();
                if (this.numbers.length == 4) {
                    this.enterRoom();
                }
            }
        };
        enter_room.prototype.updateUI = function () {
            if (this.numbers.length == 0) {
                this.txtRoomNum.text = "输　　入　　房　　号";
            }
            else {
                var s = this.numbers[0].toString();
                for (var i = 1; i < 4; i++) {
                    if (this.numbers.length > i) {
                        s += '　　 ' + this.numbers[i].toString();
                    }
                    else {
                        s += '　　 ' + ' ';
                    }
                }
                this.txtRoomNum.text = s;
            }
        };
        enter_room.prototype.enterRoom = function () {
            if (this.numbers.length == 4) {
                var roomId = this.numbers[0] * 1000 + this.numbers[1] * 100 + this.numbers[2] * 10 + this.numbers[3];
                RoomManager.Instance.JoinCustomTable(roomId);
            }
        };
        enter_room.prototype.onJoinCustomTable = function (data) {
            var _this = this;
            if (data.ret == 0) {
                GameManager.Instance.once(constant.event.logic.on_start_game, function () {
                    _this.Close();
                }, this);
                GameManager.Instance.startDDZGame();
            }
        };
        return enter_room;
    }(gameUI.base));
    gameUI.enter_room = enter_room;
    __reflect(enter_room.prototype, "gameUI.enter_room");
})(gameUI || (gameUI = {}));
//# sourceMappingURL=enter_room.js.map
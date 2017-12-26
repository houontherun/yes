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
    var DdzSettingData = (function () {
        function DdzSettingData(hall) {
            this.rounds = [];
            this.multiple = [];
            this.costs = [];
            this.gameId = 101;
            this.rounds = hall.GameNum;
            this.multiple = hall.set1;
            this.costs = [
                {
                    itemId: hall.HallCost[0],
                    num: hall.HallCost[1],
                },
                {
                    itemId: hall.HallCost[2],
                    num: hall.HallCost[3],
                }
            ];
        }
        return DdzSettingData;
    }());
    __reflect(DdzSettingData.prototype, "DdzSettingData");
    var create_room = (function (_super) {
        __extends(create_room, _super);
        function create_room() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        create_room.prototype.onload = function () {
            var _this = this;
            _super.prototype.onload.call(this);
            var hall = DataManager.Instance.getJsonData('hall');
            this.ddzSettdata = new DdzSettingData(hall.Game[101]);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.Close();
            }, this);
            this.btnCreate.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                var round = 8;
                if (_this.ddzrbtnRound1.selected) {
                    round = _this.ddzSettdata.rounds[0];
                }
                else {
                    round = _this.ddzSettdata.rounds[1];
                }
                var costId;
                var costNum;
                var room = 1;
                if (_this.ddzrbtnRoommdl1.selected) {
                    room = 1;
                    costId = _this.ddzSettdata.costs[0].itemId;
                    costNum = _this.ddzSettdata.costs[0].num;
                }
                else {
                    room = 2;
                    costId = _this.ddzSettdata.costs[1].itemId;
                    costNum = _this.ddzSettdata.costs[1].num;
                }
                var multiple = 120;
                if (_this.ddzrbtntimes1.selected) {
                    multiple = _this.ddzSettdata.multiple[0];
                }
                else {
                    multiple = _this.ddzSettdata.multiple[1];
                }
                if (PlayerManager.Instance.Data.getResourceNumById(costId) >= costNum) {
                    RoomManager.Instance.CreateCustomTable(_this.ddzSettdata.gameId, room, round, multiple);
                }
                else {
                    UIManager.Instance.showNotice("道具不足");
                }
            }, this);
            this.initDDZUI();
            RoomManager.Instance.addEventListener(constant.event.logic.on_create_custom_table, this.onCreateCustomTable, this);
        };
        create_room.prototype.onUnload = function () {
            _super.prototype.onUnload.call(this);
            RoomManager.Instance.removeEventListener(constant.event.logic.on_create_custom_table, this.onCreateCustomTable, this);
        };
        create_room.prototype.onCreateCustomTable = function (data) {
            if (data.ret == 0) {
                UIManager.Instance.showNotice('创建成功！房间号：' + data.custom_table_id);
                // GameManager.Instance.startDDZGame()
                this.Close();
            }
        };
        create_room.prototype.initDDZUI = function () {
            this.ddzrbtnRound1.label = this.ddzSettdata.rounds[0] + '局';
            this.ddzrbtnRound2.label = this.ddzSettdata.rounds[1] + '局';
            this.ddzrbtnRoommdl1.label = '房主开房';
            this.ddzrbtnRoommdl2.label = 'AA开房';
            this.ddzrbtntimes1.label = this.ddzSettdata.multiple[0] + '倍';
            this.ddzrbtntimes2.label = this.ddzSettdata.multiple[1] + '倍';
        };
        return create_room;
    }(gameUI.base));
    gameUI.create_room = create_room;
    __reflect(create_room.prototype, "gameUI.create_room");
})(gameUI || (gameUI = {}));
//# sourceMappingURL=create_room.js.map
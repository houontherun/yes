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
// 玩家状态
var UserStatus;
(function (UserStatus) {
    UserStatus[UserStatus["US_NULL"] = 0] = "US_NULL";
    UserStatus[UserStatus["US_FREE"] = 1] = "US_FREE";
    UserStatus[UserStatus["US_SIT"] = 2] = "US_SIT";
    UserStatus[UserStatus["US_READY"] = 3] = "US_READY";
    UserStatus[UserStatus["US_LOOKON"] = 4] = "US_LOOKON";
    UserStatus[UserStatus["US_PLAYING"] = 5] = "US_PLAYING";
    UserStatus[UserStatus["US_OFFLINE"] = 6] = "US_OFFLINE";
})(UserStatus || (UserStatus = {}));
var RoomData = (function () {
    function RoomData(room_data) {
        this.player_count = room_data.player_count;
        this.room_id = room_data.room_id;
    }
    Object.defineProperty(RoomData.prototype, "PlayerCount", {
        get: function () { return this.player_count; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoomData.prototype, "RoomId", {
        get: function () { return this.room_id; },
        enumerable: true,
        configurable: true
    });
    RoomData.prototype.Update = function (data) {
        if (data.player_count != undefined && data.player_count != null) {
            this.player_count = data.player_count;
        }
        if (data.room_id != undefined && data.room_id != null) {
            this.room_id = data.room_id;
        }
    };
    return RoomData;
}());
__reflect(RoomData.prototype, "RoomData");
var UserData = (function () {
    function UserData(data) {
        this.room_id = data.room_id;
        this.user_id = data.user_id;
        this.status = data.status;
        this.table_id = data.table_id;
        this.chair_id = data.chair_id;
        this.user_name = data.user_name;
    }
    Object.defineProperty(UserData.prototype, "RoomId", {
        get: function () { return this.room_id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserData.prototype, "UserId", {
        get: function () { return this.user_id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserData.prototype, "Status", {
        get: function () { return this.status; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserData.prototype, "TableId", {
        get: function () { return this.table_id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserData.prototype, "ChairId", {
        get: function () { return this.chair_id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserData.prototype, "UserName", {
        get: function () { return this.user_name; },
        enumerable: true,
        configurable: true
    });
    UserData.prototype.Update = function (data) {
        if (data.room_id != undefined && data.room_id != null) {
            this.room_id = data.room_id;
        }
        if (data.user_id != undefined && data.user_id != null) {
            this.user_id = data.user_id;
        }
        if (data.status != undefined && data.status != null) {
            this.status = data.status;
        }
        if (data.table_id != undefined && data.table_id != null) {
            this.table_id = data.table_id;
        }
        if (data.chair_id != undefined && data.chair_id != null) {
            this.chair_id = data.chair_id;
        }
        if (data.user_name != undefined && data.user_name != null) {
            this.user_name = data.user_name;
        }
    };
    return UserData;
}());
__reflect(UserData.prototype, "UserData");
var TableData = (function () {
    function TableData(data) {
        this.chairs = {}; //key=chair_id value=user_id
        this.table_id = data.table_id;
        for (var i = 0; i < data.chairs.length; i++) {
            this.chairs[data.chairs[i].chair_id] = data.chairs[i].user_id;
        }
    }
    Object.defineProperty(TableData.prototype, "TableId", {
        get: function () { return this.table_id; },
        enumerable: true,
        configurable: true
    });
    TableData.prototype.UpdateUser = function (user) {
        if (user.Status >= UserStatus.US_SIT) {
            this.chairs[user.ChairId] = user.UserId;
        }
    };
    TableData.prototype.RemoveUser = function (user) {
        if (this.chairs[user.ChairId] != undefined && this.chairs[user.ChairId] != null) {
            this.chairs[user.ChairId] = null;
        }
    };
    TableData.prototype.GetUserByChairId = function (chair_id) {
        if (this.chairs[chair_id] != undefined && this.chairs[chair_id] != null && this.chairs[chair_id] != 0xFFFF) {
            return this.chairs[chair_id];
        }
        return null;
    };
    return TableData;
}());
__reflect(TableData.prototype, "TableData");
var EnterRoomData = (function () {
    function EnterRoomData(data) {
        this.users = [];
        this.tables = [];
        this.tablesDic = {};
        for (var i = 0; i < data.users.length; i++) {
            var ud = new UserData(data.users[i]);
            this.users.push(ud);
        }
        for (var i = 0; i < data.tables.length; i++) {
            var td = new TableData(data.tables[i]);
            this.tables.push(td);
            this.tablesDic[td.TableId] = td;
        }
    }
    EnterRoomData.prototype.AddUser = function (data) {
        var ud = new UserData(data);
        this.users.push(ud);
        if (this.tablesDic[ud.TableId] != undefined && this.tablesDic[ud.TableId] != null) {
            this.tablesDic[ud.TableId].UpdateUser(ud);
        }
    };
    EnterRoomData.prototype.RemoveUser = function (data) {
        for (var i = this.users.length - 1; i >= 0; i--) {
            if (this.users[i].UserId == data.user_id) {
                this.tablesDic[this.users[i].TableId].RemoveUser(this.users[i]);
                this.users.splice(i, 1);
            }
        }
    };
    EnterRoomData.prototype.UpdateUser = function (data) {
        for (var i = this.users.length - 1; i >= 0; i--) {
            if (this.users[i].UserId == data.user_id) {
                this.users[i].Update(data);
                if (this.tablesDic[this.users[i].TableId] != undefined && this.tablesDic[this.users[i].TableId] != null) {
                    this.tablesDic[this.users[i].TableId].UpdateUser(this.users[i]);
                }
            }
        }
    };
    Object.defineProperty(EnterRoomData.prototype, "Tables", {
        get: function () { return this.tables; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EnterRoomData.prototype, "Users", {
        get: function () { return this.users; },
        enumerable: true,
        configurable: true
    });
    return EnterRoomData;
}());
__reflect(EnterRoomData.prototype, "EnterRoomData");
var RoomManager = (function (_super) {
    __extends(RoomManager, _super);
    function RoomManager() {
        var _this = _super.call(this) || this;
        _this.roomList = [];
        _this.currentRoom = null;
        return _this;
    }
    RoomManager.prototype.Init = function () {
        MessageManager.Instance.addEventListener(constant.msg.SC_ROOM_LIST, this.onRoomListRet, this);
        MessageManager.Instance.addEventListener(constant.msg.SC_ENTER_ROOM, this.onEnterRoomRet, this);
        MessageManager.Instance.addEventListener(constant.msg.SC_QUERY_ROOM_INFO, this.onQueryRoomInfoRet, this);
        MessageManager.Instance.addEventListener(constant.msg.SC_LEAVE_ROOM, this.onLeaveRoomRet, this);
        MessageManager.Instance.addEventListener(constant.msg.SC_PLAYER_ENTER_ROOM, this.onPlayerEnterRoom, this);
        MessageManager.Instance.addEventListener(constant.msg.SC_PLAYER_LEAVE_ROOM, this.onPlayerLeaveRoom, this);
        MessageManager.Instance.addEventListener(constant.msg.SC_USER_SIT_DOWN, this.onPlayerSitDown, this);
        MessageManager.Instance.addEventListener(constant.msg.SC_USER_STATUS, this.onPlayerStateUpdate, this);
        MessageManager.Instance.addEventListener(constant.msg.SC_USER_STAND_UP, this.onPlayerStandup, this);
    };
    RoomManager.prototype.onRoomListRet = function (data) {
        for (var i = 0; i < data.room_list.length; i++) {
            var rd = new RoomData(data.room_list[i]);
            this.roomList.push(rd);
        }
    };
    Object.defineProperty(RoomManager.prototype, "RoomList", {
        get: function () {
            return this.roomList;
        },
        enumerable: true,
        configurable: true
    });
    // 请求进入房间
    RoomManager.prototype.EnterRoom = function (id) {
        MessageManager.Instance.SendMessage({
            protocol: constant.msg.CS_ENTER_ROOM,
            room_id: id
        });
    };
    RoomManager.prototype.onEnterRoomRet = function (data) {
        if (data.ret == 0) {
            this.queryRoomInfo();
        }
    };
    RoomManager.prototype.queryRoomInfo = function () {
        MessageManager.Instance.SendMessage({
            protocol: constant.msg.CS_QUERY_ROOM_INFO
        });
    };
    RoomManager.prototype.onQueryRoomInfoRet = function (data) {
        if (data.ret == 0) {
            this.currentRoom = new EnterRoomData(data);
        }
    };
    // 请求离开房间
    RoomManager.prototype.LevelRoom = function () {
        MessageManager.Instance.SendMessage({
            protocol: constant.msg.CS_LEAVE_ROOM
        });
    };
    RoomManager.prototype.onLeaveRoomRet = function (data) {
        if (data.ret == 0) {
            this.currentRoom = null;
        }
    };
    // 有玩家进入
    RoomManager.prototype.onPlayerEnterRoom = function (data) {
        if (data.ret == 0) {
            if (this.currentRoom != null && this.currentRoom != undefined) {
                this.currentRoom.AddUser(data);
            }
        }
    };
    // 有玩家离开     
    RoomManager.prototype.onPlayerLeaveRoom = function (data) {
        if (data.ret == 0) {
            if (this.currentRoom != null && this.currentRoom != undefined) {
                this.currentRoom.RemoveUser(data);
            }
        }
    };
    // 坐下
    RoomManager.prototype.SitDown = function (tableId, chairId) {
        MessageManager.Instance.SendMessage({
            protocol: constant.msg.CS_USER_SIT_DOWN,
            table_id: tableId,
            chair_id: chairId
        });
    };
    RoomManager.prototype.onPlayerSitDown = function (data) {
        if (data.ret == 0) {
            if (this.currentRoom != null && this.currentRoom != undefined) {
            }
        }
    };
    // 起来
    RoomManager.prototype.Standup = function () {
        MessageManager.Instance.SendMessage({
            protocol: constant.msg.CS_USER_STAND_UP
        });
    };
    RoomManager.prototype.onPlayerStandup = function (data) {
        // do nothing
    };
    // 玩家状态改变
    RoomManager.prototype.onPlayerStateUpdate = function (data) {
        if (data.ret == 0) {
            if (this.currentRoom != null && this.currentRoom != undefined) {
                this.currentRoom.UpdateUser(data);
            }
        }
    };
    RoomManager.Instance = new RoomManager();
    return RoomManager;
}(Dispatcher));
__reflect(RoomManager.prototype, "RoomManager");
//# sourceMappingURL=RoomManager.js.map
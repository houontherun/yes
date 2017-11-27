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
var PlayerData = (function () {
    function PlayerData(loginData) {
        this.userid = loginData.userid;
        this.gold = loginData.gold;
        this.bankgold = loginData.bankgold;
        this.diamond = loginData.diamond;
        this.card = loginData.card;
        this.account = loginData.openid;
        this.name = loginData.name;
        this.sex = loginData.sex;
    }
    PlayerData.prototype.Update = function (data) {
        if (data.userid != undefined && data.userid != null) {
            this.userid = data.userid;
        }
        if (data.gold != undefined && data.gold != null) {
            this.gold = data.gold;
        }
        if (data.bankgold != undefined && data.bankgold != null) {
            this.bankgold = data.bankgold;
        }
        if (data.diamond != undefined && data.diamond != null) {
            this.diamond = data.diamond;
        }
        if (data.card != undefined && data.card != null) {
            this.card = data.card;
        }
        if (data.account != undefined && data.account != null) {
            this.account = data.account;
        }
        if (data.name != undefined && data.name != null) {
            this.name = data.name;
        }
        if (data.sex != undefined && data.sex != null) {
            this.sex = data.sex;
        }
    };
    Object.defineProperty(PlayerData.prototype, "UserId", {
        get: function () {
            return this.userid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerData.prototype, "Gold", {
        get: function () {
            return this.gold;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerData.prototype, "BankGold", {
        get: function () {
            return this.bankgold;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerData.prototype, "Diamond", {
        get: function () {
            return this.diamond;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerData.prototype, "Cardnum", {
        get: function () {
            return this.card;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerData.prototype, "Account", {
        get: function () {
            return this.account;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerData.prototype, "Name", {
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerData.prototype, "Sex", {
        get: function () {
            return this.sex;
        },
        enumerable: true,
        configurable: true
    });
    return PlayerData;
}());
__reflect(PlayerData.prototype, "PlayerData");
var PlayerManager = (function (_super) {
    __extends(PlayerManager, _super);
    function PlayerManager() {
        return _super.call(this) || this;
    }
    Object.defineProperty(PlayerManager.prototype, "Data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    PlayerManager.prototype.updateData = function (data) {
        this._data.Update(data);
        this.dispatchEvent(constant.event.logic.on_player_data_update, this._data);
    };
    PlayerManager.prototype.Init = function () {
        MessageManager.Instance.addEventListener(constant.msg.SC_LOGIN, this.onLoginRet, this);
        MessageManager.Instance.addEventListener(constant.msg.SC_SAVE_MONEY, this.onSaveMoneyRet, this);
        MessageManager.Instance.addEventListener(constant.msg.SC_WITHDRAW_MONEY, this.onWithdrawGoldRet, this);
        MessageManager.Instance.addEventListener(constant.msg.SC_GIVE_GOLD_2_OTHER, this.onGiveGoldRet, this);
        MessageManager.Instance.addEventListener(constant.msg.SC_RECV_OTHER_GOLD, this.onReciveGold, this);
    };
    PlayerManager.prototype.onLoginRet = function (data) {
        if (data.error != 0) {
            return;
        }
        this._data = new PlayerData(data);
        this.dispatchEvent(constant.event.logic.on_player_data_update, this._data);
    };
    PlayerManager.prototype.SaveGold = function (num) {
        MessageManager.Instance.SendMessage({
            protocol: constant.msg.CS_SAVE_MONEY,
            gold: num
        });
    };
    PlayerManager.prototype.onSaveMoneyRet = function (data) {
        if (data.ret != 0) {
            console.log('save gold failed error code = ' + data.ret);
            return;
        }
        this.updateData(data);
    };
    PlayerManager.prototype.WithdrawGold = function (num) {
        MessageManager.Instance.SendMessage({
            protocol: constant.msg.CS_WITHDRAW_MONEY,
            gold: num
        });
    };
    PlayerManager.prototype.onWithdrawGoldRet = function (data) {
        if (data.ret != 0) {
            console.log('withdraw gold failed error code = ' + data.ret);
            return;
        }
        this.updateData(data);
    };
    PlayerManager.prototype.GiveGold = function (num, uid) {
        MessageManager.Instance.SendMessage({
            protocol: constant.msg.CS_GIVE_GOLD_2_OTHER,
            gold: num,
            uid: uid
        });
    };
    PlayerManager.prototype.onGiveGoldRet = function (data) {
        if (data.ret != 0) {
            console.log('withdraw gold failed error code = ' + data.ret);
            return;
        }
        this.updateData(data);
    };
    PlayerManager.prototype.onReciveGold = function (data) {
        this.updateData(data);
    };
    PlayerManager.Instance = new PlayerManager();
    return PlayerManager;
}(Dispatcher));
__reflect(PlayerManager.prototype, "PlayerManager");
//# sourceMappingURL=PlayerManager.js.map
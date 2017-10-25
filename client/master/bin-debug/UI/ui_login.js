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
var ui_login = (function (_super) {
    __extends(ui_login, _super);
    function ui_login() {
        var _this = _super.call(this) || this;
        _this.once(eui.UIEvent.COMPLETE, _this.onload, _this);
        _this.skinName = "resource/custom_skins/ui_login.exml";
        return _this;
    }
    ui_login.prototype.onload = function () {
        var _this = this;
        this.btnLogin.labelDisplay.size = 50;
        this.txtUserName.textDisplay.size = 30;
        this.txtPassword.textDisplay.size = 30;
        this.btnLogin.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            // NetworkManager.Instance.addEventListener(constant.event.network.on_connect_succeed, this.onConSucceed, this);
            // NetworkManager.Instance.Connect(constant.connect_ip, constant.connect_port);
            var game_data = [
                {
                    type_name: "0扑克",
                    icon: "default.png",
                    childs: [
                        {
                            id: 100,
                            name: "0斗地主",
                            icon: "default.png"
                        },
                        {
                            id: 101,
                            name: "斗牛",
                            icon: "default.png"
                        },
                        {
                            id: 102,
                            name: "炸金花",
                            icon: "default.png"
                        },
                        {
                            id: 103,
                            name: "21点",
                            icon: "default.png"
                        }
                    ]
                },
                {
                    type_name: "1麻将",
                    icon: "default.png",
                    childs: [
                        {
                            id: 104,
                            name: "1江西麻将",
                            icon: "default.png"
                        },
                        {
                            id: 105,
                            name: "湖南麻将",
                            icon: "default.png"
                        },
                        {
                            id: 106,
                            name: "四川麻将",
                            icon: "default.png"
                        },
                        {
                            id: 107,
                            name: "福建麻将",
                            icon: "default.png"
                        },
                        {
                            id: 108,
                            name: "上海麻将",
                            icon: "default.png"
                        },
                        {
                            id: 109,
                            name: "杭州麻将",
                            icon: "default.png"
                        },
                        {
                            id: 110,
                            name: "火星麻将",
                            icon: "default.png"
                        }
                    ]
                },
                {
                    type_name: "2棋类",
                    icon: "default.png",
                    childs: [
                        {
                            id: 111,
                            name: "2开心消消乐",
                            icon: "default.png"
                        }
                    ]
                }
            ];
            _this.onLoginSucceed(game_data);
        }, this);
    };
    ui_login.prototype.onConSucceed = function () {
        NetworkManager.Instance.removeEventListener(constant.event.network.on_connect_succeed, this.onConSucceed, this);
        this.requestLogin();
    };
    ui_login.prototype.requestLogin = function () {
        MessageManager.Instance.once(constant.msg.sc_login_succ, this.onLoginSucceed, this);
        MessageManager.Instance.once(constant.msg.sc_login_failed, this.onLoginFailed, this);
        MessageManager.Instance.SendMessage({
            c: constant.msg.cs_login,
            openid: 9999
        });
    };
    ui_login.prototype.onLoginSucceed = function (data) {
        UIManager.Instance.Unload(this);
        UIManager.Instance.LoadHome(data);
    };
    ui_login.prototype.onLoginFailed = function (data) {
        console.log("login failed");
    };
    return ui_login;
}(ui_base));
__reflect(ui_login.prototype, "ui_login");

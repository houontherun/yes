// 登录ui
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
    var login = (function (_super) {
        __extends(login, _super);
        function login() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        login.prototype.onload = function () {
            var _this = this;
            _super.prototype.onload.call(this);
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
                                icon: "resource/assets/bg.png"
                            },
                            {
                                id: 101,
                                name: "斗牛",
                                icon: "resource/assets/bg.png"
                            },
                            {
                                id: 102,
                                name: "炸金花",
                                icon: "resource/assets/bg.png"
                            },
                            {
                                id: 103,
                                name: "21点",
                                icon: "resource/assets/bg.png"
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
                                icon: "resource/assets/bg.png"
                            },
                            {
                                id: 105,
                                name: "湖南麻将",
                                icon: "resource/assets/bg.png"
                            },
                            {
                                id: 106,
                                name: "四川麻将",
                                icon: "resource/assets/bg.png"
                            },
                            {
                                id: 107,
                                name: "福建麻将",
                                icon: "resource/assets/bg.png"
                            },
                            {
                                id: 108,
                                name: "上海麻将",
                                icon: "resource/assets/bg.png"
                            },
                            {
                                id: 109,
                                name: "杭州麻将",
                                icon: "resource/assets/bg.png"
                            },
                            {
                                id: 110,
                                name: "火星麻将",
                                icon: "resource/assets/bg.png"
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
                                icon: "resource/assets/bg.png"
                            }
                        ]
                    }
                ];
                _this.onLoginSucceed(game_data);
            }, this);
        };
        login.prototype.onConSucceed = function () {
            NetworkManager.Instance.removeEventListener(constant.event.network.on_connect_succeed, this.onConSucceed, this);
            this.requestLogin();
        };
        login.prototype.requestLogin = function () {
            MessageManager.Instance.once(constant.msg.SC_LOGIN.toString(), this.onLoginSucceed, this);
            MessageManager.Instance.SendMessage({
                c: constant.msg.CS_LOGIN,
                openid: 9999
            });
        };
        login.prototype.onLoginSucceed = function (data) {
            this.Close();
            UIManager.Instance.LoadUI(UI.lobby, data);
        };
        login.prototype.onLoginFailed = function (data) {
            console.log("login failed");
        };
        return login;
    }(gameUI.base));
    gameUI.login = login;
    __reflect(login.prototype, "gameUI.login");
})(gameUI || (gameUI = {}));
//# sourceMappingURL=login.js.map
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
        login.prototype.test = function () {
            var indexA = this.txtAccount.text.split(',');
            var indexB = this.txtPassword.text.split(',');
            var pockA = [];
            var pockB = [];
            for (var i = 0; i < indexA.length; i++) {
                pockA.push(Card.Util.createPokerCard(parseInt(indexA[i])));
            }
            for (var i = 0; i < indexB.length; i++) {
                pockB.push(Card.Util.createPokerCard(parseInt(indexB[i])));
            }
            // 组合测试
            // var A = new Card.ddzPackCardGroup(pockA)
            // var B = new Card.ddzPackCardGroup(pockB)
            // var msg = A.CardType.toString() + '\r\n'
            // msg += B.CardType.toString() + '\r\n'
            // msg += A.isPress(B).toString()
            // UIManager.Instance.showNotice(msg)
            // 压死测试
            var A = new Card.ddzPackCardGroup(pockA);
            var B = new Card.ddzHandCards(pockB);
            var pressed = B.getPressedCards(A);
            var allMsg = '';
            for (var i = 0; i < pressed.length; i++) {
                var msg = '';
                for (var j = 0; j < pressed[i].length; j++) {
                    msg += pressed[i][j].Index.toString();
                }
                allMsg += msg + '\r\n';
            }
            UIManager.Instance.showNotice(allMsg);
        };
        login.prototype.initText = function () {
            this.lblAccount.text = this.text(1101001);
            this.lblPassword.text = this.text(1101002);
            this.btnRegister.text = this.text(1101004);
            this.btnForgetPwd.text = this.text(1101008);
            this.lblLogin.text = this.text(1101003);
            this.txtAccount.prompt = this.text("请输入用户名");
            this.txtPassword.prompt = this.text("请输入用密码");
        };
        login.prototype.onload = function () {
            var _this = this;
            _super.prototype.onload.call(this);
            this.initText();
            this.btnLogin.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (ConnectionManager.Instance.isConnected) {
                    _this.requestLogin();
                }
                else {
                    ConnectionManager.Instance.connect(constant.connect_ip, constant.connect_port, function () {
                        _this.requestLogin();
                    }, _this);
                }
                // this.test()
            }, this);
            var storageUserName = Util.getItem('username');
            if (storageUserName != null) {
                this.txtAccount.text = storageUserName;
            }
            var storagePassword = Util.getItem('password');
            if (storagePassword != null) {
                this.txtPassword.text = storagePassword;
            }
            this.btnWeixin.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                UIManager.Instance.showNotice('暂未实现');
            }, this);
            this.btnQQ.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                UIManager.Instance.showNotice('暂未实现');
            }, this);
            this.btnForgetPwd.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (ConnectionManager.Instance.isConnected) {
                    UIManager.Instance.LoadUI(UI.forgetPwd);
                }
                else {
                    ConnectionManager.Instance.connect(constant.connect_ip, constant.connect_port, function () {
                        UIManager.Instance.LoadUI(UI.forgetPwd);
                    }, _this);
                }
            }, this);
            this.btnRegister.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (ConnectionManager.Instance.isConnected) {
                    UIManager.Instance.LoadUI(UI.register);
                }
                else {
                    ConnectionManager.Instance.connect(constant.connect_ip, constant.connect_port, function () {
                        UIManager.Instance.LoadUI(UI.register);
                    }, _this);
                }
            }, this);
        };
        login.prototype.requestLogin = function () {
            LoginManager.Instance.loginPlatform(this.txtAccount.text, this.txtPassword.text, this.onLoginRet, this);
        };
        login.prototype.onLoginRet = function (data) {
            var _this = this;
            if (data.ret != 0) {
                return;
            }
            Util.setItem('username', this.txtAccount.text);
            Util.setItem('password', this.txtPassword.text);
            this.Close();
            UIManager.Instance.LoadUI(UI.loading, null, function () {
                var timer = new egret.Timer(500, 1);
                timer.addEventListener(egret.TimerEvent.TIMER, function () {
                    var loadingUI = UIManager.Instance.GetChild(UI.loading);
                    var groups = [
                        "preload",
                        "lobby",
                        "common",
                        "setting",
                        "bank",
                        "rank",
                        "ddz_lobby",
                    ];
                    ResourceManager.Instance.loadGroups(groups, _this, function () {
                        loadingUI.Close();
                        UIManager.Instance.LoadUI(UI.lobby);
                    }, function (current, total) {
                        loadingUI.setProgress(Math.floor(current * 100 / total));
                    });
                }, _this);
                timer.start();
            }, this);
        };
        return login;
    }(gameUI.base));
    gameUI.login = login;
    __reflect(login.prototype, "gameUI.login");
})(gameUI || (gameUI = {}));
//# sourceMappingURL=login.js.map
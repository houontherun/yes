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
// 注册
var gameUI;
(function (gameUI) {
    var register = (function (_super) {
        __extends(register, _super);
        function register() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        register.prototype.initText = function () {
            this.lblAccount.text = this.text(1101001);
            this.lblPassword.text = this.text(1101002);
            this.lblRegister.text = this.text(1101004);
            this.txtAccount.prompt = this.text(1101006);
            this.txtPassword.prompt = '密码不能少于6位';
            this.lblOtherAccount.text = this.text(1101007);
            this.lblWexin.text = '微信';
            this.lblQQ.text = "QQ";
            this.lblPhone.text = "手机";
            this.lblPlat.text = "平台";
        };
        register.prototype.onload = function () {
            var _this = this;
            _super.prototype.onload.call(this);
            this.initText();
            this.btnRegister.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.account = _this.txtAccount.text;
                _this.password = _this.txtPassword.text;
                if (_this.account.trim().length < 6) {
                    UIManager.Instance.showNotice('账号长度至少6位');
                    return;
                }
                if (_this.password.trim().length < 6) {
                    UIManager.Instance.showNotice('密码长度至少6位');
                    return;
                }
                LoginManager.Instance.registerPlatform(_this.account, _this.password, _this.onRegister, _this);
            }, this);
            this.btnWeixin.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                UIManager.Instance.showNotice('暂未实现');
            }, this);
            this.btnQQ.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                UIManager.Instance.showNotice('暂未实现');
            }, this);
            this.btnPhone.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                UIManager.Instance.LoadUI(UI.phoneRegister);
            }, this);
            this.btnFanqi.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                UIManager.Instance.showNotice('暂未实现');
            }, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.Close();
                UIManager.Instance.LoadUI(UI.login);
            }, this);
        };
        register.prototype.onRegister = function (data) {
            var _this = this;
            if (data.ret != 0) {
                return;
            }
            LoginManager.Instance.loginPlatform(this.account, this.password, function (d) {
                if (d.ret != 0) {
                    return;
                }
                Util.setItem('username', _this.account);
                Util.setItem('password', _this.password);
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
                }, _this);
            }, this);
        };
        return register;
    }(gameUI.base));
    gameUI.register = register;
    __reflect(register.prototype, "gameUI.register");
})(gameUI || (gameUI = {}));
//# sourceMappingURL=register.js.map
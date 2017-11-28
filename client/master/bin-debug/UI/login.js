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
                NetworkManager.Instance.addEventListener(constant.event.network.on_connect_succeed, _this.onConSucceed, _this);
                NetworkManager.Instance.Connect(constant.connect_ip, constant.connect_port);
                // ----- for test -------
                // this.onConSucceed()
                // ----------------------
            }, this);
            var storageUserName = Util.getItem('username');
            if (storageUserName != null) {
                this.txtUserName.text = storageUserName;
            }
        };
        login.prototype.onConSucceed = function () {
            NetworkManager.Instance.removeEventListener(constant.event.network.on_connect_succeed, this.onConSucceed, this);
            this.requestLogin();
        };
        login.prototype.requestLogin = function () {
            MessageManager.Instance.addEventListener(constant.msg.SC_LOGIN, this.onLoginRet, this);
            MessageManager.Instance.SendMessage({
                protocol: constant.msg.CS_LOGIN,
                openid: this.txtUserName.text
            });
            // ----- for test --------
            // var lgdata = {
            //     userid : 10086,
            //     gold:512,
            //     bankgold:3000,
            //     diamond:12,
            //     card:3,
            //     openid:"test",
            //     name:"itol",
            //     sex:1,
            //     error:0,
            //     protocol:2001,
            // }
            // MessageManager.Instance.DispatchMessage(lgdata)
            // ---------------------------
        };
        login.prototype.onLoginRet = function (data) {
            if (data.ret != 0) {
                console.log("login error code=" + data.ret);
                return;
            }
            Util.setItem('username', this.txtUserName.text);
            this.Close();
            UIManager.Instance.LoadUI(UI.lobby);
        };
        return login;
    }(gameUI.base));
    gameUI.login = login;
    __reflect(login.prototype, "gameUI.login");
})(gameUI || (gameUI = {}));
//# sourceMappingURL=login.js.map
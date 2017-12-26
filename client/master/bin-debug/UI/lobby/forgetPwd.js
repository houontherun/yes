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
    var forgetPwd = (function (_super) {
        __extends(forgetPwd, _super);
        function forgetPwd() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        forgetPwd.prototype.onload = function () {
            var _this = this;
            _super.prototype.onload.call(this);
            this.lblOk.text = '确认修改';
            this.btnRegister.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (_this.txtCode.text.length == 0 || _this.txtAccount.text.length == 0 || _this.txtPassword.text.length == 0) {
                    UIManager.Instance.showNotice('手机号、密码、验证码不能为空');
                    return;
                }
                // do sth
            }, this);
            this.btnGetcode.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                UIManager.Instance.showNotice('假设已经发送了....');
            }, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.Close();
                UIManager.Instance.LoadUI(UI.login);
            }, this);
        };
        return forgetPwd;
    }(gameUI.base));
    gameUI.forgetPwd = forgetPwd;
    __reflect(forgetPwd.prototype, "gameUI.forgetPwd");
})(gameUI || (gameUI = {}));
//# sourceMappingURL=forgetPwd.js.map
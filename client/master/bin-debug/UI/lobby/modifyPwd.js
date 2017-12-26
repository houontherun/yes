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
    var modifyPwd = (function (_super) {
        __extends(modifyPwd, _super);
        function modifyPwd() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        modifyPwd.prototype.initText = function () {
            this.lblAccount.text = this.text(1101001);
            this.lblOldPwd.text = this.text(1101002);
            this.lblNewPwd.text = this.text(1101011);
            this.lblNewPwd2.text = this.text('重复密码');
            this.txtAccount.text = this.text('请输入帐号');
            this.txtOldPwd.text = this.text('请输入密码');
            this.txtNewPwd.text = this.text(1101012);
            this.txtNewPwd2.text = this.text(1101012);
            this.lblModify.text = this.text(1101016);
        };
        modifyPwd.prototype.onload = function () {
            var _this = this;
            _super.prototype.onload.call(this);
            this.initText();
            this.btnModify.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (_this.txtAccount.text.trim() == "") {
                    UIManager.Instance.showNotice('请输入帐号');
                    return;
                }
                if (_this.txtOldPwd.text.trim() == "") {
                    UIManager.Instance.showNotice('请输入原始密码');
                    return;
                }
                if (_this.txtNewPwd.text.trim() == "") {
                    UIManager.Instance.showNotice('请输入新密码');
                    return;
                }
                if (_this.txtNewPwd2.text.trim() == "") {
                    UIManager.Instance.showNotice('请再次输入新密码');
                    return;
                }
                LoginManager.Instance.changePlatformPwd(_this.txtAccount.text.trim(), _this.txtOldPwd.text.trim(), _this.txtNewPwd.text.trim(), function (data) {
                    if (data.ret == 0) {
                        UIManager.Instance.showNotice('修改成功');
                    }
                }, _this);
            }, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.Close();
            }, this);
        };
        return modifyPwd;
    }(gameUI.base));
    gameUI.modifyPwd = modifyPwd;
    __reflect(modifyPwd.prototype, "gameUI.modifyPwd");
})(gameUI || (gameUI = {}));
//# sourceMappingURL=modifyPwd.js.map
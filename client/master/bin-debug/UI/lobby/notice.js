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
// TypeScript file
var gameUI;
(function (gameUI) {
    var notice = (function (_super) {
        __extends(notice, _super);
        function notice() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // private onCancelCallback:Function = null
            _this.onOKCallback = null;
            return _this;
        }
        notice.prototype.initText = function () {
            this.txtTitle.text = this.text("提示");
            this.lbOK.text = this.text("确定");
        };
        notice.prototype.onload = function () {
            var _this = this;
            _super.prototype.onload.call(this);
            this.initText();
            this.AddClick(this.btnClose, function () {
                _this.Close();
            }, this);
            this.AddClick(this.btnOK, function () {
                if (_this.onOKCallback != null) {
                    _this.onOKCallback();
                }
                _this.Close();
            }, this);
            if (this.Data != null) {
                if (this.Data.title != undefined) {
                    this.txtTitle.text = this.Data.title;
                }
                this.txtContent.text = '';
                if (this.Data.content != undefined) {
                    this.txtContent.text = this.Data.content;
                }
                if (this.Data.ok != undefined) {
                    this.lbOK.text = this.Data.ok;
                }
                if (this.Data.okCallback != undefined) {
                    this.onOKCallback = this.Data.okCallback;
                }
            }
        };
        notice.prototype.onUnload = function () {
            _super.prototype.onUnload.call(this);
            this.onOKCallback = null;
        };
        return notice;
    }(gameUI.base));
    gameUI.notice = notice;
    __reflect(notice.prototype, "gameUI.notice");
})(gameUI || (gameUI = {}));
//# sourceMappingURL=notice.js.map
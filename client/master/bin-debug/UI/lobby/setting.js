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
    var settingLanguageItemRander = (function (_super) {
        __extends(settingLanguageItemRander, _super);
        function settingLanguageItemRander() {
            var _this = _super.call(this) || this;
            _this.isLoaded = false;
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.onload, _this);
            _this.skinName = "resource/custom_skins/settingLanguageItem.exml";
            _this.isLoaded = false;
            return _this;
        }
        settingLanguageItemRander.prototype.onload = function () {
            var _this = this;
            this.isLoaded = true;
            this.txtLan.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                var settingUI = UIManager.Instance.GetChild(UI.setting);
                if (settingUI != null) {
                    settingUI.onSelectLanguage(_this.data.text);
                }
            }, this);
            this.updateUI();
        };
        settingLanguageItemRander.prototype.updateUI = function () {
            if (!this.isLoaded || this.data == null) {
                return;
            }
            this.txtLan.text = this.data.text;
        };
        settingLanguageItemRander.prototype.dataChanged = function () {
            this.updateUI();
        };
        return settingLanguageItemRander;
    }(eui.ItemRenderer));
    __reflect(settingLanguageItemRander.prototype, "settingLanguageItemRander");
    var setting = (function (_super) {
        __extends(setting, _super);
        function setting() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        setting.prototype.initText = function () {
            this.txtTitle.text = this.text(1102019);
            this.lblLogout.text = this.text(1102070);
            this.lblQuitGame.text = this.text(1102069);
            this.lblLan.text = this.text(1102064);
            this.lblMus.text = this.text(1102062);
            this.lblEff.text = this.text(1102063);
        };
        setting.prototype.onload = function () {
            var _this = this;
            _super.prototype.onload.call(this);
            this.initText();
            this.AddClick(this.btnClose, function () {
                _this.Close();
            }, this);
            var languages = [
                { text: "中文" },
                { text: "英文" },
                { text: "日文" },
                { text: "鸟语" },
                { text: "兽语" },
            ];
            this.svData.initItemRenderer(settingLanguageItemRander);
            this.svData.bindData(languages);
            this.imgSelect.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.svData.visible = !_this.svData.visible;
            }, this);
            this.svData.visible = false;
            // console.log(this.sliderMusic.thumb.source)
            // var slidr = new gameUIControl.Slider()
            // this.addChild(slidr)
        };
        setting.prototype.onSelectLanguage = function (txt) {
            this.txtLang.text = txt;
            this.svData.visible = false;
        };
        return setting;
    }(gameUI.base));
    gameUI.setting = setting;
    __reflect(setting.prototype, "gameUI.setting");
})(gameUI || (gameUI = {}));
//# sourceMappingURL=setting.js.map
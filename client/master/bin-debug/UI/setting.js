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
            _this.skinName = "resource/custom_skins/settingLanguageItem.exml";
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.onload, _this);
            return _this;
        }
        settingLanguageItemRander.prototype.onload = function () {
            var _this = this;
            this.txtLan.text = this.data.text;
            this.txtLan.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                var settingUI = UIManager.Instance.GetChild(UI.setting);
                if (settingUI != null) {
                    settingUI.onSelectLanguage(_this.data.text);
                }
            }, this);
        };
        settingLanguageItemRander.prototype.dataChanged = function () {
            if (this.txtLan != undefined && this.txtLan != null) {
                this.txtLan.text = this.data.text;
            }
        };
        return settingLanguageItemRander;
    }(eui.ItemRenderer));
    __reflect(settingLanguageItemRander.prototype, "settingLanguageItemRander");
    var setting = (function (_super) {
        __extends(setting, _super);
        function setting() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        setting.prototype.onload = function () {
            var _this = this;
            this.AddClick(this.btnClose, function () {
                _this.Close();
            }, this);
            this.svData.visible = false;
            this.svData.initItemRenderer(settingLanguageItemRander);
            this.svData.initItemSkin("resource/custom_skins/settingLanguageItem.exml");
            var languages = [
                { text: "中文" },
                { text: "英文" },
                { text: "日文" },
                { text: "鸟语" },
                { text: "兽语" },
            ];
            this.svData.bindData(languages);
            this.imgSelect.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.svData.visible = !_this.svData.visible;
            }, this);
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
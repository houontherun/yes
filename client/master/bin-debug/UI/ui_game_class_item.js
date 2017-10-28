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
var ui_game_class_item = (function (_super) {
    __extends(ui_game_class_item, _super);
    function ui_game_class_item() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/custom_skins/ui_game_class_item.exml";
        _this.once(eui.UIEvent.COMPLETE, _this.onload, _this);
        return _this;
    }
    ui_game_class_item.prototype.onload = function () {
        this.updateUI();
    };
    ui_game_class_item.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.updateUI();
    };
    ui_game_class_item.prototype.onStateChange = function (selected) {
        if (this.data != null && this.data != undefined) {
            this.btnToggle.selected = selected;
        }
    };
    ui_game_class_item.prototype.updateUI = function () {
        if (this.data != null) {
            if (this.btnToggle != undefined && this.btnToggle != null) {
                this.btnToggle.label = this.data.type_name;
                this.btnToggle.labelDisplay.size = 50;
            }
        }
    };
    ui_game_class_item.prototype.dataChanged = function () {
        this.updateUI();
    };
    return ui_game_class_item;
}(eui.ItemRenderer));
__reflect(ui_game_class_item.prototype, "ui_game_class_item");

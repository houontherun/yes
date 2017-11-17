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
    var Scrollview = (function (_super) {
        __extends(Scrollview, _super);
        function Scrollview() {
            var _this = _super.call(this) || this;
            _this.dataList = null;
            _this.isLoaded = false;
            _this.itemRenderer = null;
            _this.itemSkinName = null;
            _this.skinName = "resource/custom_skins/controls/ScrollviewSkin.exml";
            _this.viewport = _this.dataList;
            _this.once(eui.UIEvent.COMPLETE, _this.onload, _this);
            return _this;
        }
        Scrollview.prototype.onload = function () {
            this.isLoaded = true;
            this.dataList.itemRendererSkinName = this.itemSkinName;
            this.dataList.itemRenderer = this.itemRenderer;
            this.dataList.dataProvider = new eui.ArrayCollection(this.data);
        };
        Scrollview.prototype.initItemSkin = function (itemSkin) {
            this.itemSkinName = itemSkin;
        };
        Scrollview.prototype.initItemRenderer = function (itemRenderer) {
            this.itemRenderer = itemRenderer;
        };
        Scrollview.prototype.bindData = function (data) {
            this.data = data;
            if (this.isLoaded) {
                this.dataList.dataProvider = new eui.ArrayCollection(this.data);
            }
        };
        return Scrollview;
    }(eui.Scroller));
    gameUI.Scrollview = Scrollview;
    __reflect(Scrollview.prototype, "gameUI.Scrollview", ["eui.UIComponent", "egret.DisplayObject"]);
})(gameUI || (gameUI = {}));
//# sourceMappingURL=Scrollview.js.map
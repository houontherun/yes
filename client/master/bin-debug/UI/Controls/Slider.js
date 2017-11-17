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
    var Slider = (function (_super) {
        __extends(Slider, _super);
        function Slider() {
            var _this = _super.call(this) || this;
            _this.bg = null;
            _this.fg = null;
            _this.thumb = null;
            _this.bgSrc = "sliderbg_png";
            _this.fgSrc = "sliderfg_png";
            _this.thumbSrc = "slider_png";
            _this._value = 0;
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.onLoad, _this);
            _this.skinName = "resource/custom_skins/controls/sliderSkin.exml";
            return _this;
        }
        Object.defineProperty(Slider.prototype, "value", {
            get: function () {
                if (this._value < 0)
                    this._value = 0;
                if (this._value > 1)
                    this._value = 1;
                return this._value;
            },
            enumerable: true,
            configurable: true
        });
        Slider.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        Slider.prototype.onLoad = function () {
            var _this = this;
            if (this.thumb != undefined && this.fg != undefined && this.bg != undefined) {
                this.bg.source = this.bgSrc;
                this.fg.source = this.fgSrc;
                this.thumb.source = this.thumbSrc;
                this.bg.addEventListener(egret.TouchEvent.TOUCH_MOVE, function (event) {
                    if (event.touchDown) {
                        if (event.localX > 0 && event.localX < _this.bg.width) {
                            _this.thumb.x = event.localX;
                            _this.fg.width = event.localX;
                            _this._value = event.localX / _this.fg.width;
                        }
                    }
                }, this);
            }
        };
        return Slider;
    }(eui.Component));
    gameUI.Slider = Slider;
    __reflect(Slider.prototype, "gameUI.Slider");
})(gameUI || (gameUI = {}));
//# sourceMappingURL=Slider.js.map
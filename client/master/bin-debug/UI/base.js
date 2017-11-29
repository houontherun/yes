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
    var base = (function (_super) {
        __extends(base, _super);
        function base(uidata, data) {
            var _this = _super.call(this) || this;
            _this.uidata = uidata;
            _this.data = data;
            _this.name = uidata.name;
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.onload, _this);
            _this.skinName = uidata.skin;
            return _this;
        }
        base.prototype.onload = function () {
            console.log("load ui:" + this.uidata.name);
        };
        base.prototype.onUnload = function () {
            console.log("unload ui:" + this.uidata.name);
        };
        base.prototype.Close = function () {
            UIManager.Instance.UnloadUI(this.uidata);
        };
        base.prototype.AddClick = function (img, onClick, thisObject) {
            var scaX = img.scaleX;
            var scaY = img.scaleY;
            img.x += img.width / 2;
            img.y += img.height / 2;
            img.anchorOffsetX = img.width / 2;
            img.anchorOffsetY = img.height / 2;
            img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                img.scaleX = scaX * 0.8;
                img.scaleY = scaY * 0.8;
            }, thisObject);
            img.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                img.scaleX = scaX;
                img.scaleY = scaY;
                onClick();
            }, thisObject);
        };
        Object.defineProperty(base.prototype, "UIData", {
            get: function () {
                return this.uidata;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(base.prototype, "Data", {
            get: function () {
                return this.data;
            },
            enumerable: true,
            configurable: true
        });
        base.prototype.SetImageUrl = function (img, url) {
            var texture = RES.getRes(url);
            if (texture) {
                img.width = texture.textureWidth;
                img.height = texture.textureWidth;
                img.texture = texture;
            }
        };
        return base;
    }(eui.Component));
    gameUI.base = base;
    __reflect(base.prototype, "gameUI.base");
})(gameUI || (gameUI = {}));
//# sourceMappingURL=base.js.map
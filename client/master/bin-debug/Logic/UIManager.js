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
var UIManager = (function (_super) {
    __extends(UIManager, _super);
    function UIManager() {
        var _this = _super.call(this) || this;
        _this.stage = null;
        return _this;
    }
    UIManager.prototype.Init = function (stage) {
        this.stage = stage;
    };
    UIManager.prototype.Unload = function (view) {
        this.stage.removeChild(view);
    };
    UIManager.prototype.LoadHome = function (data) {
        // this.stage.removeChildren();
        var home = new ui_home(data);
        home.horizontalCenter = 0;
        home.verticalCenter = 0;
        this.stage.addChild(home);
    };
    UIManager.prototype.LoadLogin = function () {
        var login = new ui_login();
        login.horizontalCenter = 0;
        login.verticalCenter = 0;
        this.stage.addChild(login);
    };
    UIManager.Instance = new UIManager();
    return UIManager;
}(egret.EventDispatcher));
__reflect(UIManager.prototype, "UIManager");

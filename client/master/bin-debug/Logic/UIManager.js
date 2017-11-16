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
var UI = {
    "login": { name: "gameUI.login", skin: "resource/custom_skins/ui_login.exml" },
    "lobby": { name: "gameUI.lobby", skin: "resource/custom_skins/ui_lobby.exml" },
    "create_room": { name: "gameUI.create_room", skin: "resource/custom_skins/ui_create_room.exml" },
    "enter_room": { name: "gameUI.enter_room", skin: "resource/custom_skins/ui_enter_room.exml" },
};
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
    UIManager.prototype.LoadUI = function (ui, data) {
        if (!egret.hasDefinition(ui.name)) {
            console.error('not found ui name:' + ui.name);
            return;
        }
        var cls = egret.getDefinitionByName(ui.name);
        var view = new cls(ui, data);
        this.stage.addChild(view);
    };
    UIManager.prototype.UnloadUI = function (ui) {
        var child = this.stage.getChildByName(ui.name);
        if (child != null) {
            this.stage.removeChild(child);
        }
    };
    UIManager.Instance = new UIManager();
    return UIManager;
}(egret.EventDispatcher));
__reflect(UIManager.prototype, "UIManager");
//# sourceMappingURL=UIManager.js.map
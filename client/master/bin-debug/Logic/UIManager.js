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
    "login": { name: "gameUI.login", skin: "resource/custom_skins/loginSkin.exml" },
    "lobby": { name: "gameUI.lobby", skin: "resource/custom_skins/lobbySkin.exml" },
    "setting": { name: "gameUI.setting", skin: "resource/custom_skins/settingSkin.exml" },
    "bank": { name: "gameUI.bank", skin: "resource/custom_skins/bankSkin.exml" },
    "rank": { name: "gameUI.rank", skin: "resource/custom_skins/rankSkin.exml" },
    "create_room": { name: "gameUI.create_room", skin: "resource/custom_skins/create_roomSkin.exml" },
    "enter_room": { name: "gameUI.enter_room", skin: "resource/custom_skins/enter_roomSkin.exml" },
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
        // var child = this.stage.getChildByName(ui.name)
        // if(child != null){
        //     child.visible = true
        //     // this.stage.removeChild(child)
        //     // this.stage.addChild(child)
        // }
        // else{
        var cls = egret.getDefinitionByName(ui.name);
        var view = new cls(ui, data);
        this.stage.addChild(view);
        // }
    };
    UIManager.prototype.UnloadUI = function (ui) {
        var child = this.stage.getChildByName(ui.name);
        if (child != null) {
            child = this.stage.removeChild(child);
            child = null;
            // child.visible = false
        }
    };
    UIManager.prototype.GetChild = function (ui) {
        return this.stage.getChildByName(ui.name);
    };
    UIManager.Instance = new UIManager();
    return UIManager;
}(egret.EventDispatcher));
__reflect(UIManager.prototype, "UIManager");
//# sourceMappingURL=UIManager.js.map
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
var ui_home = (function (_super) {
    __extends(ui_home, _super);
    function ui_home(data) {
        var _this = _super.call(this) || this;
        _this.data = data;
        _this.once(eui.UIEvent.COMPLETE, _this.onload, _this);
        _this.skinName = "resource/custom_skins/ui_home.exml";
        return _this;
    }
    ui_home.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    ui_home.prototype.onload = function () {
        // this.listGames.dataProvider = new eui.ArrayCollection(games);
        this.listGames.itemRenderer = ui_game_item;
        this.svGame.horizontalScrollBar = null;
        this.listGameTypes.itemRenderer = ui_game_class_item;
        this.listGameTypes.dataProvider = new eui.ArrayCollection(this.data);
        this.listGameTypes.addEventListener(egret.Event.CHANGE, this.onGameClassChange, this);
        this.svGameType.verticalScrollBar = null;
        this.listGameTypes.selectedIndex = 0;
        this.onGameClassChange(null);
    };
    ui_home.prototype.onGameClassChange = function (evt) {
        var game_data = this.listGameTypes.selectedItem;
        this.listGames.dataProvider = new eui.ArrayCollection(game_data.childs);
        this.listGames.validateNow();
        for (var i = 0; i < this.listGameTypes.numChildren; i++) {
            var item = this.listGameTypes.getChildAt(i);
            if (game_data.type_name == item.data.type_name) {
                item.onStateChange(true);
            }
            else {
                item.onStateChange(false);
            }
        }
    };
    return ui_home;
}(ui_base));
__reflect(ui_home.prototype, "ui_home");

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
    var home = (function (_super) {
        __extends(home, _super);
        function home() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        home.prototype.onload = function () {
            this.listGames.itemRenderer = gameUI.game_item;
            this.svGame.horizontalScrollBar = null;
            this.listGameTypes.itemRenderer = gameUI.game_class_item;
            this.listGameTypes.dataProvider = new eui.ArrayCollection(this.Data);
            this.listGameTypes.addEventListener(egret.Event.CHANGE, this.onGameClassChange, this);
            this.svGameType.verticalScrollBar = null;
            this.listGameTypes.selectedIndex = 0;
            this.onGameClassChange(null);
            this.btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                UIManager.Instance.LoadUI(UI.enter_room);
            }, this);
        };
        home.prototype.onGameClassChange = function (evt) {
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
        return home;
    }(gameUI.base));
    gameUI.home = home;
    __reflect(home.prototype, "gameUI.home");
})(gameUI || (gameUI = {}));
//# sourceMappingURL=home.js.map
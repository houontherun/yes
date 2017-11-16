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
    var lobby = (function (_super) {
        __extends(lobby, _super);
        function lobby() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        lobby.prototype.onload = function () {
            var _this = this;
            this.listGames.itemRenderer = gameUI.game_item;
            this.svGame.horizontalScrollBar = null;
            this.AddClick(this.btnEnter, function () {
                // UIManager.Instance.LoadUI(UI.enter_room)
            }, this);
            this.AddClick(this.btnPuke, function () {
                _this.listGames.dataProvider = new eui.ArrayCollection(_this.Data[0].childs);
                _this.listGames.validateNow();
            }, this);
            this.AddClick(this.btnMajiang, function () {
                _this.listGames.dataProvider = new eui.ArrayCollection(_this.Data[1].childs);
                _this.listGames.validateNow();
            }, this);
            this.AddClick(this.btnQilei, function () {
                _this.listGames.dataProvider = new eui.ArrayCollection(_this.Data[2].childs);
                _this.listGames.validateNow();
            }, this);
            // top menu
            this.AddClick(this.imgMore, function () {
            }, this);
            this.AddClick(this.imgNotice, function () {
            }, this);
            this.AddClick(this.imgActivity, function () {
            }, this);
            this.AddClick(this.imgHelp, function () {
            }, this);
            // bottom menu
            this.AddClick(this.imgBank, function () {
            }, this);
            this.AddClick(this.imgRank, function () {
            }, this);
            this.AddClick(this.imgCommunity, function () {
            }, this);
            this.AddClick(this.imgShare, function () {
            }, this);
            this.AddClick(this.imgShop, function () {
            }, this);
            this.AddClick(this.imgSetting, function () {
            }, this);
            this.listGames.dataProvider = new eui.ArrayCollection(this.Data[0].childs);
            // this.svGame.addEventListener(egret.Event.CHANGE, (event:Event)=>{
            // 	var offsetX = this.listGames.scrollRect.x //最左边是0
            // 	// console.log(this.listGames.numElements)
            // 	// this.updateChildSize(offsetX)
            // }, this)
        };
        return lobby;
    }(gameUI.base));
    gameUI.lobby = lobby;
    __reflect(lobby.prototype, "gameUI.lobby");
})(gameUI || (gameUI = {}));
//# sourceMappingURL=lobby.js.map
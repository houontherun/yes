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
// 游戏大厅主UI
var gameUI;
(function (gameUI) {
    var game_item = (function (_super) {
        __extends(game_item, _super);
        function game_item() {
            var _this = _super.call(this) || this;
            _this.isLoaded = false;
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.onload, _this);
            _this.skinName = "resource/custom_skins/game_itemSkin.exml";
            return _this;
        }
        game_item.prototype.onload = function () {
            this.isLoaded = true;
            this.imgBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.updateUI();
        };
        game_item.prototype.onClick = function () {
            if (this.data.ID == 101) {
                UIManager.Instance.LoadUI(UI.ddzSelectRoom);
            }
            else {
                UIManager.Instance.showNotice("暂未开放功能");
            }
        };
        game_item.prototype.updateUI = function () {
            if (this.data == null || !this.isLoaded)
                return;
            this.txtName.text = this.data.Name1;
        };
        game_item.prototype.dataChanged = function () {
            this.updateUI();
        };
        return game_item;
    }(eui.ItemRenderer));
    __reflect(game_item.prototype, "game_item");
    var lobby = (function (_super) {
        __extends(lobby, _super);
        function lobby() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // private updateChildSize(offsetX:number):void{
            // 	var itemWid = 277
            // 	var itemHei = 355
            // 	var centerX = 277 + offsetX
            // 	for(var i = 0; i < this.listGames.numElements; i++){
            // 		// var i = 3
            // 		var element = this.listGames.getElementAt(i)
            // 		if(element != undefined){
            // 			var x = i * itemWid
            // 			var ox = Math.abs(x - centerX)
            // 			if(ox > 150){ //ox=0的时候正中
            // 				ox = 150
            // 			}
            // 			var scale = 1.5/((ox/300) + 1)
            // 			// console.log(scale)
            // 			// element.height = itemHei * scale
            // 			element.width = itemWid * scale
            // 		}
            // 	}
            // }
            _this.defaultBackground = "background_png";
            return _this;
        }
        lobby.prototype.initText = function () {
            this.lblBank.text = this.text(1102014);
            this.lblRank.text = this.text(1102015);
            this.lblCom.text = this.text(1102016);
            this.lblShare.text = this.text(1102017);
            this.lblShop.text = this.text(1102018);
            this.lblSetting.text = this.text(1102019);
            this.txtCopyId.text = this.text(1102002);
            this.lblHelp.text = this.text(1102003);
            this.lblActivity.text = this.text(1102004);
            this.lblNotify.text = this.text(1102005);
            this.lblMore.text = this.text(1102006);
            this.lblPoke.text = this.text(1102007);
            this.lblMajiang.text = this.text(1102008);
            this.lblQilei.text = this.text(1102010);
        };
        lobby.prototype.onload = function () {
            var _this = this;
            _super.prototype.onload.call(this);
            this.initText();
            var games = DataManager.Instance.getGames();
            this.svGame.initScrollLayout(gameUI.ScrollLayout.Horizontal);
            this.svGame.initItemRenderer(game_item);
            this.svGame.bindData(games[1]);
            this.AddClick(this.btnPuke, function () {
                _this.svGame.bindData(games[1]);
            }, this);
            this.AddClick(this.btnMajiang, function () {
                _this.svGame.bindData(games[2]);
            }, this);
            this.AddClick(this.btnQilei, function () {
                _this.svGame.bindData(games[3]);
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
                UIManager.Instance.LoadUI(UI.bank);
            }, this);
            this.AddClick(this.imgRank, function () {
                UIManager.Instance.LoadUI(UI.rank);
            }, this);
            this.AddClick(this.imgCommunity, function () {
            }, this);
            this.AddClick(this.imgShare, function () {
            }, this);
            this.AddClick(this.imgShop, function () {
                UIManager.Instance.LoadUI(UI.shop);
            }, this);
            this.AddClick(this.imgSetting, function () {
                UIManager.Instance.LoadUI(UI.setting);
            }, this);
            this.AddClick(this.btnEnter, function () {
                UIManager.Instance.LoadUI(UI.enter_room);
            }, this);
            // 个人信息
            this.imgHeadIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                UIManager.Instance.LoadUI(UI.playerInfo);
            }, this);
            this.AddClick(this.imgCoypBg, function () {
            }, this);
            this.imgMsgBg.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                UIManager.Instance.LoadUI(UI.chat);
            }, this);
            // this.svGame.addEventListener(egret.Event.CHANGE, (event:Event)=>{
            // 	var offsetX = this.listGames.scrollRect.x //最左边是0
            // 	// console.log(this.listGames.numElements)
            // 	// this.updateChildSize(offsetX)
            // }, this)
            PlayerManager.Instance.addEventListener(constant.event.logic.on_player_data_update, this.updatePlayerInfo, this);
            this.updatePlayerInfo(PlayerManager.Instance.Data);
            this.imgBg.source = this.defaultBackground;
        };
        lobby.prototype.onUnload = function () {
            _super.prototype.onUnload.call(this);
            PlayerManager.Instance.removeEventListener(constant.event.logic.on_player_data_update, this.updatePlayerInfo, this);
        };
        lobby.prototype.updatePlayerInfo = function (data) {
            this.txtUsrId.text = "ID:" + data.UserId.toString();
            this.txtGoldNum.text = data.Gold.toString();
            this.txtFbNum.text = data.Cardnum.toString();
            this.txtUserName.text = data.Name.toString();
        };
        return lobby;
    }(gameUI.base));
    gameUI.lobby = lobby;
    __reflect(lobby.prototype, "gameUI.lobby");
})(gameUI || (gameUI = {}));
//# sourceMappingURL=lobby.js.map
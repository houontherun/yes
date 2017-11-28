// 游戏大厅主UI
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
var game_config = [
    {
        type_name: "0扑克",
        icon: "default.png",
        childs: [
            {
                id: 100,
                name: "斗地主",
                icon: "resource/assets/bg.png",
                room_group: "aa",
                game_group: "aaa"
            },
            {
                id: 101,
                name: "斗牛",
                icon: "resource/assets/bg.png"
            },
            {
                id: 102,
                name: "炸金花",
                icon: "resource/assets/bg.png"
            },
            {
                id: 103,
                name: "21点",
                icon: "resource/assets/bg.png"
            }
        ]
    },
    {
        type_name: "1麻将",
        icon: "default.png",
        childs: [
            {
                id: 104,
                name: "江西麻将",
                icon: "resource/assets/bg.png"
            },
            {
                id: 105,
                name: "湖南麻将",
                icon: "resource/assets/bg.png"
            },
        ]
    },
    {
        type_name: "2棋类",
        icon: "default.png",
        childs: [
            {
                id: 111,
                name: "2开心消消乐",
                icon: "resource/assets/bg.png"
            }
        ]
    }
];
var gameUI;
(function (gameUI) {
    var game_item = (function (_super) {
        __extends(game_item, _super);
        function game_item() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/custom_skins/game_itemSkin.exml";
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.onload, _this);
            return _this;
        }
        game_item.prototype.onload = function () {
            this.updateUI();
        };
        game_item.prototype.onClick = function () {
            if (this.data.id == 100) {
                UIManager.Instance.LoadUI(UI.ddzSelectRoom);
            }
            else {
                alert("暂未开放功能");
            }
        };
        game_item.prototype.updateUI = function () {
            if (this.imgBg == null || this.imgBg == undefined)
                return;
            this.imgBg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.imgBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
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
            return _super !== null && _super.apply(this, arguments) || this;
        }
        lobby.prototype.onload = function () {
            var _this = this;
            _super.prototype.onload.call(this);
            this.svGame.horizontalScrollBar = null;
            this.listGames.itemRenderer = game_item;
            this.listGames.dataProvider = new eui.ArrayCollection(game_config[0].childs);
            this.AddClick(this.btnPuke, function () {
                _this.listGames.dataProvider = new eui.ArrayCollection(game_config[0].childs);
                _this.listGames.validateNow();
            }, this);
            this.AddClick(this.btnMajiang, function () {
                _this.listGames.dataProvider = new eui.ArrayCollection(game_config[1].childs);
                _this.listGames.validateNow();
            }, this);
            this.AddClick(this.btnQilei, function () {
                _this.listGames.dataProvider = new eui.ArrayCollection(game_config[2].childs);
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
                // this.imgShop.source = "logout_png" 
            }, this);
            this.AddClick(this.imgSetting, function () {
                UIManager.Instance.LoadUI(UI.setting);
            }, this);
            this.AddClick(this.btnEnter, function () {
                UIManager.Instance.LoadUI(UI.enter_room);
            }, this);
            // 个人信息
            this.imgHeadIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            }, this);
            this.AddClick(this.imgCoypBg, function () {
                var aa = {
                    a: 1,
                    b: 2,
                    c: 3
                };
                for (var key in aa) {
                    console.log('key:' + key + ' v:' + aa[key]);
                }
            }, this);
            // this.svGame.addEventListener(egret.Event.CHANGE, (event:Event)=>{
            // 	var offsetX = this.listGames.scrollRect.x //最左边是0
            // 	// console.log(this.listGames.numElements)
            // 	// this.updateChildSize(offsetX)
            // }, this)
            PlayerManager.Instance.addEventListener(constant.event.logic.on_player_data_update, this.updatePlayerInfo, this);
            this.updatePlayerInfo(PlayerManager.Instance.Data);
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
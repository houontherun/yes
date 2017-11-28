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
    var rankItemRander = (function (_super) {
        __extends(rankItemRander, _super);
        function rankItemRander() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/custom_skins/rankItemSkin.exml";
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.onload, _this);
            return _this;
        }
        rankItemRander.prototype.onload = function () {
            this.updateUI();
        };
        rankItemRander.prototype.updateUI = function () {
            if (this.data.rank == 0) {
                this.imgIndex.source = "rank_1_png";
                this.imgBg.source = "rank_bg2_png";
                this.txtIndex.visible = false;
            }
            else if (this.data.rank == 1) {
                this.imgIndex.source = "rank_2_png";
                this.imgBg.source = "rank_bg3_png";
                this.txtIndex.visible = false;
            }
            else if (this.data.rank == 2) {
                this.imgIndex.source = "rank_3_png";
                this.imgBg.source = "rank_bg4_png";
                this.txtIndex.visible = false;
            }
            else {
                this.imgIndex.source = "rank_index_png";
                this.imgBg.source = "rank_bg4_png";
                this.txtIndex.visible = true;
            }
            this.txtName.text = this.data.name.toString();
            this.txtValue.text = this.data.score.toString();
            this.txtIndex.text = (this.data.rank + 1).toString();
        };
        rankItemRander.prototype.dataChanged = function () {
            if (this.imgBg != undefined && this.imgBg != null) {
                this.updateUI();
            }
        };
        return rankItemRander;
    }(eui.ItemRenderer));
    __reflect(rankItemRander.prototype, "rankItemRander");
    var selectSprite = "rank_tab_png";
    var unSelectSprite = "rank_tab2_png";
    var selectColor = 0xf2941a;
    var unSelectColor = 0x775022;
    var rank = (function (_super) {
        __extends(rank, _super);
        function rank() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.currentTabIndex = -1;
            return _this;
        }
        rank.prototype.onload = function () {
            var _this = this;
            _super.prototype.onload.call(this);
            this.AddClick(this.btnClose, function () {
                _this.Close();
            }, this);
            this.tabBtns = [this.btnGold, this.btnCredit, this.btnCharm];
            this.tabText = [this.lblGold, this.lblCredit, this.lblCharm];
            // this.svData.initItemRenderer(rankItemRander)
            // this.svData.initItemSkin("resource/custom_skins/rankItemSkin.exml")
            this.dataList.itemRenderer = rankItemRander;
            this.dataList.itemRendererSkinName = "resource/custom_skins/rankItemSkin.exml";
            MessageManager.Instance.addEventListener(constant.msg.SC_GET_RANK, this.onGetRankList, this);
            this.btnGold.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.loadTab(0);
                _this.getRankList(0, 1);
            }, this);
            this.btnCredit.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.loadTab(1);
                _this.getRankList(0, 2);
            }, this);
            this.loadTab(0);
            this.getRankList(0, 1);
        };
        rank.prototype.onUnload = function () {
            _super.prototype.onUnload.call(this);
            MessageManager.Instance.removeEventListener(constant.msg.SC_GET_RANK, this.onGetRankList, this);
        };
        rank.prototype.loadTab = function (index) {
            if (this.currentTabIndex == index) {
                return;
            }
            this.currentTabIndex = index;
            for (var i = 0; i < 3; i++) {
                if (i == this.currentTabIndex) {
                    this.tabBtns[i].source = selectSprite;
                    this.tabText[i].textColor = selectColor;
                }
                else {
                    this.tabBtns[i].source = unSelectSprite;
                    this.tabText[i].textColor = unSelectColor;
                }
            }
        };
        // 获取操行榜  1是金币排行榜，2是信用排行榜
        rank.prototype.getRankList = function (begin, type) {
            MessageManager.Instance.SendMessage({
                protocol: constant.msg.CS_GET_RANK,
                begin: begin,
                type: type
            });
        };
        rank.prototype.onGetRankList = function (data) {
            // if(data.ret == 0){ 
            this.dataList.dataProvider = new eui.ArrayCollection(data.rank);
            if (data.type == 1) {
                this.txtScore.text = "金币";
            }
            else if (data.type == 2) {
                this.txtScore.text = "信用";
            }
            // }
        };
        return rank;
    }(gameUI.base));
    gameUI.rank = rank;
    __reflect(rank.prototype, "gameUI.rank");
})(gameUI || (gameUI = {}));
//# sourceMappingURL=rank.js.map
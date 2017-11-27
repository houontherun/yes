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
            _this.skinName = "resource/custom_skins/bankOperItemSkin.exml";
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.onload, _this);
            return _this;
        }
        rankItemRander.prototype.onload = function () {
            this.updateUI();
        };
        rankItemRander.prototype.updateUI = function () {
        };
        rankItemRander.prototype.dataChanged = function () {
            if (this.imgBg != undefined && this.imgBg != null) {
                this.updateUI();
            }
        };
        return rankItemRander;
    }(eui.ItemRenderer));
    __reflect(rankItemRander.prototype, "rankItemRander");
    var selectSprite = "bank_tab_png";
    var unSelectSprite = "bank_tab2_png";
    var selectColor = 0xf2941a;
    var unSelectColor = 0x775022;
    var bank = (function (_super) {
        __extends(bank, _super);
        function bank() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.currentTabIndex = -1;
            return _this;
        }
        bank.prototype.onload = function () {
            var _this = this;
            _super.prototype.onload.call(this);
            this.AddClick(this.btnClose, function () {
                _this.Close();
            }, this);
            this.imgTabGS.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.loadTab(0);
            }, this);
            this.imgTabGive.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.loadTab(1);
            }, this);
            this.imgTabRecord.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.loadTab(2);
            }, this);
            this.tabBtns = [this.imgTabGS, this.imgTabGive, this.imgTabRecord];
            this.tabText = [this.txtTabGS, this.txtTabGive, this.txtTabRecord];
            this.tabGroup = [this.groupGS, this.groupGive, this.groupRecord];
            this.loadTab(0);
            // bind oper data
            this.dataList.itemRenderer = rankItemRander;
            this.dataList.itemRendererSkinName = "resource/custom_skins/bankOperItemSkin.exml";
            var rankData = [
                { index: 1, name: "张三", value: 50000 },
                { index: 2, name: "李四", value: 40000 },
            ];
            this.dataList.dataProvider = new eui.ArrayCollection(rankData);
            PlayerManager.Instance.addEventListener(constant.event.logic.on_player_data_update, this.updateUI, this);
            this.updateUI(PlayerManager.Instance.Data);
        };
        bank.prototype.updateUI = function (data) {
            this.txtCurrent.text = Util.formatNum(data.Gold);
            this.txtTotel.text = Util.formatNum(data.BankGold.toString());
        };
        bank.prototype.loadTab = function (index) {
            if (this.currentTabIndex == index) {
                return;
            }
            this.currentTabIndex = index;
            for (var i = 0; i < 3; i++) {
                if (i == this.currentTabIndex) {
                    this.tabBtns[i].source = selectSprite;
                    this.tabText[i].textColor = selectColor;
                    this.tabGroup[i].visible = true;
                }
                else {
                    this.tabBtns[i].source = unSelectSprite;
                    this.tabText[i].textColor = unSelectColor;
                    this.tabGroup[i].visible = false;
                }
            }
        };
        return bank;
    }(gameUI.base));
    gameUI.bank = bank;
    __reflect(bank.prototype, "gameUI.bank");
})(gameUI || (gameUI = {}));
//# sourceMappingURL=bank.js.map
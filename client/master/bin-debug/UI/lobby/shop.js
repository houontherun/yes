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
    var shopItemRander = (function (_super) {
        __extends(shopItemRander, _super);
        function shopItemRander() {
            var _this = _super.call(this) || this;
            _this.isLoaded = false;
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.onload, _this);
            _this.skinName = "resource/custom_skins/shopItemSkin.exml";
            return _this;
        }
        shopItemRander.prototype.getImg = function (itemId) {
            var src = 'jinbi2_png';
            switch (itemId) {
                case 1001:
                    src = 'jinbi2_png';
                    break;
                case 1002:
                    src = 'fangka2_png';
                    break;
                case 4001:
                    src = 'jipaiqi_png';
                    break;
                case 4002:
                    src = 'shopexp_png';
                    break;
                case 4003:
                    src = 'jipaiqi_png';
                    break;
                case 4004:
                    src = 'shopexp_png';
                    break;
            }
            return src;
        };
        shopItemRander.prototype.onload = function () {
            var _this = this;
            this.isLoaded = true;
            this.updateUI();
            this.btnSelect.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (_this.data instanceof ChargeData) {
                    PlayerManager.Instance.Charge(_this.data.rmb);
                }
                else if (_this.data instanceof ShopData) {
                    PlayerManager.Instance.BuyItem(_this.data.id);
                }
            }, this);
        };
        shopItemRander.prototype.updateUI = function () {
            if (!this.isLoaded || this.data == null) {
                return;
            }
            if (this.data instanceof ChargeData) {
                this.txtTitle.text = this.data.num.toString();
                this.txtNum.text = this.data.rmb.toString() + Util.uiText(1102060);
                this.txtPresent.text = "额外赠送" + this.data.giveNum + this.data.giveItem.name;
                this.lblHot.text = "限时";
                this.imgItem.source = this.getImg(this.data.item.id);
            }
            else if (this.data instanceof ShopData) {
                this.txtTitle.text = this.data.item.name;
                this.txtNum.text = this.data.item.price.toString();
                this.txtPresent.text = '';
                this.lblHot.text = "热卖";
                this.imgItem.source = this.getImg(this.data.item.id);
            }
        };
        shopItemRander.prototype.dataChanged = function () {
            this.updateUI();
        };
        return shopItemRander;
    }(eui.ItemRenderer));
    __reflect(shopItemRander.prototype, "shopItemRander");
    var selectSprite = "shopbtnTab_png";
    var unSelectSprite = "goumaidaoju_png";
    var selectColor = 0xf2941a;
    var unSelectColor = 0x775022;
    var shop = (function (_super) {
        __extends(shop, _super);
        function shop() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.currentTabIndex = -1;
            _this.chargeDatas = [];
            _this.shopDatas = [];
            return _this;
        }
        shop.prototype.initText = function () {
            this.lblbuy.text = this.text(1102061);
            this.lblCgarge.text = this.text(1102059);
            this.txtTitle.text = this.text(1102058);
        };
        shop.prototype.onload = function () {
            var _this = this;
            _super.prototype.onload.call(this);
            this.initText();
            this.AddClick(this.btnClose, function () {
                _this.Close();
            }, this);
            this.tabBtns = [this.btnCharge, this.btnBuy];
            this.tabText = [this.lblCgarge, this.lblbuy];
            //init ui
            this.dataList.itemRenderer = shopItemRander;
            this.listView.viewport = this.dataList;
            var layout = new eui.TileLayout();
            layout.columnWidth = 210;
            layout.rowHeight = 260;
            this.dataList.layout = layout;
            layout.requestedColumnCount = 4;
            var items = DataManager.Instance.getJsonData("items");
            this.chargeDatas = [];
            for (var k in items.Recharge) {
                var chargeData = new ChargeData(items.Recharge[k]);
                this.chargeDatas.push(chargeData);
            }
            this.shopDatas = [];
            for (var k in items.Shop) {
                var shopData = new ShopData(items.Shop[k]);
                this.shopDatas.push(shopData);
            }
            this.btnCharge.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.loadTab(0);
                _this.loadData(_this.chargeDatas);
            }, this);
            this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.loadTab(1);
                _this.loadData(_this.shopDatas);
            }, this);
            this.loadTab(0);
            this.loadData(this.chargeDatas);
        };
        shop.prototype.onUnload = function () {
            _super.prototype.onUnload.call(this);
        };
        shop.prototype.loadData = function (data) {
            this.dataList.dataProvider = new eui.ArrayCollection(data);
            this.listView.horizontalScrollBar = null;
            this.listView.verticalScrollBar = null;
        };
        shop.prototype.loadTab = function (index) {
            if (this.currentTabIndex == index) {
                return;
            }
            this.currentTabIndex = index;
            for (var i = 0; i < 2; i++) {
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
        return shop;
    }(gameUI.base));
    gameUI.shop = shop;
    __reflect(shop.prototype, "gameUI.shop");
})(gameUI || (gameUI = {}));
//# sourceMappingURL=shop.js.map
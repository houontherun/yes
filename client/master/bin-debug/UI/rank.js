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
            this.isLoaded = true;
            this.updateUI();
        };
        rankItemRander.prototype.updateUI = function () {
            if (this.data.index == 1) {
                this.imgIndex.source = "rank_1_png";
                this.imgBg.source = "rank_bg2_png";
                this.txtIndex.visible = false;
            }
            else if (this.data.index == 2) {
                this.imgIndex.source = "rank_2_png";
                this.imgBg.source = "rank_bg3_png";
                this.txtIndex.visible = false;
            }
            else if (this.data.index == 3) {
                this.imgIndex.source = "rank_3_png";
                this.imgBg.source = "rank_bg4_png";
                this.txtIndex.visible = false;
            }
            else {
                this.imgIndex.source = "rank_index_png";
                this.imgBg.source = "rank_bg4_png";
                this.txtIndex.visible = true;
            }
            this.txtName.text = this.data.name;
            this.txtValue.text = this.data.value;
            this.txtIndex.text = this.data.index;
        };
        rankItemRander.prototype.dataChanged = function () {
            if (this.isLoaded) {
                this.updateUI();
            }
        };
        return rankItemRander;
    }(eui.ItemRenderer));
    __reflect(rankItemRander.prototype, "rankItemRander");
    var rank = (function (_super) {
        __extends(rank, _super);
        function rank() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        rank.prototype.onload = function () {
            var _this = this;
            this.AddClick(this.btnClose, function () {
                _this.Close();
            }, this);
            this.svData.initItemRenderer(rankItemRander);
            this.svData.initItemSkin("resource/custom_skins/rankItemSkin.exml");
            var rankData = [
                { index: 1, name: "张三", value: 50000 },
                { index: 2, name: "李四", value: 40000 },
                { index: 3, name: "王五", value: 30000 },
                { index: 4, name: "老六", value: 20000 },
                { index: 5, name: "三本地", value: 10000 },
                { index: 6, name: "枯霜地有", value: 9000 },
                { index: 7, name: "支付宝", value: 5000 },
                { index: 8, name: "钱我残", value: 4000 },
                { index: 9, name: "工工工", value: 3000 },
                { index: 10, name: "顶替", value: 2000 },
                { index: 11, name: "于地", value: 1000 },
                { index: 12, name: "擤", value: 400 },
                { index: 13, name: "夺一的", value: 300 },
            ];
            this.svData.bindData(rankData);
        };
        return rank;
    }(gameUI.base));
    gameUI.rank = rank;
    __reflect(rank.prototype, "gameUI.rank");
})(gameUI || (gameUI = {}));
//# sourceMappingURL=rank.js.map
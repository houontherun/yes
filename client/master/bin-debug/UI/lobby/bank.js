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
            _this.isLoaded = false;
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.onload, _this);
            _this.skinName = "resource/custom_skins/bankOperItemSkin.exml";
            return _this;
        }
        rankItemRander.prototype.onload = function () {
            this.isLoaded = true;
            this.updateUI();
        };
        rankItemRander.prototype.updateUI = function () {
            //{guid, ruid, t, gold, id}
            if (this.data == null || !this.isLoaded)
                return;
            this.txtDate.text = this.data.t.toString();
            this.txtSendId.text = this.data.guid.toString();
            this.txtRecvId.text = this.data.ruid.toString();
            this.txtNumber.text = this.data.gold.toString();
        };
        rankItemRander.prototype.dataChanged = function () {
            this.updateUI();
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
        bank.prototype.setGiveNum = function (num) {
            if (PlayerManager.Instance.Data.Gold >= num) {
                this.txtGiveNum.text = num.toString();
            }
            else {
                UIManager.Instance.showNotice("金币不够");
            }
        };
        bank.prototype.initText = function () {
            this.txtTitle.text = this.text(1102014);
            this.txtTabGS.text = this.text(1102031);
            this.txtTabGive.text = this.text(1102036);
            this.txtTabRecord.text = this.text(1102045);
            this.lblInOUtNum.text = this.text(1102032);
            this.lblBankPwd.text = this.text(1102033);
            this.txtInNum.prompt = this.text('存入不需要输入密码');
            this.txtGSBankPwd.prompt = this.text('默认密码123456');
            this.lblGiveId.text = this.text(1102037);
            this.txtBankPwd.prompt = this.text('默认密码123456');
            this.lblBankPwd2.text = this.text(1102033);
            this.lblGiveNum.text = this.text(1102038);
            this.lblTenW.text = this.text(1102039);
            this.lblOneQW.text = this.text(1102042);
            this.lblFiveBW.text = this.text(1102041);
            this.lblOneBaiW.text = this.text(1102040);
            this.lblOneYi.text = this.text(1102043);
            this.lblGiveOk.text = this.text(1102044);
            this.lblDate.text = this.text(1102046);
            this.lblGiveNum2.text = this.text(1102014);
            this.lblSendId.text = this.text(1102047);
            this.lblRecvId.text = this.text(1102048);
            this.lblRemke.text = this.text(1102050);
            this.lblIn.text = this.text(1102034);
            this.lblOut.text = this.text(1102035);
            this.lblNoRecords.text = this.text('暂无记录');
        };
        bank.prototype.onload = function () {
            var _this = this;
            _super.prototype.onload.call(this);
            this.initText();
            this.AddClick(this.imgIn, function () {
                var num = parseInt(_this.txtInNum.text);
                PlayerManager.Instance.SaveGold(num);
            }, this);
            this.AddClick(this.imgOut, function () {
                var num = parseInt(_this.txtInNum.text);
                PlayerManager.Instance.WithdrawGold(num);
            }, this);
            this.AddClick(this.imgGiveOK, function () {
                if (_this.txtGiveId.text == null || _this.txtGiveId.text == "" || _this.txtGiveNum.text == null || _this.txtGiveNum.text == "") {
                    UIManager.Instance.showNotice("请填写ID或金额");
                    return;
                }
                var id = parseInt(_this.txtGiveId.text);
                var num = parseInt(_this.txtGiveNum.text);
                PlayerManager.Instance.GiveGold(num, id);
            }, this);
            this.AddClick(this.imgTenW, function () { _this.setGiveNum(100000); }, this);
            this.AddClick(this.imgOneQW, function () { _this.setGiveNum(10000000); }, this);
            this.AddClick(this.imgTenFiveBW, function () { _this.setGiveNum(5000000); }, this);
            this.AddClick(this.imgOneBaiW, function () { _this.setGiveNum(1000000); }, this);
            this.AddClick(this.imgOneYi, function () { _this.setGiveNum(100000000); }, this);
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
            this.svRecords.initItemRenderer(rankItemRander); //list []{guid, ruid, t, gold, id}
            this.svRecords.initItemSkin("resource/custom_skins/bankOperItemSkin.exml");
            PlayerManager.Instance.addEventListener(constant.event.logic.on_player_data_update, this.updateUI, this);
            this.updateUI(PlayerManager.Instance.Data);
            MessageManager.Instance.addEventListener(constant.msg.SC_GET_BANK_RECORD, this.onGetBankRecord, this);
            this.getBankRecord(0);
        };
        bank.prototype.onUnload = function () {
            _super.prototype.onUnload.call(this);
            MessageManager.Instance.removeEventListener(constant.msg.SC_GET_BANK_RECORD, this.onGetBankRecord, this);
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
        bank.prototype.getBankRecord = function (begin) {
            MessageManager.Instance.SendMessage({
                protocol: constant.msg.CS_GET_BANK_RECORD,
                begin: begin,
            });
        };
        bank.prototype.onGetBankRecord = function (data) {
            if (data.ret == 0) {
                if (data.list.length > 0) {
                    this.svRecords.bindData(data.list); //list []{guid, ruid, t, gold, id}
                    this.lblNoRecords.visible = false;
                }
                else {
                    this.lblNoRecords.visible = true;
                }
            }
        };
        return bank;
    }(gameUI.base));
    gameUI.bank = bank;
    __reflect(bank.prototype, "gameUI.bank");
})(gameUI || (gameUI = {}));
//# sourceMappingURL=bank.js.map
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
    var playerInfo = (function (_super) {
        __extends(playerInfo, _super);
        function playerInfo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        playerInfo.prototype.initText = function () {
            this.txtTitle.text = this.text(1102021);
            this.lblLevel.text = this.text('等级');
            this.lblUsername.text = this.text(1102022);
            this.lblGameId.text = this.text(1102023);
            this.txtModifyLoginPwd.text = this.text(1102026);
            this.txtModifyBankPwd.text = this.text(1102027);
            this.txtModifyUsername.text = this.text(1102024);
            this.txtModifyHead.text = this.text(1102024);
        };
        playerInfo.prototype.onload = function () {
            var _this = this;
            _super.prototype.onload.call(this);
            this.initText();
            this.AddClick(this.btnClose, function () {
                _this.Close();
            }, this);
            this.txtGameId.text = PlayerManager.Instance.Data.UserId.toString();
            this.txtUsername.text = PlayerManager.Instance.Data.Name;
            this.txtLevel.text = '0' + "级";
        };
        return playerInfo;
    }(gameUI.base));
    gameUI.playerInfo = playerInfo;
    __reflect(playerInfo.prototype, "gameUI.playerInfo");
})(gameUI || (gameUI = {}));
//# sourceMappingURL=playerInfo.js.map
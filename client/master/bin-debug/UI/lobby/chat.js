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
    var chatItemRander = (function (_super) {
        __extends(chatItemRander, _super);
        function chatItemRander() {
            var _this = _super.call(this) || this;
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.onload, _this);
            // this.skinName = "resource/custom_skins/chatItemSkin.exml";
            _this.isLoaded = false;
            return _this;
        }
        chatItemRander.prototype.onload = function () {
            this.isLoaded = true;
            this.updateUI();
        };
        chatItemRander.prototype.updateUI = function () {
            if (!this.isLoaded || this.data == null) {
                return;
            }
            if (this.data.uid == PlayerManager.Instance.Data.UserId) {
                this.leftGroup.visible = false;
                this.rightGroup.visible = true;
                this.txtNameR.text = this.data.name;
                this.txtContentR.text = this.data.content;
                this.imgContentBgR.width = this.txtContentR.width + 20;
            }
            else {
                this.leftGroup.visible = true;
                this.rightGroup.visible = false;
                this.txtNameL.text = this.data.name;
                this.txtContentL.text = this.data.content;
                this.imgContentBgL.width = this.txtContentL.width + 20;
            }
        };
        chatItemRander.prototype.dataChanged = function () {
            this.updateUI();
        };
        return chatItemRander;
    }(eui.ItemRenderer));
    __reflect(chatItemRander.prototype, "chatItemRander");
    var chat = (function (_super) {
        __extends(chat, _super);
        function chat() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        chat.prototype.initText = function () {
            this.txtInput.prompt = this.text(1102029);
            this.lblSend.text = this.text(1102030);
            this.txtTitle.text = this.text(1102028);
        };
        chat.prototype.onload = function () {
            var _this = this;
            _super.prototype.onload.call(this);
            this.initText();
            this.AddClick(this.btnClose, function () {
                _this.Close();
            }, this);
            this.svData.initItemRenderer(chatItemRander);
            this.svData.initItemSkin("resource/custom_skins/chatItemSkin.exml");
            this.svData.bindData(ChatManager.Instance.Messages);
            this.setScroll();
            this.btnSend.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (_this.txtInput.text.trim().length > 0) {
                    ChatManager.Instance.sendMsg(_this.txtInput.text);
                }
            }, this);
            ChatManager.Instance.addEventListener(constant.event.logic.on_new_chat_data, this.onNewChat, this);
        };
        chat.prototype.onUnload = function () {
            _super.prototype.onUnload.call(this);
            ChatManager.Instance.removeEventListener(constant.event.logic.on_new_chat_data, this.onNewChat, this);
        };
        chat.prototype.setScroll = function () {
            var v = this.svData.Scroller.viewport.contentHeight - this.svData.Scroller.viewport.height;
            if (v > -115) {
                this.svData.Scroller.validateNow();
                this.svData.Scroller.viewport.scrollV = this.svData.Scroller.viewport.contentHeight - this.svData.Scroller.viewport.height;
            }
        };
        chat.prototype.onNewChat = function (data) {
            this.svData.bindData(ChatManager.Instance.Messages);
            this.setScroll();
        };
        return chat;
    }(gameUI.base));
    gameUI.chat = chat;
    __reflect(chat.prototype, "gameUI.chat");
})(gameUI || (gameUI = {}));
//# sourceMappingURL=chat.js.map
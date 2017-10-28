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
var MessageManager = (function (_super) {
    __extends(MessageManager, _super);
    function MessageManager() {
        return _super.call(this) || this;
    }
    MessageManager.prototype.DispatchMessage = function (data) {
        var msg = data.c;
        if (msg != null) {
            this.dispatchEventWith(msg, false, data);
        }
    };
    MessageManager.prototype.SendMessage = function (data) {
        NetworkManager.Instance.Send(data);
    };
    MessageManager.Instance = new MessageManager();
    return MessageManager;
}(egret.EventDispatcher));
__reflect(MessageManager.prototype, "MessageManager");

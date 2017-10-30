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
var NetworkManager = (function (_super) {
    __extends(NetworkManager, _super);
    function NetworkManager() {
        var _this = _super.call(this) || this;
        _this.initWebSocket();
        return _this;
    }
    Object.defineProperty(NetworkManager.prototype, "IP", {
        get: function () {
            return this.ip;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NetworkManager.prototype, "PORT", {
        get: function () {
            return this.port;
        },
        enumerable: true,
        configurable: true
    });
    NetworkManager.prototype.initWebSocket = function () {
        this.socket = new egret.WebSocket();
        this.socket.type = egret.WebSocket.TYPE_BINARY;
        this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this.socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
    };
    NetworkManager.prototype.onSocketOpen = function () {
        console.log("连接成功 ip=" + this.ip + " port=" + this.port.toString());
        this.dispatchEventWith(constant.event.network.on_connect_succeed);
    };
    NetworkManager.prototype.onSocketClose = function () {
        console.log("WebSocketClose");
        this.dispatchEventWith(constant.event.network.on_connect_close);
    };
    NetworkManager.prototype.onSocketError = function () {
        console.log("WebSocketError");
        this.dispatchEventWith(constant.event.network.on_socket_error);
    };
    NetworkManager.prototype.onReceiveMessage = function (e) {
        var byte = new egret.ByteArray();
        this.socket.readBytes(byte);
        var msg = byte.readUTFBytes(byte.length);
        console.log(">>>> " + msg);
        var data = JSON.parse(msg);
        MessageManager.Instance.DispatchMessage(data);
    };
    NetworkManager.prototype.Connect = function (ip, port) {
        this.ip = ip;
        this.port = port;
        this.socket.connect(this.ip, this.port);
    };
    NetworkManager.prototype.Send = function (jsondata) {
        var datastr = JSON.stringify(jsondata);
        var byte = new egret.ByteArray();
        byte.writeUTF(datastr);
        byte.position = 0;
        this.socket.writeBytes(byte, 2, byte.bytesAvailable);
        console.log("<<<< " + datastr);
    };
    NetworkManager.Instance = new NetworkManager();
    return NetworkManager;
}(egret.EventDispatcher));
__reflect(NetworkManager.prototype, "NetworkManager");
//# sourceMappingURL=NetworkManager.js.map
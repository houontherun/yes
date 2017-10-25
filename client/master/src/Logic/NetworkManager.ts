// TypeScript file

class NetworkManager extends egret.EventDispatcher {
    public static Instance : NetworkManager = new NetworkManager();
    constructor() {
        super();
        this.initWebSocket();
    }    

    private ip:string;
    public get IP(){
        return this.ip;
    }

    private port:number;
    public get PORT(){
        return this.port;
    }

    private socket:egret.WebSocket;

    private initWebSocket():void {
        this.socket = new egret.WebSocket();
        this.socket.type = egret.WebSocket.TYPE_BINARY;
        this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this.socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
    }
    private onSocketOpen():void {
        console.log("连接成功 ip=" + this.ip + " port=" + this.port.toString())
        this.dispatchEventWith(constant.event.network.on_connect_succeed);
    }

    private onSocketClose():void {
        console.log("WebSocketClose");
        this.dispatchEventWith(constant.event.network.on_connect_close);
    }

    private onSocketError():void {
        console.log("WebSocketError");
        this.dispatchEventWith(constant.event.network.on_socket_error);
    }
    private onReceiveMessage(e:egret.Event):void {
        var byte:egret.ByteArray = new egret.ByteArray();        
        this.socket.readBytes(byte);
        var msg:string = byte.readUTFBytes(byte.length);        
        console.log(">>>> " + msg);
        var data = JSON.parse(msg);
        MessageManager.Instance.DispatchMessage(data)
    }
    public Connect(ip:string, port:number):void{
        this.ip = ip;
        this.port = port;

        this.socket.connect(this.ip, this.port)
    }
    public Send(jsondata):void{
        var datastr = JSON.stringify(jsondata)        
        var byte:egret.ByteArray = new egret.ByteArray();
        byte.writeUTF(datastr);
        byte.position = 0;
        this.socket.writeBytes(byte, 2, byte.bytesAvailable);
        console.log("<<<< " + datastr);
    }
}
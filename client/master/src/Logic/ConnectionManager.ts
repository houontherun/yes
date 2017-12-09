// TypeScript file



class ConnectionManager extends Dispatcher {
    public static Instance : ConnectionManager = new ConnectionManager();
    constructor() {
        super();
    }

    public get isConnected():boolean{
        return NetworkManager.Instance.isConnected
    }

    private onSucceedCallback:Function
    private thisObj:any

    public connect(ip:string, port:number, onConSucceed:Function, thisObj:any):void{
        this.onSucceedCallback = onConSucceed
        this.thisObj = thisObj
        NetworkManager.Instance.addEventListener(constant.event.network.on_connect_succeed, this.onConSucceed, this);
        NetworkManager.Instance.Connect(ip, port)
    }
    private onConSucceed(data):void{
        NetworkManager.Instance.removeEventListener(constant.event.network.on_connect_succeed, this.onConSucceed, this)
        this.onSucceedCallback.call(this.thisObj, data)
    }
}
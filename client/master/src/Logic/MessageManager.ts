// TypeScript file


class MessageManager extends egret.EventDispatcher {
    public static Instance : MessageManager = new MessageManager();
    constructor() {
        super();
    }    

    public DispatchMessage(data):void{
        var msg = data.c
        if (msg != null){
            this.dispatchEventWith(msg, false, data)
        }
    }

    public SendMessage(data):void{
        NetworkManager.Instance.Send(data);
    }
}
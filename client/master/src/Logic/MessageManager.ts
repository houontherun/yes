// TypeScript file


class MessageManager extends Dispatcher {
    public static Instance : MessageManager = new MessageManager();
    constructor() {
        super();
    }    

    
    public DispatchMessage(data):void{
        var msg = data.protocol
        if (msg != null){
            this.dispatchEvent(msg, data)
        }
    }

    public SendMessage(data):void{
        NetworkManager.Instance.Send(data);
    }
}
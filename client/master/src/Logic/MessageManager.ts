// TypeScript file


class MessageManager extends Dispatcher {
    public static Instance : MessageManager = new MessageManager();

    private subDispatcher:Dispatcher
    constructor() {
        super();

        this.subDispatcher = new Dispatcher()
    }

    public addSubEventListener(eventID: any, callback: Function, thisObj: any): void {
        this.subDispatcher.addEventListener(eventID, callback, thisObj)
    }

    public hasSubEventListener(eventID: any, callback: Function, thisObj: any): boolean {
        return this.subDispatcher.hasEventListener(eventID, callback, thisObj)
    }

    public removeSubEventListener(eventID: any, callback: Function, thisObj: any): void {
        this.subDispatcher.removeEventListener(eventID, callback, thisObj)
    }

    public removeSubEventListenerByTarget(thisObj: any): void {
        this.subDispatcher.removeEventListenerByTarget(thisObj)
    }
    
    public DispatchMessage(data):void{
        var msg = data.protocol
        if (msg != null){
            if(msg == constant.msg.SC_CHILD_GAME_MESSAGE){
                this.subDispatcher.dispatchEvent(msg, data)
            }else{
                this.dispatchEvent(msg, data)
            }
        }
    }
    public SendSubMessage(data):void{
        data.protocol = constant.msg.CS_CHILD_GAME_MESSAGE
        NetworkManager.Instance.Send(data);
    }

    public SendMessage(data):void{
        NetworkManager.Instance.Send(data);
    }
}
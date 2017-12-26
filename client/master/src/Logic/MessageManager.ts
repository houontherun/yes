// TypeScript file


class MessageManager extends Dispatcher {
    public static Instance : MessageManager = new MessageManager();

    private timer:egret.Timer
    private sendingList = [] // 已经发出还没有收到回复的消息

    private subDispatcher:Dispatcher
    constructor() {
        super();

        this.subDispatcher = new Dispatcher()

        this.timer = new egret.Timer(500, 0)
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.heart, this);
        this.timer.start()
    }

    private heart(){
        var n = this.now()
        var isShowWait = false
        for(var i = this.sendingList.length - 1; i >= 0; i--){
            if(this.sendingList[i].is_get_ret){
                this.sendingList.splice(i, 1)
            }else{
                var d = n - this.sendingList[i].send_time
                if(d > 1000){
                    isShowWait = true
                    console.log('send ' + this.sendingList[i].protocol +  ' wait ' + this.sendingList[i].ret_protocol)
                    break
                }
            }
        }
        if(isShowWait)
            UIManager.Instance.showWait()
        else
            UIManager.Instance.hideWait()
    }
    private now():any{
        return new Date()
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
        for(var i = this.sendingList.length - 1; i >= 0; i--){
            if(this.sendingList[i].ret_protocol == data.protocol){
                this.sendingList[i].is_get_ret = true
            }
        }
        if(data.ret != undefined && data.ret != 0){
            UIManager.Instance.showError(data.ret)
            return
        }
        var msg = data.protocol
        if (msg != null){
            if(msg == constant.msg.SC_CHILD_GAME_MESSAGE){
                this.subDispatcher.dispatchEvent(data.sub_protocol, data)
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

        if(msg_data[data.protocol] != undefined && msg_data[data.protocol].ret != null){
            this.sendingList.push({
                protocol:data.protocol,
                send_time:this.now(),
                ret_protocol:msg_data[data.protocol].ret,
                is_get_ret:false,
            })
        }
    }
}
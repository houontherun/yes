// TypeScript file


class ChatManager extends Dispatcher {
    public static Instance : ChatManager = new ChatManager();
    private talkDatas = []
    constructor() {
        super();
    }

    public Init(){
        MessageManager.Instance.addEventListener(constant.msg.SC_TALK, this.onTalk, this)
    }

    public sendMsg(content:string){
        MessageManager.Instance.SendMessage({
            protocol:constant.msg.CS_TALK,
            content:content
        })
    }

    private onTalk(data){
        var m = {
            uid : data.uid,
            name: data.name,
            content: data.content
        }
        this.talkDatas.push(m)
        this.dispatchEvent(constant.event.logic.on_new_chat_data, m)
    }

    public get Messages():Array<Object>{
        return this.talkDatas
    }
}
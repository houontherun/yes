// TypeScript file


namespace gameUI{    
    class chatItemRander extends eui.ItemRenderer{
        public leftGroup:eui.Group;
        public imgHeadL:eui.Image;
        public txtNameL:eui.Label;
        public imgContentBgL:eui.Image;
        public txtContentL:eui.Label;
        public rightGroup:eui.Group;
        public imgHeadR:eui.Image;
        public txtNameR:eui.Label;
        public imgContentBgR:eui.Image;
        public txtContentR:eui.Label;

        private isLoaded:boolean

        constructor() {
			super();
			this.addEventListener( eui.UIEvent.COMPLETE, this.onload, this);
			// this.skinName = "resource/custom_skins/chatItemSkin.exml";
            this.isLoaded = false
		}

		private onload():void {
            this.isLoaded = true

            this.updateUI()
		}
        private updateUI(){
            if(!this.isLoaded || this.data == null){
                return
            }
            if(this.data.uid == PlayerManager.Instance.Data.UserId){
                this.leftGroup.visible = false
                this.rightGroup.visible = true
                this.txtNameR.text = this.data.name
                this.txtContentR.text = this.data.content
                this.imgContentBgR.width = this.txtContentR.width + 20
            }else{
                this.leftGroup.visible = true
                this.rightGroup.visible = false
                this.txtNameL.text = this.data.name
                this.txtContentL.text = this.data.content
                this.imgContentBgL.width = this.txtContentL.width + 20
            }
        }
		protected dataChanged():void {
            this.updateUI()  
		}
    }

    export class chat extends gameUI.base {
        private initText(){
            this.txtInput.prompt = this.text(1102029)
            this.lblSend.text = this.text(1102030)
            this.txtTitle.text = this.text(1102028)
        }
        public onload():void {
            super.onload();
            this.initText()
            this.AddClick(this.btnClose, ()=>{
                this.Close()
            }, this)

            this.svData.initItemRenderer(chatItemRander)
            this.svData.initItemSkin("resource/custom_skins/chatItemSkin.exml")
            this.svData.bindData(ChatManager.Instance.Messages)
            this.setScroll()
            
            this.btnSend.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
                if(this.txtInput.text.trim().length > 0){
                    ChatManager.Instance.sendMsg(this.txtInput.text)
                }
            }, this)
            ChatManager.Instance.addEventListener(constant.event.logic.on_new_chat_data, this.onNewChat, this)
        }
        public onUnload(){
            super.onUnload()
            ChatManager.Instance.removeEventListener(constant.event.logic.on_new_chat_data, this.onNewChat, this)
        }
        private setScroll(){
            var v = this.svData.Scroller.viewport.contentHeight - this.svData.Scroller.viewport.height; 
            if(v > -115){ // 115为一个item的高度
                this.svData.Scroller.validateNow(); 
                this.svData.Scroller.viewport.scrollV = this.svData.Scroller.viewport.contentHeight - this.svData.Scroller.viewport.height
            }
        }

        private onNewChat(data){
            this.svData.bindData(ChatManager.Instance.Messages)
            this.setScroll()
        }
        public btnClose:eui.Image;
        public svData:gameUI.Scrollview;
        public btnSend:eui.Image;
        public txtInput:eui.EditableText;

        public lblSend:eui.Label;
        public txtTitle:eui.Label;

    }

}
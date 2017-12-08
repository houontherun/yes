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
			this.skinName = "resource/custom_skins/chatItemSkin.exml";
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
        }
		protected dataChanged():void {
            this.updateUI()  
		}
    }

    export class chat extends gameUI.base {

        public onload():void {
            super.onload();
            this.AddClick(this.btnClose, ()=>{
                this.Close()
            }, this)

            var chatrecords:Array<Object> = [
                {text : "中文"},
                {text : "英文"},
                {text : "日文"},
                {text : "鸟语"},
                {text : "兽语"},
            ]
            this.svData.initItemRenderer(chatItemRander)
            this.svData.bindData(chatrecords)
            
            this.btnSend.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
                
            }, this)
            this.svData.visible = false

        }

        public btnClose:eui.Image;
        public svData:gameUI.Scrollview;
        public btnSend:eui.Image;
        public txtInput:eui.EditableText;
    }

}
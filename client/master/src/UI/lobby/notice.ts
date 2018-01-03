// TypeScript file

// TypeScript file


namespace gameUI{    
    export class notice extends gameUI.base {
        public initText(){
            this.txtTitle.text = this.text("提示")
            this.lbOK.text = this.text("确定")
        }
        public onload():void {
            super.onload();
            this.initText()
            this.AddClick(this.btnClose, ()=>{
                this.Close()                
            }, this)
            this.AddClick(this.btnOK, ()=>{
                if(this.onOKCallback != null){
                    this.onOKCallback()
                }
                this.Close()
            }, this)
            if(this.Data != null){
                if(this.Data.title != undefined){
                    this.txtTitle.text = this.Data.title
                }
                this.txtContent.text = ''
                if(this.Data.content != undefined){
                    this.txtContent.text = this.Data.content
                }
                if(this.Data.ok != undefined){
                    this.lbOK.text = this.Data.ok
                }
                if(this.Data.okCallback != undefined){
                    this.onOKCallback = this.Data.okCallback
                }
            }
        }
        public onUnload(){
            super.onUnload()
            this.onOKCallback = null
        }
        // private onCancelCallback:Function = null
        private onOKCallback:Function = null

        public btnClose:eui.Image;
        public btnOK:eui.Image;
        public btnBack:eui.Image;
        public txtContent:eui.Label;
        public lblBack:eui.Label;
        public lbOK:eui.Label;
        public txtTitle:eui.Label;
    }

}
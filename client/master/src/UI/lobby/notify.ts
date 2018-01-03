// TypeScript file

// TypeScript file


namespace gameUI{    
    export class notify extends gameUI.base {
        public initText(){
            this.txtTitle.text = this.text("公告")
        }
        public onload():void {
            super.onload();
            this.initText()
            this.AddClick(this.btnClose, ()=>{
                this.Close()
            }, this)

            // this.webView = new WebView("http://www.baidu.com");
            // this.webView.x = 0
            // this.webView.y = 0
            // this.webView.width = this.groupContent.width
            // this.webView.height = this.groupContent.height
            // this.webView.show()
        }
        public onUnload(){
            super.onUnload()
            // this.webView.destroy()
        }

        private webView:WebView = null

        public btnClose:eui.Image;
        public txtTitle:eui.Label;
        public groupContent:eui.Group;
    }

}
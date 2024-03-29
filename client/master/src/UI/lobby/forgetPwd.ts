// TypeScript file


namespace gameUI{
    export class forgetPwd extends gameUI.base {
        public onload():void {
            super.onload();
            this.lblOk.text = this.text(1101016) //'确认修改'
            this.btnRegister.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                if(this.txtCode.text.length == 0 || this.txtAccount.text.length == 0 || this.txtPassword.text.length == 0){
                    UIManager.Instance.showNotice(this.text(1102121))
                    return 
                }
                // do sth
            }, this );      

            this.btnGetcode.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                UIManager.Instance.showNotice('假设已经发送了....')
            }, this );  

            
            this.btnClose.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                this.Close()
                UIManager.Instance.LoadUI(UI.login)
            }, this );              
        }
        public txtCode:eui.EditableText;
        public txtPassword:eui.EditableText;
        public txtAccount:eui.EditableText;
        public btnClose:eui.Image;
        public btnGetcode:eui.Image;
        public btnRegister:eui.Image;
        public lblOk:eui.Label;

    }
}
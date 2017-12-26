// TypeScript file

// 注册


namespace gameUI{
    export class phoneRegister extends gameUI.base {
        public onload():void {
            super.onload();
            this.lblOk.text = '登录注册'
            this.btnRegister.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                if(this.txtCode.text.length == 0 || this.txtAccount.text.length == 0 || this.txtPassword.text.length == 0){
                    UIManager.Instance.showNotice('手机号、密码、验证码不能为空')
                    return 
                }
                // do sth
            }, this );      

            this.btnGetcode.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                UIManager.Instance.showNotice('假设已经发送了....')
            }, this );  

            this.btnClose.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                this.Close()
                UIManager.Instance.LoadUI(UI.register)
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
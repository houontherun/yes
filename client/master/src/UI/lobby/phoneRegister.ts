// TypeScript file

// 注册


namespace gameUI{
    export class phoneRegister extends gameUI.base {
        private initText(){
            this.lblOk.text = this.text('注册登录')
            this.txtCode.text = this.text(1101014)
            this.lblPassword.text = this.text(1101002)
            this.lblCode.text = this.text(1101013)
            this.lblPhone.text = this.text(1101009)
            this.txtPassword.text = this.text('请输入密码')
            this.txtAccount.text = this.text(1101010)
            this.lblGetcode.text = this.text(1101015)
        }
        public onload():void {
            super.onload();
            this.initText()

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
        public lblOk:eui.Label;
        public txtCode:eui.EditableText;
        public lblPassword:eui.Label;
        public lblCode:eui.Label;
        public lblPhone:eui.Label;
        public txtPassword:eui.EditableText;
        public txtAccount:eui.EditableText;
        public btnClose:eui.Image;
        public btnGetcode:eui.Image;
        public lblGetcode:eui.Label;
        public btnRegister:eui.Image;
    }
}
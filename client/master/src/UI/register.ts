// TypeScript file

// 注册


namespace gameUI{
    export class register extends gameUI.base {
        public onload():void {
            super.onload();
            
            this.btnRegister.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                this.account = this.txtAccount.text
                this.password = this.txtPassword.text
                if(this.account.trim().length == 0 || this.password.trim().length == 0){
                    alert('请输入帐号和密码')
                    return
                }
                LoginManager.Instance.registerPlatform(this.account, this.password, this.onRegister, this)
            }, this );      

            this.btnWeixin.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                alert('暂未实现')
            }, this );  

            
            this.btnQQ.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                alert('暂未实现')
            }, this );  
            
            this.btnPhone.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                UIManager.Instance.LoadUI(UI.phoneRegister)
            }, this );  
            
            this.btnFanqi.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                alert('暂未实现')
            }, this );  
            
            this.btnClose.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                this.Close()
                UIManager.Instance.LoadUI(UI.login)
            }, this ); 
        }
        private onRegister(data){
            if(data.ret == 0){
                LoginManager.Instance.loginPlatform(this.account, this.password, (d)=>{
                    if(d.ret != 0){
                        alert('登录失败 code=' + d.ret.toString())
                        return
                    }
                    Util.setItem('username', this.account)
                    Util.setItem('password', this.password)
                    
                    UIManager.Instance.LoadUI(UI.lobby, null, ()=>{
                        this.Close();
                    }, this);
                }, this)
            }
        }

        private account:string
        private password:string

        public txtPassword:eui.EditableText;
        public btnRegister:eui.Image;
        public txtAccount:eui.EditableText;
        public btnWeixin:eui.Image;
        public btnQQ:eui.Image;
        public btnPhone:eui.Image;
        public btnFanqi:eui.Image;
        public btnClose:eui.Image;
    }
}
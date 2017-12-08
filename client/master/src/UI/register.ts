// TypeScript file

// 注册


namespace gameUI{
    export class register extends gameUI.base {
        public onload():void {
            super.onload();
            
            this.btnRegister.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                if(this.txtAccount.text.length == 0 || this.txtPassword.text.length == 0){
                    alert('请输入帐号和密码')
                    return
                }

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
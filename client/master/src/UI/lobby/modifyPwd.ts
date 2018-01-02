// TypeScript file

// 注册


namespace gameUI{
    export class modifyPwd extends gameUI.base {
        public initText(){
            this.lblAccount.text = this.text(1101001)
            this.lblOldPwd.text = this.text(1101002)
            this.lblNewPwd.text = this.text(1101011)
            this.lblNewPwd2.text = this.text('重复密码')

            this.txtAccount.text = this.text('请输入帐号')
            this.txtOldPwd.text = this.text('请输入密码')
            this.txtNewPwd.text = this.text(1101012)
            this.txtNewPwd2.text = this.text(1101012)
            this.lblModify.text = this.text(1101016)
        }
        public onload():void {
            super.onload();
            this.initText()
            this.btnModify.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                if(this.txtAccount.text.trim() == ""){
                    UIManager.Instance.showNotice(this.text(1102122))
                    return
                }
                if(this.txtOldPwd.text.trim() == ""){
                    UIManager.Instance.showNotice(this.text(1102123))
                    return
                }
                if(this.txtNewPwd.text.trim() == ""){
                    UIManager.Instance.showNotice(this.text(1101012))
                    return
                }
                if(this.txtNewPwd2.text.trim() == ""){
                    UIManager.Instance.showNotice(this.text(1101012))
                    return
                }
                LoginManager.Instance.changePlatformPwd(this.txtAccount.text.trim(), this.txtOldPwd.text.trim(), this.txtNewPwd.text.trim(), (data)=>{
                    if(data.ret == 0){
                        UIManager.Instance.showNotice(this.text(1102111))
                    }
                }, this)
            }, this );      

            this.btnClose.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                this.Close()
            }, this ); 
        }
        public txtNewPwd:eui.EditableText;
        public lblOldPwd:eui.Label;
        public lblNewPwd:eui.Label;
        public txtNewPwd2:eui.EditableText;
        public lblNewPwd2:eui.Label;
        public lblAccount:eui.Label;
        public txtOldPwd:eui.EditableText;
        public txtAccount:eui.EditableText;
        public btnClose:eui.Image;
        public btnModify:eui.Image;
        public lblModify:eui.Label;


    }
}
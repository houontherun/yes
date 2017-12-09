// TypeScript file

// 注册


namespace gameUI{
    export class modifyPwd extends gameUI.base {
        public onload():void {
            super.onload();

            this.btnModify.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                if(this.txtAccount.text.trim() == ""){
                    alert('请输入帐号')
                    return
                }
                if(this.txtOldPwd.text.trim() == ""){
                    alert('请输入原始密码')
                    return
                }
                if(this.txtNewPwd.text.trim() == ""){
                    alert('请输入新密码')
                    return
                }
                if(this.txtNewPwd2.text.trim() == ""){
                    alert('请再次输入新密码')
                    return
                }
                LoginManager.Instance.changePlatformPwd(this.txtAccount.text.trim(), this.txtOldPwd.text.trim(), this.txtNewPwd.text.trim(), (data)=>{
                    if(data.ret == 0){
                        alert('修改成功')
                    }else{
                        alert('修改失败！code=' + data.ret.toString())
                    }
                }, this)
            }, this );      

            this.btnClose.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                this.Close()
            }, this ); 
        }
        public txtNewPwd:eui.EditableText;
        public txtNewPwd2:eui.EditableText;
        public txtOldPwd:eui.EditableText;
        public txtAccount:eui.EditableText;
        public btnClose:eui.Image;
        public btnModify:eui.Image;

    }
}
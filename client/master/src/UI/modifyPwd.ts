// TypeScript file

// 注册


namespace gameUI{
    export class modifyPwd extends gameUI.base {
        public onload():void {
            super.onload();

            this.btnModify.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                
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
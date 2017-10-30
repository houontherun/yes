// TypeScript file

namespace gameUI{
    export class create_room extends gameUI.base{

        public onload():void {	
            this.lblGame.text = this.Data.name
            this.btnCreateRoom.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                console.log("请求创建房间")
            }, this );
            this.btnClose.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                this.Close()
            }, this );
        }
        
        private btnCreateRoom:eui.Button;
        private lblGame:eui.Label;
        private btnClose:eui.Button;
        private imgBg:eui.Image;
    }
}

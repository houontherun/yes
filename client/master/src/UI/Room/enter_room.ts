

namespace gameUI{
    export class enter_room extends gameUI.base {
        
        public onload():void {
            super.onload()
            this.btnEnterRoom.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                
            }, this );
            this.btnClose.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                this.Close()
            }, this );
        }
        
        private btnEnterRoom:eui.Button;
        private lblRoomId:eui.Label;
        private txtRoomId:eui.TextInput;
        private btnClose:eui.Button;
    }
}



namespace gameUI{
    export class enter_room extends gameUI.base {
        
        public onload():void {
            super.onload()
            this.btnCreateRoom.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                UIManager.Instance.LoadUI(UI.create_room)
            }, this );
            this.btnClose.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                this.Close()
            }, this );

            this.btnReinput.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                this.numbers = []
                this.updateUI()
            }, this );
            this.btnDel.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                if(this.numbers.length > 0){
                    this.numbers.splice(this.numbers.length - 1, 1)
                    this.updateUI()
                }
            }, this );
            this.btn0.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{  this.input(0); }, this);
            this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{  this.input(1); }, this);
            this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{  this.input(2); }, this);
            this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{  this.input(3); }, this);
            this.btn4.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{  this.input(4); }, this);
            this.btn5.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{  this.input(5); }, this);
            this.btn6.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{  this.input(6); }, this);
            this.btn7.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{  this.input(7); }, this);
            this.btn8.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{  this.input(8); }, this);
            this.btn9.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{  this.input(9); }, this);
            RoomManager.Instance.addEventListener(constant.event.logic.on_join_custom_table, this.onJoinCustomTable, this)
        }
        public onUnload(){
            super.onUnload()            
            RoomManager.Instance.removeEventListener(constant.event.logic.on_join_custom_table, this.onJoinCustomTable, this)
        }
        private input(i){
            if(this.numbers.length < 4){
                this.numbers.push(i)
                this.updateUI()
                if(this.numbers.length == 4){
                    this.enterRoom()
                }
            }
        }
        private updateUI(){
            if(this.numbers.length == 0){
                this.txtRoomNum.text = "输　　入　　房　　号"
            }else{
                var s = this.numbers[0].toString()
                for(var i = 1; i < 4; i++){
                    if(this.numbers.length > i){
                        s += '　　 ' + this.numbers[i].toString()
                    }else{
                        s += '　　 ' + ' '
                    }
                }
                this.txtRoomNum.text = s
            }
        }
        private enterRoom(){
            if(this.numbers.length == 4){
                var roomId = this.numbers[0] * 1000 + this.numbers[1] * 100 + this.numbers[2] * 10 + this.numbers[3]
                RoomManager.Instance.JoinCustomTable(roomId)
            }
        }
        private onJoinCustomTable(data){
            if(data.ret == 0){
                GameManager.Instance.once(constant.event.logic.on_start_game, ()=>{
                    this.Close()
                }, this)
                GameManager.Instance.startDDZGame()
            }else{
                alert('加入失败 code=' + data.ret)
            }
        }
        private numbers = []
        
        public btn1:eui.Image;
        public btn4:eui.Image;
        public btn2:eui.Image;
        public btn8:eui.Image;
        public btn5:eui.Image;
        public btn7:eui.Image;
        public btn0:eui.Image;
        public btn6:eui.Image;
        public btn9:eui.Image;
        public btn3:eui.Image;
        public btnReinput:eui.Image;
        public btnDel:eui.Image;
        public btnClose:eui.Image;
        public btnCreateRoom:eui.Image;
        public txtRoomNum:eui.Label;

    }
}

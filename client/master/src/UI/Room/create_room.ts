// TypeScript file

namespace gameUI{
    class ddzSettingData{
        public rounds = []
        public multiple = []
        public costs = []
        constructor(hall){
            
        }
    }
    export class create_room extends gameUI.base{

        public onload():void {	
            super.onload()

            this.btnClose.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                this.Close()
            }, this );

            
            this.btnCreate.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                
            }, this );
        }

        private initDDZUI(){
            var hall = DataManager.Instance.getJsonData('hall')
            var ddz = hall[101]
            this.rbtnRound1.label = ddz.GameNum[0].toString() + '局'
            this.rbtnRound2.label = ddz.GameNum[1].toString() + '局'

            this.rbtntimes1.label = ddz.set1[0].toString() + '倍'
            this.rbtntimes2.label = ddz.set1[1].toString() + '倍'
        }
        public btnClose:eui.Image;
        public btnCreate:eui.Image;
        public groupDDZ:eui.Group;
        public rbtnRound1:eui.RadioButton;
        public rbtnRound2:eui.RadioButton;

        public rbtnRoommdl1:eui.RadioButton;
        public rbtnRoommdl2:eui.RadioButton;

        public rbtntimes2:eui.RadioButton;
        public rbtntimes1:eui.RadioButton;

        
    }
}

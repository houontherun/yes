// TypeScript file

namespace gameUI{
    class DdzSettingData{
        public rounds = []
        public multiple = []
        public costs = []
        public gameId = 101

        constructor(hall){
            this.rounds = hall.GameNum
            this.multiple = hall.set1
            this.costs = [
                {
                    itemId:hall.HallCost[0],
                    num:hall.HallCost[1],
                },
                {
                    itemId:hall.HallCost[2],
                    num:hall.HallCost[3],
                }
            ]
        }
    }
    export class create_room extends gameUI.base{

        public onload():void {	
            super.onload()

            var hall = DataManager.Instance.getJsonData('hall')
            this.ddzSettdata = new DdzSettingData(hall.Game[101])

            this.btnClose.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                this.Close()
            }, this );

            
            this.btnCreate.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                var round = 8
                if(this.ddzrbtnRound1.selected){
                    round = this.ddzSettdata.rounds[0]
                }else{
                    round = this.ddzSettdata.rounds[1]
                }
                var costId
                var costNum
                var room = 1
                if(this.ddzrbtnRoommdl1.selected){
                    room = 1
                    costId = this.ddzSettdata.costs[0].itemId
                    costNum = this.ddzSettdata.costs[0].num
                }else{
                    room = 2
                    costId = this.ddzSettdata.costs[1].itemId
                    costNum = this.ddzSettdata.costs[1].num
                }
                var multiple = 120
                if(this.ddzrbtntimes1.selected){
                    multiple = this.ddzSettdata.multiple[0]
                }else{
                    multiple = this.ddzSettdata.multiple[1]
                }
                if(PlayerManager.Instance.Data.getResourceNumById(costId) >= costNum){
                    RoomManager.Instance.CreateCustomTable(this.ddzSettdata.gameId, room, round, multiple)
                }else{
                    alert("道具不足")
                }
                
            }, this );
            this.initDDZUI()
            RoomManager.Instance.addEventListener(constant.event.logic.on_create_custom_table, this.onCreateCustomTable, this)
        }
        public onUnload(){
            super.onUnload()
            RoomManager.Instance.removeEventListener(constant.event.logic.on_create_custom_table, this.onCreateCustomTable, this)
        }
        private onCreateCustomTable(data){
            if(data.ret == 0){
                alert('创建成功！房间号：' + data.custom_table_id)
                GameManager.Instance.startDDZGame()
            }else{
                alert('创建房间失败 ret=' + data.ret)
            }
        }

        private initDDZUI(){
            this.ddzrbtnRound1.label = this.ddzSettdata.rounds[0] + '局'
            this.ddzrbtnRound2.label = this.ddzSettdata.rounds[1] + '局'

            this.ddzrbtnRoommdl1.label = '房主开房'
            this.ddzrbtnRoommdl2.label = 'AA开房'

            this.ddzrbtntimes1.label = this.ddzSettdata.multiple[0] + '倍'
            this.ddzrbtntimes2.label = this.ddzSettdata.multiple[1] + '倍'
        }
        private ddzSettdata : DdzSettingData

        public btnClose:eui.Image;
        public btnCreate:eui.Image;
        public groupDDZ:eui.Group;
        public ddzrbtnRound1:eui.RadioButton;
        public ddzrbtnRound2:eui.RadioButton;

        public ddzrbtnRoommdl1:eui.RadioButton;
        public ddzrbtnRoommdl2:eui.RadioButton;

        public ddzrbtntimes2:eui.RadioButton;
        public ddzrbtntimes1:eui.RadioButton;

        
    }
}

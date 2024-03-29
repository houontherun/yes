// TypeScript file

namespace gameUI{
    var usrImg = 'touxiang_png'
    var emptyImg = 'touxiang_empty_png'
    class ddzRoomItemRander extends eui.ItemRenderer{
        public btnTable:eui.Image;
        public txtTableNum:eui.Label;
        public txtStatus:eui.Label;
        public btnEnter3:eui.Image;
        public btnEnter1:eui.Image;
        public btnEnter2:eui.Image;

        private isLoaded = false

        constructor() {
			super();
			this.addEventListener( eui.UIEvent.COMPLETE, this.onload, this);
			this.skinName = "resource/custom_skins/games/ddzRoomTableSkin.exml";
		}

		private onload():void {
            this.isLoaded = true
            this.updateUI()
            
            this.btnEnter1.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
                this.sitDown(0)
            }, this);
            this.btnEnter2.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
                this.sitDown(1)
            }, this);
            this.btnEnter3.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
                this.sitDown(2)
            }, this);
		}
        private sitDown(chair_id:number):void{
            if(this.data.Users[chair_id] != null && this.data.Users[chair_id] != undefined){
                UIManager.Instance.showNotice(Util.uiText(1102112))
                return
            }
            RoomManager.Instance.SitDown(this.data.TableId, chair_id)
        }

        public updateUI():void{
            if(!this.isLoaded || this.data == null)
                return
            var isReady = true
            var userImages = [this.btnEnter1, this.btnEnter2, this.btnEnter3]
            for(var i = 0; i <=2; i++){
                var user = this.data.Users[i]
                if(user != null && user != undefined){
                    userImages[i].source = usrImg
                }
                else{
                    userImages[i].source = emptyImg
                    isReady = false
                }
            }
            this.txtTableNum.text = this.data.TableId.toString() + Util.uiText(1102091)
            if(isReady){
                this.txtStatus.text = Util.uiText(1102113)
            }else{
                this.txtStatus.text = Util.uiText(1102114)
            }            
        }

		protected dataChanged():void {
            this.updateUI()
		}
    }

    export class ddzRoom extends gameUI.base{   
        public initText(){
            this.lblQuickstart.text = this.text(1102090)
        }     
        public onload():void {
            super.onload();
            this.initText()
            
            UIManager.Instance.Lobby.imgBg.source = 'background2_png'

            this.svGame.initScrollLayout(gameUI.ScrollLayout.Horizontal)
            this.svGame.initItemRenderer(ddzRoomItemRander)
            this.AddClick(this.btnClose, ()=>{
                RoomManager.Instance.LevelRoom()
            }, this)
            this.AddClick(this.btnQuickStart, ()=>{
                
            }, this)

            RoomManager.Instance.addEventListener(constant.event.logic.on_self_sit_down, this.onSitDown, this)   
            RoomManager.Instance.addEventListener(constant.event.logic.on_self_leave_room, this.onLeaveRoom, this)   

            RoomManager.Instance.addEventListener(constant.event.logic.on_query_room_info, this.onQueryRoomInfo, this)
            this.enterRoomData = null
            RoomManager.Instance.queryRoomInfo()
            
            UIManager.Instance.UnloadUI(UI.ddzSelectRoom)
        }
        public onUnload():void{
            super.onUnload()
            RoomManager.Instance.removeEventListener(constant.event.logic.on_self_sit_down, this.onSitDown, this) 
            RoomManager.Instance.removeEventListener(constant.event.logic.on_self_leave_room, this.onLeaveRoom, this)

            RoomManager.Instance.removeEventListener(constant.event.logic.on_query_room_info, this.onQueryRoomInfo, this)
            if(this.enterRoomData){
                this.enterRoomData.removeEventListener(constant.event.logic.on_table_users_update, this.onTableUserUpdate, this)
            }
            this.enterRoomData = null

            UIManager.Instance.Lobby.imgBg.source = UIManager.Instance.Lobby.defaultBackground

            UIManager.Instance.LoadUI(UI.ddzSelectRoom)
        }
        private onQueryRoomInfo(data:EnterRoomData):void{
            this.enterRoomData = data
            this.enterRoomData.addEventListener(constant.event.logic.on_table_users_update, this.onTableUserUpdate, this)
            this.svGame.bindData(this.enterRoomData.Tables)
        }
        private onSitDown(data):void{
            GameManager.Instance.startDDZGame()
        }

        private onLeaveRoom(data):void{
            this.Close()
        }
        private onTableUserUpdate(table:TableData):void{
            for(var i = 0; i < this.svGame.DataList.numChildren; i++){
                var tableItem = <ddzRoomItemRander>this.svGame.DataList.getChildAt(i)
                if(tableItem.data.TableId == table.TableId){
                    tableItem.updateUI()
                }
            }      
        }

        private enterRoomData:EnterRoomData
        public svGame:gameUI.Scrollview
        public btnClose:eui.Image;
        public btnQuickStart:eui.Image;
        public lblQuickstart:eui.Label;

    }
}
// TypeScript file

namespace gameUI{
    class ddzRoomItemRander extends eui.ItemRenderer{
        public btnTable:eui.Image;
        public txtTableNum:eui.Label;
        public txtStatus:eui.Label;
        public imgUser1:eui.Image;
        public imgUser3:eui.Image;
        public imgUser2:eui.Image;
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
                alert('有人坐了，请选其他位置')
                return
            }
            RoomManager.Instance.SitDown(this.data.TableId, chair_id)
        }

        public updateUI():void{
            if(!this.isLoaded || this.data == null)
                return
            var isReady = true
            var userImages = [this.imgUser1, this.imgUser2, this.imgUser3]
            for(var i = 0; i <=2; i++){
                var user = this.data.Users[i]
                if(user != null && user != undefined){
                    userImages[i].visible = true
                }
                else{
                    userImages[i].visible = false
                    isReady = false
                }
            }
            this.txtTableNum.text = this.data.TableId.toString() + "号桌"
            if(isReady){
                this.txtStatus.text = '进行中'
            }else{
                this.txtStatus.text = '等待中'
            }            
        }

		protected dataChanged():void {
            this.updateUI()
		}
    }

    export class ddzRoom extends gameUI.base{        
        public onload():void {
            super.onload();

            UIManager.Instance.Lobby.groupType.visible = false
            UIManager.Instance.Lobby.groupTopMenu.visible = false
            UIManager.Instance.Lobby.imgBg.source = 'background2_png'

            this.listGames.itemRenderer = ddzRoomItemRander
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

            UIManager.Instance.Lobby.groupType.visible = true
            UIManager.Instance.Lobby.groupTopMenu.visible = true
            UIManager.Instance.Lobby.imgBg.source = UIManager.Instance.Lobby.defaultBackground
        }
        private onQueryRoomInfo(data:EnterRoomData):void{
            this.enterRoomData = data
            this.enterRoomData.addEventListener(constant.event.logic.on_table_users_update, this.onTableUserUpdate, this)
            this.listGames.dataProvider = new eui.ArrayCollection(this.enterRoomData.Tables)
        }
        private onSitDown(data):void{
            UIManager.Instance.UnloadUI(UI.ddzRoom);
            GameManager.Instance.startDDZGame()
        }

        private onLeaveRoom(data):void{
            this.Close()
            UIManager.Instance.LoadUI(UI.ddzSelectRoom)
        }
        private onTableUserUpdate(table:TableData):void{
            for(var i = 0; i < this.listGames.numChildren; i++){
                var tableItem = <ddzRoomItemRander>this.listGames.getChildAt(i)
                if(tableItem.data.TableId == table.TableId){
                    tableItem.updateUI()
                }
            }      
        }

        private enterRoomData:EnterRoomData
        public svGame:eui.Scroller;
        public listGames:eui.List;
        public btnClose:eui.Image;
        public btnQuickStart:eui.Image;
    }
}
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
            if(this.data.GetUserByChairId(chair_id) != null){
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
            for(var i = 0; i < 3; i++){
                var userId = this.data.GetUserByChairId(i)
                if(userId != null){
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
            MessageManager.Instance.addEventListener(constant.msg.SC_USER_SIT_DOWN,  this.onPlayerSitDown, this)   
            MessageManager.Instance.addEventListener(constant.msg.SC_LEAVE_ROOM,  this.onLeaveRoomRet, this)    

            this.listGames.itemRenderer = ddzRoomItemRander
            this.listGames.dataProvider = new eui.ArrayCollection(RoomManager.Instance.currentRoom.Tables)

            // RoomManager.Instance.currentRoom.removeEventListener('TableUpdate', this.onTableUpdate, this) 
            RoomManager.Instance.currentRoom.addEventListener('TableUpdate', this.onTableUpdate, this)

            this.AddClick(this.btnClose, ()=>{
                RoomManager.Instance.LevelRoom()
            }, this)
            UIManager.Instance.Lobby.groupType.visible = false
            UIManager.Instance.Lobby.groupTopMenu.visible = false
            UIManager.Instance.Lobby.imgBg.source = 'background2_png'

            this.AddClick(this.btnQuickStart, ()=>{
                // console.log(DataManager.Instance.getJson('name').RandWomanName[1].WomanName)
            }, this)
        }
        public onUnload():void{
            super.onUnload()
            MessageManager.Instance.removeEventListener(constant.msg.SC_USER_SIT_DOWN,  this.onPlayerSitDown, this) 
            MessageManager.Instance.removeEventListener(constant.msg.SC_LEAVE_ROOM,  this.onLeaveRoomRet, this)   
            // RoomManager.Instance.currentRoom.removeEventListener('TableUpdate', this.onTableUpdate, this) 
            UIManager.Instance.Lobby.groupType.visible = true
            UIManager.Instance.Lobby.groupTopMenu.visible = true
            UIManager.Instance.Lobby.imgBg.source = UIManager.Instance.Lobby.defaultBackground
        }
        private onPlayerSitDown(data):void{
            if(data.ret == 0){
                // todo
                if(!RES.isGroupLoaded("ddzRes"))
                   RES.loadGroup("ddzRes");

                if(!RES.isGroupLoaded("face"))
                  RES.loadGroup("face");
                if(!RES.isGroupLoaded("poke"))  
                {
                   RES.loadGroup("poke");
                
                   RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                }
                else
                {
                    
                    UIManager.Instance.UnloadUI(UI.ddzRoom);
                    UIManager.Instance.LoadUI(UI.ddzGame);
                }
               
            }
        }

        private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "poke") {
            UIManager.Instance.UnloadUI(UI.ddzRoom);
            UIManager.Instance.LoadUI(UI.ddzGame);
        }
    }

        private onLeaveRoomRet(data):void{
            if(data.ret == 0){
                this.Close()
                UIManager.Instance.LoadUI(UI.ddzSelectRoom)
            }
        }
        private onTableUpdate(tableId):void{
            for(var i = 0; i < this.listGames.numChildren; i++){
                var tableItem = <ddzRoomItemRander>this.listGames.getChildAt(i)
                if(tableId == tableItem.data.TableId){
                    tableItem.updateUI()
                }
            }
        }

        public svGame:eui.Scroller;
        public listGames:eui.List;
        public btnClose:eui.Image;
        public btnQuickStart:eui.Image;
    }
}
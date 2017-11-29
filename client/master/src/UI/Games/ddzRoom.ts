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
            RoomManager.Instance.SitDown(this.data.TableId, chair_id)
        }

        private updateUI():void{
            if(!this.isLoaded || this.data == null)
                return             
            var userImages = [this.imgUser1, this.imgUser2, this.imgUser3]
            for(var i = 0; i < 3; i++){
                var userId = this.data.GetUserByChairId(i)
                if(userId != null){
                    userImages[i].visible = true
                }
                else{
                    userImages[i].visible = false
                }
            }
        }

		protected dataChanged():void {
            this.updateUI()
		}
    }

    export class ddzRoom extends gameUI.base{        
        public onload():void {
            super.onload();

            this.listGames.itemRenderer = ddzRoomItemRander
            this.listGames.dataProvider = new eui.ArrayCollection(RoomManager.Instance.currentRoom.Tables)

            this.AddClick(this.btnClose, ()=>{
                this.Close()
                UIManager.Instance.LoadUI(UI.ddzSelectRoom)
            }, this)
            MessageManager.Instance.addEventListener(constant.msg.SC_USER_SIT_DOWN,  this.onPlayerSitDown, this) 
            UIManager.Instance.Lobby.groupType.visible = false
            UIManager.Instance.Lobby.groupTopMenu.visible = false
            UIManager.Instance.Lobby.imgBg.source = 'background2_png'
        }
        public onUnload():void{
            super.onUnload()
            MessageManager.Instance.removeEventListener(constant.msg.SC_USER_SIT_DOWN,  this.onPlayerSitDown, this) 
            UIManager.Instance.Lobby.groupType.visible = true
            UIManager.Instance.Lobby.groupTopMenu.visible = true
            UIManager.Instance.Lobby.imgBg.source = UIManager.Instance.Lobby.defaultBackground
        }
        private onPlayerSitDown(data):void{
            if(data.ret == 1){
                // todo
                RES.loadGroup("ddzRes");
                RES.loadGroup("face");
                RES.loadGroup("poke");
                UIManager.Instance.UnloadUI(UI.ddzRoom);
                UIManager.Instance.UnloadUI(UI.ddzSelectRoom);
                UIManager.Instance.UnloadUI(UI.lobby);
                UIManager.Instance.LoadUI(UI.ddzGame);
            }
        }

        public svGame:eui.Scroller;
        public listGames:eui.List;
        public btnClose:eui.Image;
    }
}
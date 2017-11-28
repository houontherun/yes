// TypeScript file
namespace gameUI{
    class ddzSelectRoomItemRander extends eui.ItemRenderer{
        public imgBg:eui.Image;
        public txtLevel:eui.Label;
        public lblState:eui.Label;
        public imgState:eui.Image;
        public txtState:eui.Label;
        public txtEnterGold:eui.Label;

        constructor() {
			super();
			this.skinName = "resource/custom_skins/games/ddzSelectRoomItemSkin.exml";
			this.addEventListener( eui.UIEvent.COMPLETE, this.onload, this);
		}

		private onload():void {
            this.updateUI()
		}

        private updateUI():void{
            this.imgBg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
			this.imgBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }
        private onClick():void {
            // 请求进入房间
            // console.log('enter room ' + this.data.RoomId)
            RoomManager.Instance.EnterRoom(this.data.RoomId)
		}

		protected dataChanged():void {
            if(this.imgBg != undefined && this.imgBg != null){
                this.updateUI()
            }
		}
    }

    export class ddzSelectRoom extends gameUI.base {
        public svGame:eui.Scroller;
        public listGames:eui.List;
        public imgGameBg:eui.Image;
        public btnClose:eui.Image;
        
        public onload():void {
            super.onload();

            this.listGames.itemRenderer = ddzSelectRoomItemRander
            this.listGames.dataProvider = new eui.ArrayCollection(RoomManager.Instance.RoomList)

            this.AddClick(this.btnClose, ()=>{
                this.Close()
            }, this)
            
            MessageManager.Instance.addEventListener(constant.msg.SC_QUERY_ROOM_INFO, this.onQueryRoomInfoRet, this) 
        }
        public onUnload():void{
            super.onUnload()
            MessageManager.Instance.removeEventListener(constant.msg.SC_QUERY_ROOM_INFO, this.onQueryRoomInfoRet, this) 
        }

        private onQueryRoomInfoRet(data:any):void{
            if(data.ret == 0){
                // this.Close()
                UIManager.Instance.LoadUI(UI.ddzRoom)
            }
        }
    }
}
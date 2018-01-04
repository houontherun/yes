// TypeScript file
namespace gameUI{
    class ddzSelectRoomItemRander extends eui.ItemRenderer{
        public imgBg:eui.Image;
        public txtName:eui.Label;
        public lblState:eui.Label;
        public imgState:eui.Image;
        public txtState:eui.Label;
        public txtEnterGold:eui.Label;

        private isLoaded = false

        constructor() {
			super();
			this.addEventListener( eui.UIEvent.COMPLETE, this.onload, this);
			this.skinName = "resource/custom_skins/games/ddzSelectRoomItemSkin.exml";
		}

		private onload():void {
            this.isLoaded = true
            this.lblState.text = Util.uiText(1102087)
            this.txtState.text = Util.uiText(1102088)
			this.imgBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.updateUI()
		}

        private updateUI():void{
            if(!this.isLoaded || this.data == null)
                return
            this.txtName.text = this.data.Name
            this.txtEnterGold.text = this.data.BaseScore
        }
        private onClick():void {
            // 请求进入房间
            if(PlayerManager.Instance.Data.Gold >= this.data.Limit){
				RoomManager.Instance.EnterRoomAndAutoSitdown(this.data.RoomId, ()=>{
                    // UIManager.Instance.UnloadUI(UI.ddzSelectRoom)
                    //GameManager.Instance.startDDZGame()
                }, this)
                // RoomManager.Instance.EnterRoom(this.data.RoomId)
            }else{
                UIManager.Instance.showNotice(Util.uiText(1102115))
            }
		}

		protected dataChanged():void {
            this.updateUI()
		}
    }

    export class ddzSelectRoom extends gameUI.base {
        public svGame:gameUI.Scrollview;
        public imgGameBg:eui.Image;
        public btnClose:eui.Image;
        
        public onload():void {
            super.onload();       

            this.svGame.initScrollLayout(gameUI.ScrollLayout.Horizontal)
            this.svGame.initItemRenderer(ddzSelectRoomItemRander)

            this.btnClose.visible = Application.ChildGameCount > 1
            this.AddClick(this.btnClose, ()=>{
                this.Close()
            }, this)
             
            RoomManager.Instance.queryRoomList(101)
            RoomManager.Instance.addEventListener(constant.event.logic.on_self_enter_room, this.onEnterRoom, this)
            RoomManager.Instance.addEventListener(constant.event.logic.on_get_room_list, this.onGetRoomList, this)
        }
        public onUnload():void{
            super.onUnload()
            RoomManager.Instance.removeEventListener(constant.event.logic.on_self_enter_room, this.onEnterRoom, this)
            RoomManager.Instance.removeEventListener(constant.event.logic.on_get_room_list, this.onGetRoomList, this)
        }

        private onEnterRoom(data):void{
            // this.Close()
            UIManager.Instance.LoadUI(UI.ddzRoom)
        }
        private onGetRoomList():void{
            this.svGame.bindData(RoomManager.Instance.RoomList)
        }

    }
}
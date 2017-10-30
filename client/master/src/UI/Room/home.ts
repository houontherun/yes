

namespace gameUI{

	export class home extends gameUI.base{

		public onload():void {
			this.listGames.itemRenderer = gameUI.game_item;
			this.svGame.horizontalScrollBar	= null;
			
			this.listGameTypes.itemRenderer = gameUI.game_class_item;
			this.listGameTypes.dataProvider = new eui.ArrayCollection(this.Data);
			this.listGameTypes.addEventListener(egret.Event.CHANGE, this.onGameClassChange, this);
			this.svGameType.verticalScrollBar = null;

			this.listGameTypes.selectedIndex = 0;
			this.onGameClassChange(null);

            this.btnEnter.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                UIManager.Instance.LoadUI(UI.enter_room)
            }, this );
		}

		private onGameClassChange(evt: egret.Event):void{
			var game_data = this.listGameTypes.selectedItem;
			this.listGames.dataProvider = new eui.ArrayCollection(game_data.childs);
			this.listGames.validateNow();
			for(var i = 0; i < this.listGameTypes.numChildren; i++){
				var item = this.listGameTypes.getChildAt(i) as gameUI.game_class_item;
				if(game_data.type_name == item.data.type_name){
					item.onStateChange(true);
				}else{
					item.onStateChange(false);
				}
			}
		}
		
		private svGame:eui.Scroller;
		private listGames:eui.List;
		private svGameType:eui.Scroller;
		private listGameTypes:eui.List;
		private btnEnter:eui.Button;
	}
}

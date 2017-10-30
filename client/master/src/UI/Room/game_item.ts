

namespace gameUI{
	export class game_item extends eui.ItemRenderer{

		constructor() {
			super();
			this.skinName = "resource/custom_skins/ui_game_item.exml";
			this.addEventListener( eui.UIEvent.COMPLETE, this.onload, this);
		}

		private onload():void {
			this.updateUI();
		}

		private onClick():void{
			if(this.data != null && this.data != undefined){
				UIManager.Instance.LoadUI(UI.create_room, this.data)
			}
		}

		public get isLoaded():boolean{
			return this.lblName != null && this.imgIcon != null;
		}

		private updateUI():void{
			if(!this.isLoaded){
				return;
			}
			this.imgIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
			this.imgIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

			this.lblName.text = this.data.name;
			this.imgIcon.source = this.data.icon;
		}

		protected dataChanged():void {
			this.updateUI();
		}

		private imgIcon:eui.Image;
		private lblName:eui.Label;
	}
}


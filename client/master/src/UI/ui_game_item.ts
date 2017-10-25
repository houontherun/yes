class ui_game_item extends eui.ItemRenderer{

    constructor() {
        super();
        this.skinName = "resource/custom_skins/ui_game_item.exml";
        this.once( eui.UIEvent.COMPLETE, this.onload, this);
    }

	private onload():void {
		this.updateUI();
		this.imgIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
	}

	protected createChildren():void {
        super.createChildren();

		this.updateUI();
    }
	private onClick():void{
		if(this.data != null && this.data != undefined){
			console.log("select " + this.data.name);
			// GameManager.Instance.downloadGame(1);
			//HttpDownloadManager.Instance.downloadGame('');
		}
	}

	private updateUI():void{
		if(this.data != null){
			var name = this.data.name;
			if(this.lblName != undefined && this.lblName != null){
				this.lblName.text = name;
			}
		}	
	}

    protected dataChanged():void {
		this.updateUI();
    }

	public imgIcon:eui.Image;
	public lblName:eui.Label;
}
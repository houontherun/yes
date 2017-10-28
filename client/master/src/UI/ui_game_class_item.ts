// TypeScript file
class ui_game_class_item extends eui.ItemRenderer{

    constructor() {
        super();
        this.skinName = "resource/custom_skins/ui_game_class_item.exml";
        this.once( eui.UIEvent.COMPLETE, this.onload, this);
    }

	private onload():void {
		this.updateUI();
	}

	protected createChildren():void {
        super.createChildren();
		this.updateUI();
    }
	public onStateChange(selected:boolean):void{
		if(this.data != null && this.data != undefined){
			this.btnToggle.selected = selected;
		}
	}

	private updateUI():void{
		if(this.data != null){
			if(this.btnToggle != undefined && this.btnToggle != null){
				this.btnToggle.label = this.data.type_name;
				(<eui.Label>this.btnToggle.labelDisplay).size = 50;
			}			
		}
	}

    protected dataChanged():void {
		this.updateUI();
    }
	public btnToggle:eui.ToggleButton;
}
namespace Card {
export class ui_ClockCD extends eui.Component implements  eui.UIComponent {
	private text_cd : eui.Label;
    private delay :number = -1;

	public constructor() {
		super();
		this.skinName = "resource/custom_skins/ddz_ui/ui_ClockCD.exml";
		this.addEventListener( eui.UIEvent.COMPLETE, this.onload, this);
	}

	 private onload():void 
	 {
	    if(this.delay >-1)
		{
            this.text_cd.text = this.delay.toString();
		}

	}
   
	public SetCd(delay:number)
	{
		this.delay = delay;
		if(this.text_cd)
		   this.text_cd.text = delay.toString();

	}
   

}

}
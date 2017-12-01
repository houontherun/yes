namespace Card {
class ui_ClockCD extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
		this.skinName = "resource/custom_skins/ddz_ui/ui_ClockCD.exml";
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
	}
	
}

}
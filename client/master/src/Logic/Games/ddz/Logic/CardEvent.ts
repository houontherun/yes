module CardLogic {
	/**
	 * 自定义事件
	 * @author 
	 *
	 */
	export class CardEvent extends egret.Event{
    	
    	public static DispatchCardStart:string = "dispatchcardstart";
		public static AddOtherPlayers:string = "addotherPlayers";
		public static AddHard:string = "addhard";
    	public static UpdatePlayers:string = "updatePlayers";
        public static UpdatePlayersStatus:string  = "updatePlayersstatus";
    	public paramObj:any; 
    	
		public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false) {
    		super(type,bubbles,cancelable);
		}
	}
}
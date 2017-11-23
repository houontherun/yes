module Logic {
	/**
	 * 事件派发器
	 * @author 
	 *
	 */
	export class CardEventDispatcher extends egret.EventDispatcher{
    	private static _instance:CardEventDispatcher;
    	
		public constructor() {
    		super();
		}
		
		public static get Instance():CardEventDispatcher{
            if(this._instance == null){
                this._instance = new CardEventDispatcher();
		    }
            return this._instance;
		}
	}
}
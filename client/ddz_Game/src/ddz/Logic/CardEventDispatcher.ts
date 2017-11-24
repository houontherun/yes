module CardLogic {
	/**
	 * 事件派发器
	 * @author  yanwei47@163.com
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
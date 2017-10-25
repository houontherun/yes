class ui_home extends ui_base{

    constructor(data:any) {
        super();
		this.data = data;
        this.once( eui.UIEvent.COMPLETE, this.onload, this );
        this.skinName = "resource/custom_skins/ui_home.exml";
    }

    protected createChildren():void {
        super.createChildren();
    }
	
    private onload():void {		
		// this.listGames.dataProvider = new eui.ArrayCollection(games);
		this.listGames.itemRenderer = ui_game_item;
		this.svGame.horizontalScrollBar	= null;
		
		this.listGameTypes.itemRenderer = ui_game_class_item;
		this.listGameTypes.dataProvider = new eui.ArrayCollection(this.data);
		this.listGameTypes.addEventListener(egret.Event.CHANGE, this.onGameClassChange, this);
		this.svGameType.verticalScrollBar = null;

		this.listGameTypes.selectedIndex = 0;
		this.onGameClassChange(null);
    }

	private onGameClassChange(evt: egret.Event):void{
		var game_data = this.listGameTypes.selectedItem;
		this.listGames.dataProvider = new eui.ArrayCollection(game_data.childs);
		this.listGames.validateNow();
		for(var i = 0; i < this.listGameTypes.numChildren; i++)
		{
			var item = this.listGameTypes.getChildAt(i) as ui_game_class_item;
			if(game_data.type_name == item.data.type_name)
			{
				item.onStateChange(true);
			}
			else
			{
				item.onStateChange(false);
			}
		}
	}
    
	private data:any;

    public svGame:eui.Scroller;
	public listGames:eui.List;
	public svGameType:eui.Scroller;
	public listGameTypes:eui.List;
}
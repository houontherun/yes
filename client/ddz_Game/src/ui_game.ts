class ui_game extends gameUI.base {
   private  btn_tuoguan : eui.Image;
   private static shared: ui_game;
   public static Shared() {
        if(ui_game.shared == null) {
            ui_game.shared = new ui_game();
        }
        return ui_game.shared;
    }
	public constructor() {
		super("resource/eui_skins/ui_game.exml");
		this.AddClick(this.btn_tuoguan, ()=>{            
            }, this );
	}

	
}
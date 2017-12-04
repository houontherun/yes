namespace Card {
    
 export class PlayerRankData{
    private baseScore:number //底分
    private gold:number //底分
    private usertimes:number; //倍数
	private Playername:string;

    constructor(name:string,g:number,b:number,t:number){
        this.baseScore = b;
        this.Playername = name;
		this.usertimes = t;
		this.gold = g;
    }

	public get Gold():number { return this.gold;}
    public get UserTime():any{ return this.usertimes }
    public get Name():any{ return this.Playername; }
	public get BaseScore():any{ return this.baseScore; }

}

	class ddz_SettleItemRander extends eui.ItemRenderer {
	  private isLoaded = false;
	  private text_name:eui.Label;
	  private text_baseScore:eui.Label;
	  private text_times:eui.Label;
	  private text_gold:eui.Label;

	  constructor() {
			super();
			this.addEventListener( eui.UIEvent.COMPLETE, this.onload, this);
			this.skinName = "resource/custom_skins/ddz_ui/ui_gameSettle.exml";
		}

		private onload():void {
            this.isLoaded = true
            this.updateUI();
		}

        protected dataChanged():void {
            this.updateUI()
		}

		public updateUI():void{
            if(!this.isLoaded || this.data == null)
                return;

			this.text_name.text = this.data.Name;
			this.text_baseScore.text = this.data.BaseScore;
			this.text_gold.text = this.data.Gold;
			this.text_times.text = this.data.UserTime;

		}
	}

     export class ui_GameSettle extends gameUI.UIbase {

		private gameresult:boolean = false;
		private img_result_title:eui.Image;
		private img_result_bg:eui.Image;
		private list_PlayersRank:eui.List;
		private btn_exit :eui.Image;
		private btn_continue :eui.Image;
		private rankData = [];
		private Continue: () => void;
		private ExitRoom: () => void;

        public constructor(result:boolean,data) {
		    super();
			
			this.gameresult = result;
			this.rankData = data;
		    this.skinName = "resource/custom_skins/ddz_ui/ui_gameSettle.exml";
		    this.addEventListener( eui.UIEvent.COMPLETE, this.onload, this);
	      }

		public SetContinueclick(func)
		{
			this.Continue = func;
		}  

		public SetExitClick(func)
		{
			this.ExitRoom = func;
		}  
         
        private onload():void 
	    {
		   this.list_PlayersRank.itemRenderer = ddz_SettleItemRander;
	       if(this.gameresult )
	    	{
			   this.SetImageUrl(this.img_result_title,"shengli_png");
			   this.SetImageUrl(this.img_result_bg,"tiaofu_png");
	    	}
			else
			{
                this.SetImageUrl(this.img_result_title,"sibai_png");
			    this.SetImageUrl(this.img_result_bg,"biaotou_png");
			}
		   this.img_result_bg.scaleX = this.img_result_bg.scaleY = 0.7;
           this.list_PlayersRank.dataProvider = new eui.ArrayCollection(this.rankData);

		   this.AddClick(this.btn_continue,()=>{
			   if(this.Continue)
			   {
				   this.Continue();
			   }
		   },this);
		    this.AddClick(this.btn_exit,()=>{
			   if(this.ExitRoom)
			   {
				   this.ExitRoom();
			   }
			},this);
        }
       

        

	}

}

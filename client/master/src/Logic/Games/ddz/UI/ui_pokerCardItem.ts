namespace Card {
export class ui_pokerCardItem extends gameUI.UIbase implements  eui.UIComponent {
    private img_index:eui.Image;
	private img_suit:eui.Image;
	private img_card:eui.Image;
	private card : PokerCard;
	private bSelect:boolean = false;
	private posY:number;
	private bLandLord:boolean= false;
    private img_landlord:eui.Image;
    private isJoker:boolean = false;
    private imgindex = null;
	private imgsuit = null;
	private imgsource = null;
	public constructor() {
		super("resource/custom_skins/ddz_ui/ui_pokerCard.exml");
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_tap,this);
		this.addEventListener( eui.UIEvent.COMPLETE, this.onload, this);
	}


    private onload():void {
            if(this.card == null){
                return
            }
			this.setCardItem();
		}

	public get cardData():PokerCard{
        return this.card;
    }
	
    public set cardData(value:PokerCard){
        this.card = value;
		let index = value.Index;
		let colr = value.Suit;
		 if ((index > 0 && index < 16) && (colr == 0 || colr == 2))
		 {
  			 this.imgindex = `red_${index}_png`;
			 this.imgsuit = `Suit_${colr}_png`;
			 this.imgsource  = "bk_png";
		 }
		 else if((index > 0 && index < 16) && (colr == 1 || colr == 3))
		{
            this.imgindex = `black_${index}_png`;
			this.imgsuit = `Suit_${colr}_png`;
			this.imgsource  = "bk_png";
		}
		else if((index > 0 && index < 16) && (colr == 4))
		{
            this.imgindex = `joker_${index}_png`;
			this.imgsource  = "bk_png";
			this.isJoker = true;
		}
		else
		{
            this.imgsource  = "card_back_png";
		}

		if(this.img_card)
		  {
            this.setCardItem();
		  }

    }

	private setCardItem()
	{
        this.img_card.source = this.imgsource;
		 if(this.imgindex)
    	 {
    		 this.img_index.visible = true;
    		  this.SetImageUrl(this.img_index,this.imgindex );
    	 }
    	 else
    	 {
    		 this.img_index.visible = false;
    	 }

    	 if(this.imgsuit)
    	 {
    		  this.SetImageUrl(this.img_suit,this.imgsuit );
    		  this.img_suit.visible = true;
    	 }
    	 else
    	 {
    		 this.img_suit.visible = false;
    	 }

		 if(this.isJoker)
		 {
			 this.img_index.width = 28;
			 this.img_index.height = 158;
		 }
	}

	public SetSize(scale:number)
	{
		this.scaleX = scale;
		this.scaleY = scale;
	}

    public get Selected():boolean{
		return this.bSelect;
	}

	public setPos(posx:number,posy:number)
	{
		this.x = posx;
		this.y = posy;
		this.posY = posy;
	}

	protected onclick_tap(){
       this.bSelect = !this.bSelect;
       this.alpha = 1;
	   if(this.bSelect)
	   {
		   this.y -= 20;
	   }
	   else
	   {
           this.y =  this.posY;
	   }
    }

	public SetShoot(bselect : boolean)
	{
		this.bSelect = bselect
	   if(this.bSelect)
	   {
		   this.y -= 20;
	   }
	   else
	   {
           this.y =  this.posY;
	   }
	}

	public Setlandlord(bll : boolean)
	{
	   this.bLandLord = bll;
	   this.img_landlord.visible = this.bLandLord;
	}
 }
}
namespace Card {
export class ui_pokerCardItem extends gameUI.UIbase implements  eui.UIComponent {
    private img_card:eui.Image;
	private card : PokerCard;
	private bSelect:boolean = false;
	private posY:number;

    private imgsource ;
	public constructor() {
		super("resource/custom_skins/ddz_ui/ui_pokerCard.exml");
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_tap,this);
		this.addEventListener( eui.UIEvent.COMPLETE, this.onload, this);
	}


    private onload():void {
            if(this.card == null){
                return
            }
			this.SetImageUrl(this.img_card,this.imgsource );
		}

	public get cardData():PokerCard{
        return this.card;
    }
	
    public set cardData(value:PokerCard){
        this.card = value;
		let index = value.Index;
		let colr = value.Suit;
		let _source = "";
		 if ((index > 0 && index < 16) && (colr >= 0 && colr <= 4))
		 {
             _source = `card_${colr}_${index}_png`;
		 }
		 else
		{
            _source = "card_back_png";
		}
		this.imgsource = _source;

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
 }
}
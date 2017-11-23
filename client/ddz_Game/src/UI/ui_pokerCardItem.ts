class ui_pokerCardItem extends eui.Component implements  eui.UIComponent {
    private img_card:eui.Image;
	private card : PokerCard;
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/ui_pokerCard.exml";
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
            _source = "card_back";
		}
        console.log(_source);
       this.img_card.source = _source;
    }
}
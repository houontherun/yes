/*
* 花色
*/
enum CardColor {
    Diamond = 0,    // 方片
    Heart = 1,      // 梅花
    Club = 2,       // 红心
    Spade = 3,      // 黑桃
    SK = 4,         // 大小王
}
/*
* 类
*/
class PokerCard {
    constructor(color:CardColor, index:number,carddata:Card.Carddata){
        this.color = color;
        this.index = index;
        this.name = carddata.name;
        this.weight = carddata.weight;
    }

    public get Suit():CardColor{
        return this.color;
    }
    public get Index():number{
        return this.index;
    }
    public get Name():string{
        if(this.name != null){
            return this.name;
        }
        return ""
    }
    public get Weight():number{
       return this.weight;
    }
    private color:CardColor;
    private index:number;
    private name:string;
    private weight:number;
}
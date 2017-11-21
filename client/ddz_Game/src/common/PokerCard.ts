/*
* 花色
*/
enum CardColor {
    Diamond = 0,    // 方片
    Heart = 1,      // 梅花
    Club = 2,       // 红心
    Spade = 3,      // 黑桃
    SK = 4,         // 小王
    BK = 5,         // 大王
}
/*
* 类
*/
class PokerCard {
    constructor(color:CardColor, index:number, name?:string){
        this.color = color;
        this.index = index;
        this.name = name;
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

    private color:CardColor;
    private index:number;
    private name:string;
}
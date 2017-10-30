/*
* 扑克牌 类
* Created by panyinglong(503940285@qq.com).
* DateTime: 2017/10/27 18:02
*/

/*
* 花色
*/
enum CardColor {
    Spade = 1,      // 黑桃
    Heart = 2,      // 红心
    Club = 3,       // 梅花
    Diamond = 4,    // 方片
    SK = 5,         // 小王
    BK = 6,         // 大王
}

/*
* 类
*/
class PokerCard extends GameObject {
    constructor(color:CardColor, index:number, name?:string){
        super();
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
// TypeScript file

namespace DouDiZhu {
    // 1,2,3,4,5,6,7,8,9,10,11,12,13 表示黑桃 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A, 2,
    // 14~26表示红桃 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A, 2,
    // 27~39表示梅花 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A, 2,
    // 40~52表示方块 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A, 2,
    // 53, 54表示小王、大王

    var CardNames:Array<any> = [
        {index:1, name:"3"},
        {index:2, name:"4"},
        {index:3, name:"5"},
        {index:4, name:"6"},
        {index:5, name:"7"},
        {index:6, name:"8"},
        {index:7, name:"9"},
        {index:8, name:"10"},
        {index:9, name:"J"},
        {index:10, name:"Q"},
        {index:11, name:"K"},
        {index:12, name:"A"},
        {index:13, name:"2"},
        {index:14, name:"SK"},
        {index:15, name:"BK"}
    ]

    export enum CardTypes{
        PASS_TYPE = -1,     // 过
        ERROR_TYPE = 0,     // 
        SINGLE_TYPE = 1,    // 单牌
        PAIR_TYPE = 2,      // 对子
        TRIO_TYPE = 3,      // 三不带
        TRIOSINGLE_TYPE = 4,    // 三带一
        TRIODOUBLE_TYPE = 5,    // 三带一对
        STRAIGHT_TYPE = 6,      // 顺子
        CONPAIR_TYPE = 7,       // 连对
        AEROPLANE_TYPE = 8,     // 飞机
        AEROPLANES_TYPE = 9,    // 飞机带单
        AEROPLANEL_TYPE = 10,   // 飞机带对子
        FOURSINGLE_TYPE = 11,   // 四带二单
        FOURDOUBLE_TYPE = 12,   // 四带二对
        FAVUS_BOMB_TYPE = 13,   // 癞子炸弹
        BOMB_TYPE = 14,         // 炸弹
        ALLFAVUS_BOMB_TYPE = 15,// 全癞子炸弹
        NUKE_TYPE = 16,         // 王炸
    }

    class Util {
        private static getCardIndex(e:number):number{ // return [1, 15]。1~13表示3,4.5..K,A,2； 14,15表示小王,大王
            if(e < 53){
                return (e - 1) % 13 + 1
            }else{
                return e - (53 - 14)
            }
        }
        private static getCardColor(e:number):CardColor{
            if(e < 53){
                return ((e - 1)/13 + 1) as CardColor
            }else{
                return e - (53 - 5) as CardColor
            }
        }
        public static createPokerCard(e:number):PokerCard{
            var index = Util.getCardIndex(e);
            var color = Util.getCardColor(e);
            var name = CardNames[index].name
            var card = new PokerCard(color, index, name)
            return card;
        }
        private static groupCards(cards:Array<PokerCard>){
            var group = []
            for(var i = 0; i < cards.length; i++){
                var exist = false
                for(var j = 0; j < group.length; j++){
                    if(group[j].index == cards[i].Index){
                        group[j].count++;
                        exist = true;
                        break;
                    }
                }
                if(!exist){
                    group.push({
                        index : cards[i].Index,
                        count : 1
                    })
                }
            }
            return group
        }
        private static sortCards(cards:Array<PokerCard>){
            return cards.sort(function(a, b):number{
                return a.Index - b.Index;
            })
        }
        private static isPAIR_TYPE(cards:Array<PokerCard>){ // 是否是对子
            return cards.length == 2 && cards[0].Index == cards[1].Index
        }
        private static isTRIO_TYPE(cards:Array<PokerCard>){ // 是否是三不带
            return cards.length == 3 && cards[0].Index == cards[1].Index && cards[1].Index == cards[2].Index
        }
        private static isTRIOSINGLE_TYPE(cards:Array<PokerCard>){ // 是否是三带一
            if(cards.length == 4){
                var group = Util.groupCards(cards)
                if(group.length == 2 && (group[0].count == 3 || group[1].count == 3)){
                    return true;
                }
            }
            return false;
        }
        private static isTRIODOUBLE_TYPE(cards:Array<PokerCard>){ // 是否是三带一对
            if(cards.length == 5){
                var group = Util.groupCards(cards)
                if(group.length == 2 && (group[0].count == 3 || group[1].count == 3)){
                    return true;
                }
            }
            return false;
        }
        private static isSTRAIGHT_TYPE(cards:Array<PokerCard>){ // 顺子            
            if(cards.length < 5){
                return false;
            }
            var sort = Util.sortCards(cards)
            var first = sort[0]
            var last = sort[sort.length - 1]
            if(first.Index >= 1 && last.Index <= 12){
                for(var i = 0; i < sort.length - 1; i++){
                    if(sort[i].Index != sort[i + 1].Index - 1){
                        return false;
                    }
                }
                return true;
            }
        }
        private static isCONPAIR_TYPE(cards:Array<PokerCard>){  // 连对
            if(cards.length < 6 || cards.length % 2 != 0){
                return false;
            }
            var sort = Util.sortCards(cards)
            for(var i = 0; i < sort.length - 2; i += 2){
                if(cards[i].Index != cards[i + 1].Index || cards[i].Index != cards[i + 2].Index - 1){
                    return false;
                }
            }
            return true;
        }
        private static isAEROPLANE_TYPE(cards:Array<PokerCard>){// 飞机
            if(cards.length < 6 || cards.length % 3 != 0){
                return false;
            }
            var sort = Util.sortCards(cards)
            for(var i = 0; i < sort.length - 3; i += 3){
                if(cards[i].Index != cards[i + 1].Index || cards[i + 1].Index != cards[i + 2].Index || cards[i].Index != cards[i + 3].Index - 1){
                    return false;
                }
            }
            return true;
        }
        private static isAEROPLANES_TYPE(cards:Array<PokerCard>){// 飞机带单
            if(cards.length < 8 || cards.length % 4 != 0) {
                return false;
            }
            var group = Util.groupCards(cards);
            var threeList = []
            for(var i = 0; i < group.length; i++){
                if(group[i].count == 3){
                    threeList.push(group[i])
                }
            }
            if(threeList.length != cards.length/4){
                return false;
            }
            for(var i = 0; i < threeList.length - 1; i++){
                if(threeList[i].index != threeList[i + 1].index - 1){
                    return false
                }
            }
            return true;
        }
        private static isAEROPLANEL_TYPE(cards:Array<PokerCard>){// 飞机带对子
            if(cards.length < 10 || cards.length % 5 != 0) {
                return false;
            }
            var group = Util.groupCards(cards);
            var threeList = []
            var pairList = []
            for(var i = 0; i < group.length; i++){
                if(group[i].count == 3){
                    threeList.push(group[i])
                }else if(group[i].count == 2){
                    pairList.push(group[i])
                }else{
                    return false;
                }
            }
            if(threeList.length != cards.length/5 || pairList.length != cards.length/5){
                return false;
            }
            for(var i = 0; i < threeList.length; i++){
                if(threeList[i].index != threeList[i + 1].index - 1){
                    return false
                }
            }
            return true
        }
        private static isFOURSINGLE_TYPE(cards:Array<PokerCard>){// 四带二单
            if(cards.length != 6){
                return false
            }
            var group = Util.groupCards(cards)
            if(group.length != 3 && group.length != 2){
                return false;
            }
            for(var i = 0; i < group.length; i++){
                if(group[i].count == 4){
                    return true
                }
            }
            return false
        }
        private static isFOURDOUBLE_TYPE(cards:Array<PokerCard>){// 四带二对
            if(cards.length != 8){
                return false
            }
            var group = Util.groupCards(cards)
            if(group.length != 3){
                return false
            }
            for(var i = 0; i < group.length; i++){
                if(group[i].count != 4 && group[i].count != 2){
                    return false;
                }
            }
            return true
        }
        private static isFAVUS_BOMB_TYPE(cards:Array<PokerCard>){ // 癞子炸弹
            return false
        }
        private static isBOMB_TYPE(cards:Array<PokerCard>){ // 炸弹
            return cards.length == 4 && cards[0].Index == cards[1].Index && cards[1].Index == cards[2].Index && cards[2].Index == cards[3].Index
        }
        private static isALLFAVUS_BOMB_TYPE(cards:Array<PokerCard>){// 全癞子炸弹
            return false
        }
        private static isNUKE_TYPE(cards:Array<PokerCard>){ // 王炸
            return cards.length == 2 && cards[0].Index >= 14 && cards[1].Index >= 14
        }
        public static getCardType(cards:Array<PokerCard>){
            switch(cards.length){
                case 1:
                    return CardTypes.SINGLE_TYPE;
                case 2:
                    if(cards[0].Index == cards[1].Index){
                        return CardTypes.PAIR_TYPE;
                    }else if(cards){

                    }
            }
        }
    }
    
    export class DouDiZhuCtrl extends GameController {    
        constructor(){
            super();
        }

        public requestPrepare():void{
            MessageManager.Instance.SendMessage({
                c:constant.msg.cs_prepare
            })
        }
    }
}


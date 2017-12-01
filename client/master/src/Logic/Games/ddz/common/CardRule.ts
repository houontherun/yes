// TypeScript file

namespace Card {
   
   export interface Carddata {
       weight:number;  //权值
       name?:string     //名字
   }

   export const MASK_COLOR:number = 0xF0;
   export const MASK_VALUE:number = 0x0F;

   export var PackCards:{ [key: number]: Carddata; } = {
        1: {weight:12,name:"A"},
        2: {weight:13,name:"2"},
        3: {weight:1,name:"3"},
        4: {weight:2,name:"4"},
        5: {weight:3,name:"5"},
        6: {weight:4,name:"6"},
        7: {weight:5,name:"7"},
        8: {weight:6,name:"8"},
        9: {weight:7,name:"9"},
        10: {weight:8,name:"10"},
        11: {weight:9,name:"J"},
        12: {weight:10,name:"Q"},
        13: {weight:11,name:"K"},
        14: {weight:14,name:"SK"},
        15: {weight:15,name:"BK"}
   };

    export enum CardTypes{
        PASS_TYPE = -1,     // 过
        ERROR_TYPE = 0,     // 
        SINGLE_TYPE = 1,    // 单牌..
        PAIR_TYPE = 2,      // 对子..
        TRIO_TYPE = 3,      // 三不带..
        TRIOSINGLE_TYPE = 4,    // 三带一qq
        TRIODOUBLE_TYPE = 5,    // 三带一对qq
        STRAIGHT_TYPE = 6,      // 顺子
        CONPAIR_TYPE = 7,       // 连对
        AEROPLANE_TYPE = 8,     // 飞机
        AEROPLANES_TYPE = 9,    // 飞机带单
        AEROPLANEL_TYPE = 10,   // 飞机带对子
        FOURSINGLE_TYPE = 11,   // 四带二单qq
        FOURDOUBLE_TYPE = 12,   // 四带二对qq
        // FAVUS_BOMB_TYPE = 13,   // 癞子炸弹
        BOMB_TYPE = 14,         // 炸弹
        // ALLFAVUS_BOMB_TYPE = 15,// 全癞子炸弹
        NUKE_TYPE = 16,         // 王炸
    }
   // 一手牌
    export class ddzPackCardGroup{
        private cards:Array<PokerCard>
        private cardType:CardTypes
        private group = []
        constructor(cards:Array<PokerCard>){
            this.cards = cards.sort(this.sortCard)
            this.group = Util.groupCards(this.cards)  // 将牌分组格式为：[{index:3, count:2},{index:2, count:1}]
            this.cardType = this.getCardType()
        }
        private sortCard(a, b){
            return a.Weight - b.Weight;
        }
        public get CardType():CardTypes{
            return this.cardType
        }
        public isPress(cardGroup:ddzPackCardGroup):boolean{ // 比大小
            if(this.cardType == CardTypes.ERROR_TYPE || cardGroup.cardType == CardTypes.ERROR_TYPE){
                return false
            }
            if(this.cardType == CardTypes.NUKE_TYPE)     // 自己是王炸
                return true 
            if(cardGroup.cardType == CardTypes.NUKE_TYPE) // 对方是王炸
                return false
            if(this.cardType == CardTypes.BOMB_TYPE){ // 自己是炸弹
                if(cardGroup.cardType == CardTypes.BOMB_TYPE){ // 对方也是炸弹
                    return this.cards[0].Weight > cardGroup.cards[0].Weight
                }else{
                    return true
                }
            }else{
                if(cardGroup.cardType == CardTypes.BOMB_TYPE){ // 对方是炸弹
                    return false
                }
            }
            //以下为双方不是炸弹的情况
            if(this.cardType != cardGroup.cardType){
                return false
            }else{
                if(this.cardType == CardTypes.SINGLE_TYPE || this.cardType == CardTypes.PAIR_TYPE || this.cardType == CardTypes.TRIO_TYPE){
                    return this.cards[0].Weight > cardGroup.cards[0].Weight
                }else if(this.cardType == CardTypes.TRIOSINGLE_TYPE || this.cardType == CardTypes.TRIODOUBLE_TYPE || 
                         this.cardType == CardTypes.FOURSINGLE_TYPE || this.cardType == CardTypes.FOURDOUBLE_TYPE){
                    return this.group[0].weight > cardGroup.group[0].weight
                }else if(this.cardType == CardTypes.STRAIGHT_TYPE || this.cardType == CardTypes.CONPAIR_TYPE || this.cardType == CardTypes.AEROPLANE_TYPE){
                    if(this.cards.length != cardGroup.cards.length){
                        return false
                    }else{
                        return this.cards[0].Weight > cardGroup.cards[0].Weight
                    }
                }else if(this.cardType == CardTypes.AEROPLANES_TYPE || this.cardType == CardTypes.AEROPLANEL_TYPE){
                    if(this.cards.length != cardGroup.cards.length){
                        return false
                    }else{
                        return this.group[0].weight > cardGroup.group[0].weight
                    }
                }
            }
        }
        public get Cards():Array<PokerCard>{
            return this.cards
        }
        public get Group():any{
            return this.group
        }
        
        private getCardType(){
            if(this.isSINGLE_TYPE()) return CardTypes.SINGLE_TYPE
            if(this.isNUKE_TYPE()) return CardTypes.NUKE_TYPE
            if(this.isBOMB_TYPE()) return CardTypes.BOMB_TYPE
            if(this.isPAIR_TYPE()) return CardTypes.PAIR_TYPE
            if(this.isTRIO_TYPE()) return CardTypes.TRIO_TYPE
            if(this.isTRIOSINGLE_TYPE()) return CardTypes.TRIOSINGLE_TYPE
            if(this.isTRIODOUBLE_TYPE()) return CardTypes.TRIODOUBLE_TYPE
            if(this.isSTRAIGHT_TYPE()) return CardTypes.STRAIGHT_TYPE
            if(this.isCONPAIR_TYPE()) return CardTypes.CONPAIR_TYPE
            if(this.isAEROPLANE_TYPE()) return CardTypes.AEROPLANE_TYPE
            if(this.isAEROPLANES_TYPE()) return CardTypes.AEROPLANES_TYPE
            if(this.isAEROPLANEL_TYPE()) return CardTypes.AEROPLANEL_TYPE
            if(this.isFOURSINGLE_TYPE()) return CardTypes.FOURSINGLE_TYPE
            if(this.isFOURDOUBLE_TYPE()) return CardTypes.FOURDOUBLE_TYPE
            return CardTypes.ERROR_TYPE
        }

        private isSINGLE_TYPE(){
            return this.cards.length == 1
        }
        private isPAIR_TYPE(){ // 是否是对子
            return this.cards.length == 2 && this.cards[0].Weight == this.cards[1].Weight
        }
        private isTRIO_TYPE(){ // 是否是三不带
            return this.cards.length == 3 && this.cards[0].Weight == this.cards[1].Weight && this.cards[1].Weight == this.cards[2].Weight
        }
        private isTRIOSINGLE_TYPE(){ // 是否是三带一
            if(this.cards.length == 4){
                if(this.group.length == 2 && this.group[0].count == 3){
                    return true;
                }
            }
            return false;
        }
        private isTRIODOUBLE_TYPE(){ // 是否是三带一对
            if(this.cards.length == 5){
                if(this.group.length == 2 && this.group[0].count == 3 && this.group[1].count == 2){
                    return true;
                }
            }
            return false;
        }
        private isSTRAIGHT_TYPE(){ // 顺子            
            if(this.cards.length < 5){
                return false;
            }
            var first = this.cards[0]
            var last = this.cards[this.cards.length - 1]
            if(first.Weight < 1 || last.Weight > 12){
                return false
            }
            for(var i = 0; i < this.cards.length - 1; i++){
                if(this.cards[i].Weight != this.cards[i + 1].Weight - 1){
                    return false;
                }
            }
            return true;
        }
        private isCONPAIR_TYPE(){  // 连对
            if(this.cards.length < 6 || this.cards.length % 2 != 0){
                return false;
            }
            var first = this.cards[0]
            var last = this.cards[this.cards.length - 1]
            if(first.Weight < 1 || last.Weight > 12){
                return false
            }
            for(var i = 0; i < this.cards.length - 2; i += 2){
                if(this.cards[i].Weight != this.cards[i + 1].Weight || this.cards[i].Weight != this.cards[i + 2].Weight - 1){
                    return false;
                }
            }
            return true;
        }
        private isAEROPLANE_TYPE(){// 飞机
            if(this.cards.length < 6 || this.cards.length % 3 != 0){
                return false;
            }            
            var first = this.cards[0]
            var last = this.cards[this.cards.length - 1]
            if(first.Weight < 1 || last.Weight > 12){
                return false
            }
            for(var i = 0; i < this.cards.length - 3; i += 3){
                if(this.cards[i].Weight != this.cards[i + 1].Weight || this.cards[i + 1].Weight != this.cards[i + 2].Weight || this.cards[i].Weight != this.cards[i + 3].Weight - 1){
                    return false;
                }
            }
            return true;
        }
        private isAEROPLANES_TYPE(){// 飞机带2单
            if(this.cards.length < 8 || this.cards.length % 4 != 0) {
                return false;
            }
            if(this.group.length < 4){ // 最少是3，3，1，1
                return false
            }
            if(this.group[0].weight < 1 || this.group[this.group.length - 3].weight > 12){
                return false
            }
            for(var i = 0; i < this.group.length - 3; i++){
                if(this.group[i].weight != this.group[i + 1].weight - 1){
                    return false
                }
            }
            return true;
        }
        private isAEROPLANEL_TYPE(){// 飞机带2对子
            if(this.cards.length < 10 || this.cards.length % 5 != 0) {
                return false;
            }
            if(this.group.length < 4){ // 最少是3，3，2，2
                return false
            }
            if(this.group[0].weight < 1 || this.group[this.group.length - 3].weight > 12){
                return false
            }
            for(var i = 0; i < this.group.length - 3; i++){
                if(this.group[i].weight != this.group[i + 1].weight - 1){
                    return false
                }
            }
            if(this.group[this.group.length - 1].count != 2 || this.group[this.group.length - 2].count != 2){
                return false
            }
            return true
        }
        private isFOURSINGLE_TYPE(){// 四带二单或一对
            if(this.cards.length != 6){
                return false
            }
            if(this.group.length != 3 && this.group.length != 2){ // =2为带一对
                return false;
            }
            return this.group[0].count == 4
        }
        private isFOURDOUBLE_TYPE(){// 四带二对
            if(this.cards.length != 8){
                return false
            }
            if(this.group.length != 3){
                return false
            }
            return this.group[0].count == 4 && this.group[1].count == 2 && this.group[2].count == 2
        }
        private isBOMB_TYPE(){ // 炸弹
            return this.cards.length == 4 && this.cards[0].Weight == this.cards[1].Weight && this.cards[1].Weight == this.cards[2].Weight && this.cards[2].Weight == this.cards[3].Weight
        }
        private isNUKE_TYPE(){ // 王炸
            return this.cards.length == 2 && this.cards[0].Weight >= 14 && this.cards[1].Weight >= 15
        }
    }


     export enum Identity{
         Farmer,           //农民
         Landlord          //地主
     }

    export enum Seat{
         Left,           //农民
         Right          //地主
     }

    export class Util {
       public static GetCardValue(cb:number):number{
           return (cb & MASK_VALUE); 
       }

       public static GetCardColor(cb:number):number{
           return (cb & MASK_COLOR) /16; 
       }
        public static createPokerCard(e:number,c?:CardColor):PokerCard{
            var index = e;
            var color = c;
            var data = null;
            if(index > 0)
               data = PackCards[e];
            var card = new PokerCard(index, color, data)
            return card;
        }

        public static sortCards(cards:Array<PokerCard>){
            return cards.sort(function(a, b){
                return a.Weight - b.Weight
            })
        }
        // 将牌分组，按index分组，数量越多，组排的越前
        public static groupCards(cards:Array<PokerCard>){
            var dic = {}
            var arr = []
            for(var i = 0; i < cards.length; i++){
                if(dic[cards[i].Index] == undefined){
                    dic[cards[i].Index] = 0
                }
                dic[cards[i].Index]++                
            }
            for(var index in dic){
                arr.push({
                    index:index,
                    count:dic[index],
                    weight:PackCards[index].weight
                })
            }
            arr = arr.sort(function(a, b){
                if(a.count != b.count){
                    return b.count - a.count
                }else{
                    return PackCards[a.index].weight - PackCards[b.index].weight
                }
            })            
            return arr
        }
        // 从分好组的牌里取特定的部分，如取所有3个、对子、单牌等
        public static getGroupCards(group, count){
            var ret = []
            for(var i = 0; i < group.length; i++){
                if(group[i].count == count){
                    ret.push(group[i])
                }
            }
            return ret
        }

        // 获取炸弹，包括4个的和王炸
        public static getBOMBGroup(group){
            var ret = []
            var kingNum = 0
            for(var i = 0; i < group.length; i++){
                if(group[i].count == 4){
                    ret.push([group[i].index, group[i].index, group[i].index, group[i].index])
                }else if(group[i].count == 1 && (group[i].index == 14 || group[i].index == 15)){
                    kingNum++
                }
            }
            if(kingNum == 2){
                ret.push([14, 15])
            }
            return ret
        }

        // 获取连对
        public static getPairsGroup(group, startWeight, endWeight){
            var ret = []
            for(var i = startWeight; i <= endWeight; i++){
                var isOK = false
                for(var j = 0; j < group.length; j++){
                    if((group[j].count == 2 || group[j].count == 3) && group[j].weight == i){
                        ret.concat([group[j].index, group[j].index])
                        isOK = true
                        break
                    }
                }
                if(!isOK){
                    return []
                }
            }
            return ret
        }
        // 获取顺子
        public static getStringGroup(group, startWeight, endWeight){
            var ret = []
            for(var i = startWeight; i <= endWeight; i++){
                var isOK = false
                for(var j = 0; j < group.length; j++){
                    if((group[j].count == 1 || group[j].count == 2 || group[j].count == 3) && group[j].weight == i){
                        ret.push(group[j].index)
                        isOK = true
                        break
                    }
                }
                if(!isOK){
                    return []
                }
            }
            return ret  
        }

        // 输出格式[[index1,index2 ..],[index1, index2 ...], ...]
        public static getPressedCards(handCards:Array<PokerCard>, target:ddzPackCardGroup){
            var ret = []
            var group = Util.groupCards(handCards)
            if(target.CardType == CardTypes.NUKE_TYPE){
                return ret
            }else if(target.CardType == CardTypes.SINGLE_TYPE){ // 单牌
                var g = Util.getGroupCards(group, 1) // 能压的过的单牌
                for(var i = 0; i < g.length; i++){
                    if(g[i].weight > target.Cards[0].Weight){
                        ret.push([g[i].index])
                    }
                }
                g = Util.getBOMBGroup(group)
                ret.concat(g)
                g = Util.getGroupCards(group, 2) 
                for(var i = 0; i < g.length; i++){
                    if(g[i].weight > target.Cards[0].Weight){
                        ret.push([g[i].index])
                    }
                }
            }else if(target.CardType == CardTypes.BOMB_TYPE){// 炸弹
                var g = Util.getBOMBGroup(group)
                for(var i = 0; i < g.length; i++){
                    var wei = PackCards[g[i][0]].weight
                    if(wei > target.Cards[0].Weight){
                        ret.push(g[i])
                    }
                }                
            }else if(target.CardType == CardTypes.PAIR_TYPE){ // 对子
                for(var i = group.length - 1; i >= 0; i--){
                    if((group[i].count == 2 || group[i].count == 3) && group[i].weight > target.Cards[0].Weight){
                        ret.push([group[i].index, group[i].index])
                    }
                }
                var g = Util.getBOMBGroup(group)
                ret.concat(g)
            }else if(target.CardType == CardTypes.TRIO_TYPE){// 三不带
                var g = Util.getGroupCards(group, 3)
                for(var i = 0; i < g.length; i++){
                    var wei = PackCards[g[i][0]].weight
                    if(wei > target.Cards[0].Weight){
                        ret.push(g[i])
                    }
                }
                g = Util.getBOMBGroup(group)
                ret.concat(g)
            }else if(target.CardType == CardTypes.TRIOSINGLE_TYPE){// 三带一
                var single = null
                for(var i = 0; i < group.length; i++){
                    if(group[i].count < 3){
                        if(single == null){
                            single = group[i]
                        }else{
                            if(group[i].count < single){
                                single = group[i]
                            }else{
                                if(group[i].weight < single.weight){
                                    single = group[i]
                                }
                            }
                        }
                    }
                }
                if(single != null){
                    for(var i = 0; i < group.length; i++){
                        if(group[i].count == 3 && group[i].weight > target.Group[0].weight){
                            ret.push([group[i].index, group[i].index, group[i].index, single.index])
                        }        
                    }
                }
                            
                var g = Util.getBOMBGroup(group)
                ret.concat(g)
            }else if(target.CardType == CardTypes.TRIODOUBLE_TYPE){// 三带一对
                var g = Util.getGroupCards(group, 2)
                if(g.length > 0){
                    for(var i = 0; i < group.length; i++){
                        if(group[i].count == 3 && group[i].weight > target.Group[0].weight){
                            ret.push([group[i].index, group[i].index, group[i].index, g[0].index, g[0].index])
                        }        
                    }
                }
                            
                var g = Util.getBOMBGroup(group)
                ret.concat(g)
            }else if(target.CardType == CardTypes.STRAIGHT_TYPE){ // 顺子
                var startWeight = target.Group[0].weight
                var length = target.Group.length
                for(var s = startWeight + 1; s <= 12 - length + 1; s++){
                    var g = Util.getStringGroup(group, s, s + length - 1)
                    if(g.length > 0){
                        ret.push(g)
                    }
                }
                g = Util.getBOMBGroup(group)
                ret.concat(g)
            }else if(target.CardType == CardTypes.CONPAIR_TYPE){ // 连对
                var startWeight = target.Group[0].weight
                var length = target.Group.length
                for(var s = startWeight + 1; s <= 12 - length + 1; s++){
                    var g = Util.getPairsGroup(group, s, s + length - 1)
                    if(g.length > 0){
                        ret.push(g)
                    }
                }
                g = Util.getBOMBGroup(group)
                ret.concat(g)
            }else if(target.CardType == CardTypes.AEROPLANE_TYPE){ // 飞机

            }else if(target.CardType == CardTypes.AEROPLANES_TYPE){// 飞机带单

            }else if(target.CardType == CardTypes.AEROPLANEL_TYPE){// 飞机带对子

            }else if(target.CardType == CardTypes.FOURSINGLE_TYPE){// 四带二单

            }else if(target.CardType == CardTypes.FOURDOUBLE_TYPE){ // 四带二对

            }            
        }
    }
    
}


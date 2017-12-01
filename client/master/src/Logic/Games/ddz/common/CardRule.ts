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
            this.group = this.groupCards()  // 将牌分组格式为：[{index:3, count:2},{index:2, count:1}]
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
        
        // 将牌分组，按index分组，数量越多，组排的越前
        private groupCards(){
            var dic = {}
            var arr = []
            for(var i = 0; i < this.cards.length; i++){
                if(dic[this.cards[i].Index] == undefined){
                    dic[this.cards[i].Index] = 0
                }
                dic[this.cards[i].Index]++                
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
            return this.cards.length == 2 && this.cards[0].Index == this.cards[1].Index
        }
        private isTRIO_TYPE(){ // 是否是三不带
            return this.cards.length == 3 && this.cards[0].Index == this.cards[1].Index && this.cards[1].Index == this.cards[2].Index
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
            if(first.Index < 3 || last.Index > 13){
                return false
            }
            for(var i = 0; i < this.cards.length - 1; i++){
                if(this.cards[i].Index != this.cards[i + 1].Index - 1){
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
            if(first.Index < 3 || last.Index > 13){
                return false
            }
            for(var i = 0; i < this.cards.length - 2; i += 2){
                if(this.cards[i].Index != this.cards[i + 1].Index || this.cards[i].Index != this.cards[i + 2].Index - 1){
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
            if(first.Index < 3 || last.Index > 13){
                return false
            }
            for(var i = 0; i < this.cards.length - 3; i += 3){
                if(this.cards[i].Index != this.cards[i + 1].Index || this.cards[i + 1].Index != this.cards[i + 2].Index || this.cards[i].Index != this.cards[i + 3].Index - 1){
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
            if(this.group[0].index < 3 || this.group[this.group.length - 3].index > 13){
                return false
            }
            for(var i = 0; i < this.group.length - 3; i++){
                if(this.group[i].index != this.group[i + 1].index - 1){
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
            if(this.group[0].index < 3 || this.group[this.group.length - 3].index > 13){
                return false
            }
            for(var i = 0; i < this.group.length - 3; i++){
                if(this.group[i].index != this.group[i + 1].index - 1){
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
            return this.cards.length == 4 && this.cards[0].Index == this.cards[1].Index && this.cards[1].Index == this.cards[2].Index && this.cards[2].Index == this.cards[3].Index
        }
        private isNUKE_TYPE(){ // 王炸
            return this.cards.length == 2 && this.cards[0].Index >= 14 && this.cards[1].Index >= 14
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
    }
    
}


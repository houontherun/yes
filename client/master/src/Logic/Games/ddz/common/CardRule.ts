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
        FOURSINGLE_TYPE = 11,   // 四带二单或一对
        FOURDOUBLE_TYPE = 12,   // 四带二对
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
            if(this.group.length < 3){
                return false
            }
            for(var i = 0; i < this.group.length - 1; i++){
                if(this.group[i].count != 2 || this.group[i + 1].count != 2){
                    return false
                }
                if(this.group[i].weight > 12 || this.group[i + 1].weight > 12){
                    return false
                }
                if(this.group[i].weight != this.group[i + 1].weight - 1){
                    return false
                }
            }
            return true;
        }
        private isAEROPLANE_TYPE(){// 飞机
            if(this.cards.length < 6 || this.cards.length % 3 != 0){
                return false;
            }
            if(this.group.length < 2){
                return false
            }
            for(var i = 0; i < this.group.length - 1; i++){
                if(this.group[i].count != 3 || this.group[i + 1].count != 3){
                    return false
                }
                if(this.group[i].weight > 12 || this.group[i + 1].weight > 12){
                    return false
                }
                if(this.group[i].weight != this.group[i + 1].weight - 1){
                    return false
                }
            }
            return true
        }
        private isAEROPLANES_TYPE(){// 飞机带单
            if(this.cards.length < 8 || this.cards.length % 4 != 0) {
                return false;
            }
            if(this.group.length < 3){ // 最少是3，3，1，1 或 带一对3，3，2
                return false
            }
            var n = this.cards.length / 4
            for(var i = 0; i < n - 1; i++){
                if(this.group[i].count != 3 || this.group[i + 1].count != 3){
                    return false
                }
                if(this.group[i].weight > 12 || this.group[i + 1].weight > 12){
                    return false
                }
                if(this.group[i].weight != this.group[i + 1].weight - 1){
                    return false
                }
            }
            return true;
        }
        private isAEROPLANEL_TYPE(){// 飞机带对子
            if(this.cards.length < 10 || this.cards.length % 5 != 0) {
                return false;
            }
            if(this.group.length < 4){ // 最少是3，3，2，2
                return false
            }
            var n = this.cards.length / 5
            for(var i = 0; i < n - 1; i++){
                if(this.group[i].count != 3 || this.group[i + 1].count != 3){
                    return false
                }
                if(this.group[i].weight > 12 || this.group[i + 1].weight > 12){
                    return false
                }
                if(this.group[i].weight != this.group[i + 1].weight - 1){
                    return false
                }
            }
            for(var i = n; i < this.group.length; i++){
                if(this.group[i].count != 2){
                    return false
                }
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

    // 全部手牌
    export class ddzHandCards{
        private cards:Array<PokerCard>

        private groups = null

        constructor(cards:Array<PokerCard>){
            this.updateCards(cards)
        }
        public updateCards(cards:Array<PokerCard>):void{
            this.cards = this.sortSingleCards(cards)
            this.groupCards()
        }
        private sortSingleCards(cards:Array<PokerCard>):Array<PokerCard>{
            return cards.sort(function(a, b){
                return a.Weight - b.Weight;
            })
        }
        private sortArrayCards(cards:Array<Array<PokerCard>>):Array<Array<PokerCard>>{
            return cards.sort(function(a, b){
                return a[0].Weight - b[0].Weight;
            })
        }
        private groupCards(){
            if(this.cards.length < 1){
                return
            }
            // 将当前的牌按每张牌个数分组
            this.groups = {
                1:[], // 单牌[3,4,5, ...]
                2:[], // 对子[[3,3],[4,4], ...]
                3:[], // 三张牌[[3,3,3], ...]
                4:[], // 四张牌[[3,3,3,3], ...]
                5:[], // 大小王[14,15]
            }
            var currents = [this.cards[0]]
            for(var i = 1; i < this.cards.length; i++){
                if(this.cards[i].Index == currents[currents.length - 1].Index || (currents[currents.length - 1].Index == 14 && this.cards[i].Index == 15)){
                    currents.push(this.cards[i]) // 如果第i张与第i-1张一样则放到一组 （大小王成对视为一组）
                }else{
                    this.addToGroup(currents)
                    currents = []
                    currents.push(this.cards[i])
                }
            } 
            if(currents.length > 0){
                this.addToGroup(currents)
            }
        }
        private addToGroup(cards:Array<PokerCard>){
            if(cards.length == 1){
                this.groups[1].push(cards[0])
            }else if(cards.length == 2){ // 大小王成对的话放到第5组
                if(cards[0].Index == 14 || cards[0].Index == 15){
                    this.groups[5] = cards
                }else{
                    this.groups[2].push(cards)
                }                
            }else if(cards.length == 3){
                this.groups[3].push(cards)
            }else if(cards.length == 4){
                this.groups[4].push(cards)
            }
        }
        // 从当前的cards里减去subCards返回
        private subCardList(subCards:Array<PokerCard>){
            var ret = []
            var subIndex = 0
            var subs = this.sortSingleCards(subCards)
            for(var i = 0; i < this.cards.length; i++){
                if(subs.length > subIndex && subs[subIndex].Index == this.cards[i].Index){ // 遍历列表，如果subCards存在，则不添加
                    subIndex++
                }else{
                    ret.push(this.cards[i])
                }
            }
            return ret
        }
        // 二维级数转一维
        private toPokerArray(cardArrays):Array<PokerCard>{
            var cards = []
            for(var i = 0; i < cardArrays.length; i++){
                cards = cards.concat(cardArrays[i])
            }
            return cards
        }

        // 获取所有的单牌
        private getSingles():Array<PokerCard>{
            var ret = []
            ret = ret.concat(this.groups[1])
            for(var i = 0; i < this.groups[2].length; i++){
                ret.push(this.groups[2][i][0])
            }
            for(var i = 0; i < this.groups[3].length; i++){
                ret.push(this.groups[3][i][0])
            }
            for(var i = 0; i < this.groups[4].length; i++){
                ret.push(this.groups[4][i][0])
            }
            ret = ret.concat(this.groups[5])
            return ret
        }
        // 获取所有的对子
        private getPairs():Array<Array<PokerCard>>{
            var ret = []
            ret = ret.concat(this.groups[2])
            for(var i = 0; i < this.groups[3].length; i++){
                ret.push([this.groups[3][i][0], this.groups[3][i][1]])
            }
            for(var i = 0; i < this.groups[4].length; i++){
                ret.push([this.groups[4][i][0], this.groups[4][i][1]])
            }
            return ret
        }
        // 获取所有的三个的
        private getTrebles():Array<Array<PokerCard>>{
            var ret = []
            ret = ret.concat(this.groups[3])
            for(var i = 0; i < this.groups[4].length; i++){
                ret.push([this.groups[4][i][0], this.groups[4][i][1], this.groups[4][i][2]])
            }
            return ret
        }
        // 获取所有的四个的
        private getQuadruples():Array<Array<PokerCard>>{
            var ret = []
            ret = ret.concat(this.groups[4])
            return ret
        }
        // 获取所有的顺子
        private getStraights():Array<Array<PokerCard>>{
            var ret = []
            var straight = []
            var singles = this.sortSingleCards(this.getSingles())
            for(var i = 0; i < singles.length; i++){
                if(singles[i].Weight >= 1 && singles[i].Weight <= 12){
                    if(straight.length == 0){
                        straight.push(singles[i])
                    }else{
                        if(straight[straight.length - 1].Weight == singles[i].Weight - 1){
                            straight.push(singles[i])
                        }else{
                            if(straight.length >= 5){
                                ret.push(straight)
                            }
                            straight = []
                        }
                    }
                }
            }
            if(straight.length >= 5){
                ret.push(straight)
            }
            straight = []
            return ret
        }
        // 获取所有的连对
        private getConpairs():Array<Array<PokerCard>>{
            var ret = []
            var conpair = []
            var pairs = this.sortArrayCards(this.getPairs())
            for(var i = 0; i < pairs.length; i++){
                if(pairs[i][0].Weight >= 1 && pairs[i][0].Weight <= 12){
                    if(conpair.length == 0){
                        conpair.push(pairs[i])
                    }else{
                        if(conpair[conpair.length - 1][0].Weight == pairs[i][0].Weight - 1){
                            conpair.push(pairs[i])
                        }else{
                            if(conpair.length >= 3){
                                ret.push(conpair)
                            }
                            conpair = []
                        }
                    }
                }
            }
            if(conpair.length >= 3){
                ret.push(conpair)
            }
            conpair = []
            return ret
        }
        // 获取所有的飞机
        private getAeroplanes():Array<Array<PokerCard>>{
            var ret = []
            var aeroplane = []
            var trebles = this.sortArrayCards(this.getTrebles())
            for(var i = 0; i < trebles.length; i++){
                if(trebles[i][0].Weight >= 1 && trebles[i][0].Weight <= 12){
                    if(aeroplane.length == 0){
                        aeroplane.push(trebles[i])
                    }else{
                        if(aeroplane[aeroplane.length - 1][0].Weight == trebles[i][0].Weight - 1){
                            aeroplane.push(trebles[i])
                        }else{
                            if(aeroplane.length >= 2){
                                ret.push(aeroplane)
                            }
                            aeroplane = []
                        }
                    }
                }
            }
            if(aeroplane.length >= 2){
                ret.push(aeroplane)
            }
            aeroplane = []
            return ret
        }
        // 获取所有炸弹，包括王炸
        private getBombs():Array<Array<PokerCard>>{
            var ret = []
            var quadruples = this.getQuadruples()
            for(var i = 0; i < quadruples.length; i++){
                ret.push(quadruples[i])
            }
            if(this.groups[5].length > 0){
                ret.push(this.groups[5])
            }
            return ret
        }

        // 获取所有指定类型的牌
        public getPressedCards(target:ddzPackCardGroup):any{
            var type = target.CardType
            var startCard = target.Cards[0]
            var ret = []
            switch(type){
                case CardTypes.SINGLE_TYPE:{       // 单牌   
                    var singles = this.getSingles()
                    for(var i = 0; i < singles.length; i++){
                        if(singles[i].Weight > startCard.Weight){
                            ret.push([singles[i]])
                        }
                    }
                    var bombs = this.getBombs() // 炸弹
                    ret = ret.concat(bombs)
                    break
                }
                case CardTypes.PAIR_TYPE:{         // 对子 
                    var pairs = this.getPairs()
                    for(var i = 0; i < pairs.length; i++){
                        if(pairs[i][0].Weight > startCard.Weight){
                            ret.push(pairs[i])
                        }
                    }
                    var bombs = this.getBombs() // 炸弹
                    ret = ret.concat(bombs)
                    break
                }
                case CardTypes.TRIO_TYPE:{         // 三不带 
                    var trebles = this.getTrebles()
                    for(var i = 0; i < trebles.length; i++){
                        if(trebles[i][0].Weight > startCard.Weight){
                            ret.push(trebles[i])
                        }
                    } 
                    var bombs = this.getBombs() // 炸弹
                    ret = ret.concat(bombs)
                    break
                }
                case CardTypes.TRIOSINGLE_TYPE:{   // 三带一
                    var trebles = this.getTrebles()
                    for(var i = 0; i < trebles.length; i++){
                        if(trebles[i][0].Weight > startCard.Weight){
                            var triosingle = []
                            var three = trebles[i] // 3张
                            var leftCards = this.subCardList(three)
                            var leftHandObj = new ddzHandCards(leftCards)
                            var singles = leftHandObj.getSingles()
                            if(singles.length > 0){
                                triosingle = triosingle.concat(three)
                                triosingle.push(singles[0])
                                ret.push(triosingle)
                            }
                        }
                    } 
                    var bombs = this.getBombs() // 炸弹
                    ret = ret.concat(bombs)
                    break
                }
                case CardTypes.TRIODOUBLE_TYPE:{   // 三带一对
                    var trebles = this.getTrebles()
                    for(var i = 0; i < trebles.length; i++){
                        if(trebles[i][0].Weight > startCard.Weight){
                            var triodouble = []
                            var three = trebles[i] // 3张
                            var leftCards = this.subCardList(three)
                            var leftHandObj = new ddzHandCards(leftCards)
                            var pairs = leftHandObj.getPairs()
                            if(pairs.length > 0){
                                triodouble = triodouble.concat(three)
                                triodouble = triodouble.concat(pairs[0])
                                ret.push(triodouble)
                            }
                        }
                    } 
                    var bombs = this.getBombs() // 炸弹
                    ret = ret.concat(bombs)
                    break
                }
                case CardTypes.STRAIGHT_TYPE:{     // 顺子
                    var straights = this.getStraights()
                    for(var i = 0; i < straights.length; i++){                        
                        if(straights[i].length >= target.Cards.length){
                            for(var j = 0; j < straights[i].length; j++){
                                if(straights[i][j].Weight > startCard.Weight && (straights[i].length - j) >= target.Cards.length){
                                    var straight = straights[i].slice(j, j + target.Cards.length)
                                    ret.push(straight)
                                }
                            }
                        }
                    }
                    var bombs = this.getBombs() // 炸弹
                    ret = ret.concat(bombs)
                    break
                }
                case CardTypes.CONPAIR_TYPE:{      // 连对
                    var conpairs = this.getConpairs()
                    var len = target.Cards.length/2
                    for(var i = 0; i < conpairs.length; i++){
                        if(conpairs[i].length >= len){
                            for(var j = 0; j < conpairs[i].length; j++){
                                if(conpairs[i][j][0].Weight > startCard.Weight && (conpairs[i].length - j) >= len){
                                    var conpair = conpairs[i].slice(j, j + len)
                                    ret.push(conpair)
                                }
                            }
                        }
                    }
                    var bombs = this.getBombs() // 炸弹
                    ret = ret.concat(bombs)
                    break
                }
                case CardTypes.AEROPLANE_TYPE:{    // 飞机
                    var aeroplanes = this.getAeroplanes()
                    var len = target.Cards.length/3
                    for(var i = 0; i < aeroplanes.length; i++){
                        if(aeroplanes[i].length >= len){
                            for(var j = 0; j < aeroplanes[i].length; j++){
                                if(aeroplanes[i][j][0].Weight > startCard.Weight && (aeroplanes[i].length - j >= len)){
                                    var aeroplane = aeroplanes[i].slice(j, j + len)
                                    ret.push(aeroplane)
                                }
                            }
                        }
                    }
                    var bombs = this.getBombs() // 炸弹
                    ret = ret.concat(bombs)
                    break
                }
                case CardTypes.AEROPLANES_TYPE:{  // 飞机带单
                    var aeroplanes = this.getAeroplanes()
                    var len = target.Cards.length/4
                    for(var i = 0; i < aeroplanes.length; i++){
                        if(aeroplanes[i].length >= len){
                            for(var j = 0; j < aeroplanes[i].length; j++){
                                if(aeroplanes[i][j][0].Weight > startCard.Weight && (aeroplanes[i].length - j >= len)){
                                    var aeroplane = aeroplanes[i].slice(j, j + len)
                                    var cards = this.toPokerArray(aeroplane)
                                    var leftCards = this.subCardList(cards)
                                    var leftHandObj = new ddzHandCards(leftCards)
                                    var singles = leftHandObj.getSingles()
                                    if(singles.length >= len){
                                        var areoplane_single = []
                                        areoplane_single = areoplane_single.concat(cards)
                                        areoplane_single = areoplane_single.concat(singles.slice(0, len))
                                        ret.push(areoplane_single)
                                    }
                                }
                            }
                        }
                    }
                    var bombs = this.getBombs() // 炸弹
                    ret = ret.concat(bombs)
                    break
                }
                case CardTypes.AEROPLANEL_TYPE:{   // 飞机带对子
                    var aeroplanes = this.getAeroplanes()
                    var len = target.Cards.length/5
                    for(var i = 0; i < aeroplanes.length; i++){
                        if(aeroplanes[i].length >= len){
                            for(var j = 0; j < aeroplanes[i].length; j++){
                                if(aeroplanes[i][j][0].Weight > startCard.Weight && (aeroplanes[i].length - j >= len)){
                                    var aeroplane = aeroplanes[i].slice(j, j + len)
                                    var cards = this.toPokerArray(aeroplane)
                                    var leftCards = this.subCardList(cards)
                                    var leftHandObj = new ddzHandCards(leftCards)
                                    var pairs = leftHandObj.getPairs()
                                    if(pairs.length >= len){
                                        var areoplane_pair = []
                                        areoplane_pair = areoplane_pair.concat(cards)
                                        areoplane_pair = areoplane_pair.concat(pairs.slice(0, len))
                                        ret.push(areoplane_pair)
                                    }
                                }
                            }
                        }
                    }
                    var bombs = this.getBombs() // 炸弹
                    ret = ret.concat(bombs)
                    break
                }
                case CardTypes.FOURSINGLE_TYPE:{   // 四带二单或一对
                    var quadruples = this.getQuadruples()
                    for(var i = 0; i < quadruples.length; i++){
                        if(quadruples[i][0].Weight > startCard.Weight){
                            var cards = quadruples[i]
                            var leftCards = this.subCardList(cards)
                            var leftHandObj = new ddzHandCards(leftCards)
                            var si = []
                            for(var i = 0; i < leftHandObj.groups[1].length; i++){
                                if(si.length < 2){
                                    si.push(leftHandObj.groups[1][i])
                                }else{
                                    break
                                }
                            }
                            if(si.length < 2){
                                for(var g = 2; g <= 4; g++){ // group
                                    for(var i = 0; i < leftHandObj.groups[g].length; i++){
                                        for(var j = 0; j < g; j++){
                                            if(si.length < 2){
                                                si.push(leftHandObj.groups[g][i][j])
                                            }else{
                                                break
                                            }
                                        }
                                    }
                                }
                            }
                            if(si.length < 2){
                                for(var i = 0; i < leftHandObj.groups[5].length; i++){
                                    if(si.length < 2){
                                        si.push(leftHandObj.groups[5][i])
                                    }else{
                                        break
                                    }
                                }
                            }
                            if(si.length >= 2){
                                var four_pair = []
                                four_pair = four_pair.concat(cards)
                                four_pair = four_pair.concat(si)
                                ret.push(four_pair)
                            }
                        }
                    }
                    var bombs = this.getBombs() // 炸弹
                    ret = ret.concat(bombs)
                    break
                }
                case CardTypes.FOURDOUBLE_TYPE:{   // 四带二对
                    var quadruples = this.getQuadruples()
                    for(var i = 0; i < quadruples.length; i++){
                        if(quadruples[i][0].Weight > startCard.Weight){
                            var cards = quadruples[i]
                            var leftCards = this.subCardList(cards)
                            var leftHandObj = new ddzHandCards(leftCards)
                            var pairs = leftHandObj.getPairs()
                            if(pairs.length >= 2){
                                var four_pair2 = []
                                four_pair2 = four_pair2.concat(cards)
                                four_pair2 = four_pair2.concat(pairs[0])
                                four_pair2 = four_pair2.concat(pairs[1])
                                ret.push(four_pair2)
                            }
                        }
                    }
                    var bombs = this.getBombs() // 炸弹
                    ret = ret.concat(bombs)
                    break
                }
                case CardTypes.BOMB_TYPE:{         // 炸弹
                    var quadruples = this.getQuadruples()
                    for(var i = 0; i < quadruples.length; i++){
                        if(quadruples[i][0].Weight > startCard.Weight){
                            ret.push(quadruples[i])
                        }
                    }
                    if(this.groups[5].length > 0){
                        ret.push[this.groups[5]]
                    }
                    break
                }
                case CardTypes.NUKE_TYPE:{         // 王炸              
                    break;
                }
            }
            return ret
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
       
       public static GetSCCarddata(card:PokerCard):number{
           return (card.Suit<< 0x04) + card.Index; 
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
                return b.Weight - a.Weight
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
        
    }
    
}


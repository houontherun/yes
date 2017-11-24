// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Card;
(function (Card) {
    Card.PackCards = {
        1: { weight: 12, name: "A" },
        2: { weight: 13, name: "2" },
        3: { weight: 1, name: "3" },
        4: { weight: 2, name: "4" },
        5: { weight: 3, name: "5" },
        6: { weight: 4, name: "6" },
        7: { weight: 5, name: "7" },
        8: { weight: 6, name: "8" },
        9: { weight: 7, name: "9" },
        10: { weight: 8, name: "10" },
        11: { weight: 9, name: "J" },
        12: { weight: 10, name: "Q" },
        13: { weight: 11, name: "K" },
        14: { weight: 14, name: "SK" },
        15: { weight: 15, name: "BK" }
    };
    var CardTypes;
    (function (CardTypes) {
        CardTypes[CardTypes["PASS_TYPE"] = -1] = "PASS_TYPE";
        CardTypes[CardTypes["ERROR_TYPE"] = 0] = "ERROR_TYPE";
        CardTypes[CardTypes["SINGLE_TYPE"] = 1] = "SINGLE_TYPE";
        CardTypes[CardTypes["PAIR_TYPE"] = 2] = "PAIR_TYPE";
        CardTypes[CardTypes["TRIO_TYPE"] = 3] = "TRIO_TYPE";
        CardTypes[CardTypes["TRIOSINGLE_TYPE"] = 4] = "TRIOSINGLE_TYPE";
        CardTypes[CardTypes["TRIODOUBLE_TYPE"] = 5] = "TRIODOUBLE_TYPE";
        CardTypes[CardTypes["STRAIGHT_TYPE"] = 6] = "STRAIGHT_TYPE";
        CardTypes[CardTypes["CONPAIR_TYPE"] = 7] = "CONPAIR_TYPE";
        CardTypes[CardTypes["AEROPLANE_TYPE"] = 8] = "AEROPLANE_TYPE";
        CardTypes[CardTypes["AEROPLANES_TYPE"] = 9] = "AEROPLANES_TYPE";
        CardTypes[CardTypes["AEROPLANEL_TYPE"] = 10] = "AEROPLANEL_TYPE";
        CardTypes[CardTypes["FOURSINGLE_TYPE"] = 11] = "FOURSINGLE_TYPE";
        CardTypes[CardTypes["FOURDOUBLE_TYPE"] = 12] = "FOURDOUBLE_TYPE";
        CardTypes[CardTypes["FAVUS_BOMB_TYPE"] = 13] = "FAVUS_BOMB_TYPE";
        CardTypes[CardTypes["BOMB_TYPE"] = 14] = "BOMB_TYPE";
        CardTypes[CardTypes["ALLFAVUS_BOMB_TYPE"] = 15] = "ALLFAVUS_BOMB_TYPE";
        CardTypes[CardTypes["NUKE_TYPE"] = 16] = "NUKE_TYPE";
    })(CardTypes = Card.CardTypes || (Card.CardTypes = {}));
    var Identity;
    (function (Identity) {
        Identity[Identity["Farmer"] = 0] = "Farmer";
        Identity[Identity["Landlord"] = 1] = "Landlord"; //地主
    })(Identity = Card.Identity || (Card.Identity = {}));
    var Util = (function () {
        function Util() {
        }
        Util.createPokerCard = function (e, c) {
            var index = e;
            var color = c;
            var data = Card.PackCards[e];
            var card = new PokerCard(color, index, data);
            return card;
        };
        Util.groupCards = function (cards) {
            var group = [];
            for (var i = 0; i < cards.length; i++) {
                var exist = false;
                for (var j = 0; j < group.length; j++) {
                    if (group[j].index == cards[i].Index) {
                        group[j].count++;
                        exist = true;
                        break;
                    }
                }
                if (!exist) {
                    group.push({
                        index: cards[i].Index,
                        count: 1
                    });
                }
            }
            return group;
        };
        Util.sortCards = function (cards) {
            return cards.sort(function (a, b) {
                return b.Weight - a.Weight;
            });
        };
        Util.isPAIR_TYPE = function (cards) {
            return cards.length == 2 && cards[0].Index == cards[1].Index;
        };
        Util.isTRIO_TYPE = function (cards) {
            return cards.length == 3 && cards[0].Index == cards[1].Index && cards[1].Index == cards[2].Index;
        };
        Util.isTRIOSINGLE_TYPE = function (cards) {
            if (cards.length == 4) {
                var group = Util.groupCards(cards);
                if (group.length == 2 && (group[0].count == 3 || group[1].count == 3)) {
                    return true;
                }
            }
            return false;
        };
        Util.isTRIODOUBLE_TYPE = function (cards) {
            if (cards.length == 5) {
                var group = Util.groupCards(cards);
                if (group.length == 2 && (group[0].count == 3 || group[1].count == 3)) {
                    return true;
                }
            }
            return false;
        };
        Util.isSTRAIGHT_TYPE = function (cards) {
            if (cards.length < 5) {
                return false;
            }
            var sort = Util.sortCards(cards);
            var first = sort[0];
            var last = sort[sort.length - 1];
            if (first.Index >= 1 && last.Index <= 12) {
                for (var i = 0; i < sort.length - 1; i++) {
                    if (sort[i].Index != sort[i + 1].Index - 1) {
                        return false;
                    }
                }
                return true;
            }
        };
        Util.isCONPAIR_TYPE = function (cards) {
            if (cards.length < 6 || cards.length % 2 != 0) {
                return false;
            }
            var sort = Util.sortCards(cards);
            for (var i = 0; i < sort.length - 2; i += 2) {
                if (cards[i].Index != cards[i + 1].Index || cards[i].Index != cards[i + 2].Index - 1) {
                    return false;
                }
            }
            return true;
        };
        Util.isAEROPLANE_TYPE = function (cards) {
            if (cards.length < 6 || cards.length % 3 != 0) {
                return false;
            }
            var sort = Util.sortCards(cards);
            for (var i = 0; i < sort.length - 3; i += 3) {
                if (cards[i].Index != cards[i + 1].Index || cards[i + 1].Index != cards[i + 2].Index || cards[i].Index != cards[i + 3].Index - 1) {
                    return false;
                }
            }
            return true;
        };
        Util.isAEROPLANES_TYPE = function (cards) {
            if (cards.length < 8 || cards.length % 4 != 0) {
                return false;
            }
            var group = Util.groupCards(cards);
            var threeList = [];
            for (var i = 0; i < group.length; i++) {
                if (group[i].count == 3) {
                    threeList.push(group[i]);
                }
            }
            if (threeList.length != cards.length / 4) {
                return false;
            }
            for (var i = 0; i < threeList.length - 1; i++) {
                if (threeList[i].index != threeList[i + 1].index - 1) {
                    return false;
                }
            }
            return true;
        };
        Util.isAEROPLANEL_TYPE = function (cards) {
            if (cards.length < 10 || cards.length % 5 != 0) {
                return false;
            }
            var group = Util.groupCards(cards);
            var threeList = [];
            var pairList = [];
            for (var i = 0; i < group.length; i++) {
                if (group[i].count == 3) {
                    threeList.push(group[i]);
                }
                else if (group[i].count == 2) {
                    pairList.push(group[i]);
                }
                else {
                    return false;
                }
            }
            if (threeList.length != cards.length / 5 || pairList.length != cards.length / 5) {
                return false;
            }
            for (var i = 0; i < threeList.length; i++) {
                if (threeList[i].index != threeList[i + 1].index - 1) {
                    return false;
                }
            }
            return true;
        };
        Util.isFOURSINGLE_TYPE = function (cards) {
            if (cards.length != 6) {
                return false;
            }
            var group = Util.groupCards(cards);
            if (group.length != 3 && group.length != 2) {
                return false;
            }
            for (var i = 0; i < group.length; i++) {
                if (group[i].count == 4) {
                    return true;
                }
            }
            return false;
        };
        Util.isFOURDOUBLE_TYPE = function (cards) {
            if (cards.length != 8) {
                return false;
            }
            var group = Util.groupCards(cards);
            if (group.length != 3) {
                return false;
            }
            for (var i = 0; i < group.length; i++) {
                if (group[i].count != 4 && group[i].count != 2) {
                    return false;
                }
            }
            return true;
        };
        Util.isFAVUS_BOMB_TYPE = function (cards) {
            return false;
        };
        Util.isBOMB_TYPE = function (cards) {
            return cards.length == 4 && cards[0].Index == cards[1].Index && cards[1].Index == cards[2].Index && cards[2].Index == cards[3].Index;
        };
        Util.isALLFAVUS_BOMB_TYPE = function (cards) {
            return false;
        };
        Util.isNUKE_TYPE = function (cards) {
            return cards.length == 2 && cards[0].Index >= 14 && cards[1].Index >= 14;
        };
        Util.getCardType = function (cards) {
            switch (cards.length) {
                case 1:
                    return CardTypes.SINGLE_TYPE;
                case 2:
                    if (cards[0].Index == cards[1].Index) {
                        return CardTypes.PAIR_TYPE;
                    }
                    else if (cards) {
                    }
            }
        };
        return Util;
    }());
    Card.Util = Util;
    __reflect(Util.prototype, "Card.Util");
})(Card || (Card = {}));
//# sourceMappingURL=CardRule.js.map
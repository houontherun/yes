// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DouDiZhu;
(function (DouDiZhu) {
    // 1,2,3,4,5,6,7,8,9,10,11,12,13 表示黑桃 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A, 2,
    // 14~26表示红桃 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A, 2,
    // 27~39表示梅花 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A, 2,
    // 40~52表示方块 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A, 2,
    // 53, 54表示小王、大王
    var CardNames = [
        { index: 1, name: "3" },
        { index: 2, name: "4" },
        { index: 3, name: "5" },
        { index: 4, name: "6" },
        { index: 5, name: "7" },
        { index: 6, name: "8" },
        { index: 7, name: "9" },
        { index: 8, name: "10" },
        { index: 9, name: "J" },
        { index: 10, name: "Q" },
        { index: 11, name: "K" },
        { index: 12, name: "A" },
        { index: 13, name: "2" },
        { index: 14, name: "SK" },
        { index: 15, name: "BK" }
    ];
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
    })(CardTypes = DouDiZhu.CardTypes || (DouDiZhu.CardTypes = {}));
    var Util = (function () {
        function Util() {
        }
        Util.getCardIndex = function (e) {
            if (e < 53) {
                return (e - 1) % 13 + 1;
            }
            else {
                return e - (53 - 14);
            }
        };
        Util.getCardColor = function (e) {
            if (e < 53) {
                return ((e - 1) / 13 + 1);
            }
            else {
                return e - (53 - 5);
            }
        };
        Util.createPokerCard = function (e) {
            var index = Util.getCardIndex(e);
            var color = Util.getCardColor(e);
            var name = CardNames[index].name;
            var card = new PokerCard(color, index, name);
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
                return a.Index - b.Index;
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
    __reflect(Util.prototype, "Util");
    var DouDiZhuCtrl = (function (_super) {
        __extends(DouDiZhuCtrl, _super);
        function DouDiZhuCtrl() {
            return _super.call(this) || this;
        }
        DouDiZhuCtrl.prototype.requestPrepare = function () {
            MessageManager.Instance.SendMessage({});
        };
        return DouDiZhuCtrl;
    }(GameController));
    DouDiZhu.DouDiZhuCtrl = DouDiZhuCtrl;
    __reflect(DouDiZhuCtrl.prototype, "DouDiZhu.DouDiZhuCtrl");
})(DouDiZhu || (DouDiZhu = {}));
//# sourceMappingURL=DouDiZhuCtrl.js.map
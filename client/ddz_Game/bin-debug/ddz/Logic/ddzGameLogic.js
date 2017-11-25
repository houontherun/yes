var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 斗地主逻辑
 * @author  yanwei47@163.com
 *
 */
var CardLogic;
(function (CardLogic) {
    var ddzGameLogic = (function () {
        function ddzGameLogic() {
            this.bStartgame = false;
            this.StartgameTick = 0;
            this.allCardList = [];
            this.CreateDeck();
            //egret.startTick(this.onUpdateFrame, this);
            this.timer = new egret.Timer(100);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.onUpdateFrame, this);
            this.timer.start();
            this.timerTick = CardLogic.Timer.Instance.tick;
        }
        ddzGameLogic.Shared = function () {
            if (ddzGameLogic.shared == null) {
                ddzGameLogic.shared = new ddzGameLogic();
            }
            return ddzGameLogic.shared;
        };
        ddzGameLogic.prototype.ExitGame = function () {
            this.bStartgame = false;
            this.StartgameTick = 0;
            //egret.stopTick(this.onUpdateFrame, this);
            this.timer.stop();
        };
        ddzGameLogic.prototype.ResetGame = function () {
            this.bStartgame = false;
            this.StartgameTick = 0;
            this.timer.reset();
        };
        ddzGameLogic.prototype.onUpdateFrame = function () {
            if (this.timerTick != null) {
                this.timerTick();
            }
            this.StartgameTick++;
        };
        //创建一副牌
        ddzGameLogic.prototype.CreateDeck = function () {
            var Colorlist = [CardColor.Diamond, CardColor.Heart, CardColor.Club, CardColor.Spade];
            for (var _color = 0; _color < 4; _color++) {
                for (var _index = 1; _index < 14; _index++) {
                    var color = Colorlist[_color];
                    var card = Card.Util.createPokerCard(_index, color);
                    this.allCardList.push(card);
                }
            }
            var skcard = Card.Util.createPokerCard(14, CardColor.SK);
            var bkcard = Card.Util.createPokerCard(15, CardColor.SK);
            this.allCardList.push(skcard);
            this.allCardList.push(bkcard);
        };
        ddzGameLogic.prototype.shuffle = function (array) {
            var m = array.length, t, i;
            while (m) {
                i = Math.floor(Math.random() * m--);
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }
        };
        ddzGameLogic.prototype.Shuffle = function () {
            if (this.allCardList.length == 54) {
                this.shuffle(this.allCardList);
                for (var i = 0; i < this.allCardList.length; i++) {
                    //console.log(this.allCardList[i]);
                }
            }
        };
        ddzGameLogic.prototype.DispatchCardStart = function () {
            this.bStartgame = true;
            var addHardEvent = new CardLogic.CardEvent(CardLogic.CardEvent.AddHard);
            addHardEvent.paramObj = this.allCardList.slice(0, 17);
            CardLogic.CardEventDispatcher.Instance.dispatchEvent(addHardEvent);
        };
        return ddzGameLogic;
    }());
    CardLogic.ddzGameLogic = ddzGameLogic;
    __reflect(ddzGameLogic.prototype, "CardLogic.ddzGameLogic");
})(CardLogic || (CardLogic = {}));
//# sourceMappingURL=ddzGameLogic.js.map
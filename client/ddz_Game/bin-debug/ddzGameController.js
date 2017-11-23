var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DDZGameController = (function () {
    function DDZGameController() {
        this.bStartgame = false;
        this.StartgameTick = 0;
        this.allCardList = [];
        this.CreateDeck();
        egret.startTick(this.onUpdateFrame, this);
    }
    DDZGameController.Shared = function () {
        if (DDZGameController.shared == null) {
            DDZGameController.shared = new DDZGameController();
        }
        return DDZGameController.shared;
    };
    DDZGameController.prototype.ExitGame = function () {
        this.bStartgame = false;
        this.StartgameTick = 0;
        egret.stopTick(this.onUpdateFrame, this);
    };
    DDZGameController.prototype.ResetGame = function () {
        this.bStartgame = false;
        this.StartgameTick = 0;
    };
    DDZGameController.prototype.onUpdateFrame = function (timeStamp) {
        var now = timeStamp;
        var time = this.StartgameTick;
        var pass = now - time;
        //console.log("pass: ",( pass/1000).toFixed(5));
        return false;
    };
    //创建一副牌
    DDZGameController.prototype.CreateDeck = function () {
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
    DDZGameController.prototype.shuffle = function (array) {
        var m = array.length, t, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
    };
    DDZGameController.prototype.Shuffle = function () {
        if (this.allCardList.length == 54) {
            this.shuffle(this.allCardList);
            for (var i = 0; i < this.allCardList.length; i++) {
                //console.log(this.allCardList[i]);
            }
        }
    };
    DDZGameController.prototype.DispatchCardStart = function () {
        this.bStartgame = true;
        this.StartgameTick = egret.getTimer();
        ui_game.Shared().AddhardCard(this.allCardList.slice(0, 17));
    };
    return DDZGameController;
}());
__reflect(DDZGameController.prototype, "DDZGameController");
//# sourceMappingURL=ddzGameController.js.map
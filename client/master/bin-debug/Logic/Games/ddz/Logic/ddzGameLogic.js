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
/**
 * 斗地主逻辑
 * @author  yanwei47@163.com
 *
 */
var CardLogic;
(function (CardLogic) {
    var ddzGameLogic = (function (_super) {
        __extends(ddzGameLogic, _super);
        function ddzGameLogic() {
            var _this = _super.call(this) || this;
            _this.bStartgame = false;
            _this.StartgameTick = 0;
            _this.players = [];
            _this.allCardList = [];
            return _this;
        }
        Object.defineProperty(ddzGameLogic, "Instance", {
            get: function () {
                if (ddzGameLogic.shared == null) {
                    ddzGameLogic.shared = new ddzGameLogic();
                }
                return ddzGameLogic.shared;
            },
            enumerable: true,
            configurable: true
        });
        ddzGameLogic.prototype.init = function () {
            this.timer = new egret.Timer(100);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.onUpdateFrame, this);
            this.timer.start();
            this.timerTick = CardLogic.Timer.Instance.tick;
            this.UpdatePlayersEvent = new CardLogic.CardEvent(CardLogic.CardEvent.UpdatePlayers);
            MessageManager.Instance.addEventListener(constant.msg.SC_TABLE_PLAYER_INFO, this.UpdatePlayers, this);
        };
        Object.defineProperty(ddzGameLogic.prototype, "ALLPlayers", {
            get: function () {
                return this.players;
            },
            enumerable: true,
            configurable: true
        });
        ddzGameLogic.prototype.UpdatePlayers = function (data) {
            this.players = [];
            for (var i = 0; i < data.players.length; i++) {
                var ud = new UserData(data.players[i]);
                this.players.push(ud);
            }
            CardLogic.CardEventDispatcher.Instance.dispatchEvent(this.UpdatePlayersEvent);
        };
        ddzGameLogic.prototype.ExitGame = function () {
            this.bStartgame = false;
            this.StartgameTick = 0;
            //egret.stopTick(this.onUpdateFrame, this);
            this.timer.stop();
            MessageManager.Instance.removeEventListener(constant.msg.SC_TABLE_PLAYER_INFO, this.UpdatePlayers, this);
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
        ddzGameLogic.prototype.DispatchCardStart = function () {
            this.bStartgame = true;
        };
        return ddzGameLogic;
    }(Dispatcher));
    CardLogic.ddzGameLogic = ddzGameLogic;
    __reflect(ddzGameLogic.prototype, "CardLogic.ddzGameLogic");
})(CardLogic || (CardLogic = {}));
//# sourceMappingURL=ddzGameLogic.js.map
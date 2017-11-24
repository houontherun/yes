/**
 * 时间定时器
 * @author  yanwei47@163.com
 *
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CardLogic;
(function (CardLogic) {
    var TimerInfo = (function () {
        function TimerInfo(seconds, func, num, args) {
            this.stop = false;
            this.remove = false;
            this.locked = false;
            this.tick = 0;
            this.args = null;
            this.func = func;
            this.seconds = seconds;
            this.num = num;
            this.args = args;
        }
        Object.defineProperty(TimerInfo.prototype, "Locked", {
            get: function () {
                return this.locked;
            },
            set: function (value) {
                this.locked = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimerInfo.prototype, "Remove", {
            get: function () {
                return this.remove;
            },
            set: function (value) {
                this.remove = value;
            },
            enumerable: true,
            configurable: true
        });
        TimerInfo.prototype.recycle = function () {
            this.args = null;
            this.func = null;
        };
        TimerInfo.prototype.Tick = function (t) {
            if (this.stop || this.locked) {
                return;
            }
            this.tick = this.tick + t;
            if (this.tick >= this.seconds) {
                this.tick = 0;
                this.locked = true;
                if (this.func != null) {
                    this.func(this.args);
                }
                this.locked = false;
                if (this.num > 0) {
                    this.num = this.num - 1;
                    if (this.num <= 0) {
                        this.remove = true;
                        this.stop = true;
                    }
                }
            }
        };
        return TimerInfo;
    }());
    __reflect(TimerInfo.prototype, "TimerInfo");
    var Timer = (function () {
        function Timer() {
            var _this = this;
            this.timers = [];
            this.tick = function () {
                for (var _i = 0, _a = _this.timers; _i < _a.length; _i++) {
                    var timer = _a[_i];
                    if (timer.Remove || timer.Locked) {
                        var index = _this.timers.indexOf(timer);
                        if (index > -1)
                            _this.timers.splice(index, 1);
                        timer.recycle();
                        timer = null;
                    }
                    else {
                        timer.Tick(0.1);
                    }
                }
            };
        }
        Object.defineProperty(Timer, "Instance", {
            get: function () {
                if (Timer.instance == null) {
                    Timer.instance = new Timer();
                }
                return Timer.instance;
            },
            enumerable: true,
            configurable: true
        });
        Timer.prototype.Delay = function (sec, func, args) {
            var timer = new TimerInfo(sec, func, 1, args);
            this.timers.push(timer);
            return timer;
        };
        Timer.prototype.Repeat = function (sec, func, args) {
            var timer = new TimerInfo(sec, func, 0, args);
            this.timers.push(timer);
            return timer;
        };
        Timer.prototype.Numberal = function (sec, func, num, args) {
            var timer = new TimerInfo(sec, func, num, args);
            this.timers.push(timer);
            return timer;
        };
        Timer.prototype.Remove = function (timerinfo) {
            if (timerinfo) {
                timerinfo.Remove = true;
            }
        };
        return Timer;
    }());
    CardLogic.Timer = Timer;
    __reflect(Timer.prototype, "CardLogic.Timer");
})(CardLogic || (CardLogic = {}));
//# sourceMappingURL=Timer.js.map
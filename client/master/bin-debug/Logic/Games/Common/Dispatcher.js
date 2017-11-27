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
var Dispatcher = (function (_super) {
    __extends(Dispatcher, _super);
    function Dispatcher() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._eventMap = {};
        return _this;
    }
    Dispatcher.prototype.addEventListener = function (eventID, callback, thisObj) {
        if (this.hasEventListener(eventID, callback, thisObj))
            return console.log('repeat add Event');
        var list = this._eventMap[eventID];
        if (!list) {
            list = [];
            this._eventMap[eventID] = list;
        }
        list.push({ eventID: eventID, callback: callback, thisObj: thisObj });
    };
    Dispatcher.prototype.hasEventListener = function (eventID, callback, thisObj) {
        var list = this._eventMap[eventID];
        if (!list)
            return false;
        var len = list.length;
        for (var idx = 0; idx < len; idx++) {
            var eventData = list[idx];
            if (eventData && eventData.callback === callback && eventData.thisObj === thisObj) {
                return true;
            }
        }
        return false;
    };
    Dispatcher.prototype.removeEventListener = function (eventID, callback, thisObj) {
        var list = this._eventMap[eventID];
        var len = list.length;
        for (var idx = 0; idx < len; idx++) {
            var eventData = list[idx];
            if (eventData && eventData.callback === callback && eventData.thisObj === thisObj) {
                list.splice(idx, 1);
                break;
            }
        }
    };
    Dispatcher.prototype.removeEventListenerByTarget = function (thisObj) {
        for (var key in this._eventMap) {
            var list = this._eventMap[key];
            this._eventMap[key] = list.filter(function (value) {
                return !(value.thisObj === thisObj);
            }, this);
        }
    };
    Dispatcher.prototype.dispatchEvent = function (eventID, data) {
        var list = this._eventMap[eventID];
        if (!list)
            return;
        var cloneList = list.slice(0);
        var len = cloneList.length;
        for (var idx = 0; idx < len; idx++) {
            var eventData = cloneList[idx];
            eventData.callback.call(eventData.thisObj, data);
        }
    };
    return Dispatcher;
}(GameObject));
__reflect(Dispatcher.prototype, "Dispatcher");
//# sourceMappingURL=Dispatcher.js.map
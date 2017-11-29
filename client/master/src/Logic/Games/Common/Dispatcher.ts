// TypeScript file

class Dispatcher extends GameObject{
    constructor(){
        super()
    }
    private _eventMap: any = {};

    public addEventListener(eventID: any, callback: Function, thisObj: any): void {
        if (this.hasEventListener(eventID, callback, thisObj)) 
            return console.log('repeat add Event');
        var list: Array<any> = this._eventMap[eventID];
        if (!list) {
            list = [];
            this._eventMap[eventID] = list;
        }
        list.push({ eventID: eventID, callback: callback, thisObj: thisObj});
    }

    public hasEventListener(eventID: any, callback: Function, thisObj: any): boolean {
        var list: Array<any> = this._eventMap[eventID];
        if (!list) 
            return false;
        var len: number = list.length;
        for (var idx = 0; idx < len; idx++) {
            var eventData = list[idx];
            if (eventData && eventData.callback === callback && eventData.thisObj === thisObj) {
                return true;
            }
        }
        return false;
    }

    public removeEventListener(eventID: any, callback: Function, thisObj: any): void {
        var list: Array<any> = this._eventMap[eventID];
        var len: number = list.length;
        for (var idx = 0; idx < len; idx++) {
            var eventData = list[idx];
            if (eventData && eventData.callback === callback && eventData.thisObj === thisObj) {
                list.splice(idx, 1);
                break;
            }
        }
    }

    public removeEventListenerByTarget(thisObj: any): void {
        for (var key in this._eventMap) {
            var list: Array<any> = this._eventMap[key];
            this._eventMap[key] = list.filter(function (value): boolean {
                return !(value.thisObj === thisObj);
            }, this);
        }
    }

    public dispatchEvent(eventID: any, data?: any): void {
        var list: Array<any> = this._eventMap[eventID];
        if (!list) 
            return;
        var cloneList: Array<any> = list.slice(0);
        var len: number = cloneList.length;
        for (var idx = 0; idx < len; idx++) {
            var eventData = cloneList[idx];
            eventData.callback.call(eventData.thisObj, data);
        }
    }
}
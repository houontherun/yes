// TypeScript file

class Dispatcher extends GameObject{
    constructor(){
        super()
    }
    private _eventMap: any = {};

    private add(eventID: any, callback: Function, thisObj: any, repeat:number){
        if (this.hasEventListener(eventID, callback, thisObj)) {
            console.log('repeat add Event:' + eventID.toString())
            return ;
        }
            
        var list: Array<any> = this._eventMap[eventID];
        if (!list) {
            list = [];
            this._eventMap[eventID] = list;
        }
        list.push({ eventID: eventID, callback: callback, thisObj: thisObj, repeat:repeat});
    }

    public addEventListener(eventID: any, callback: Function, thisObj: any): void {
        this.add(eventID, callback, thisObj, -1)
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

    public once(eventID: any, callback: Function, thisObj: any){
        this.add(eventID, callback, thisObj, 1)
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
        for (var idx = len - 1; idx >= 0; idx--) {
            var eventData = cloneList[idx];
            eventData.callback.call(eventData.thisObj, data);
            if(eventData.repeat > 0){
                eventData.repeat--
                if(eventData.repeat <= 0){
                    list.splice(idx, 1)
                }
            }
        }
    }
}
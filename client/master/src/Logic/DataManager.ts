// TypeScript file
// 道具data
class ItemData{
    public id:number
    public name:string
    public desc:string
    public overlay:number
    public price:number
    public type:number
    public para1:number
    public para2:number
    public icon:string

    constructor(item:any){
        this.id = item.ID
        this.name = item.Name1
        this.desc = item.Description1
        this.overlay = item.OverlayNum
        this.price = item.GoldPrice
        this.type = item.Type
        this.para1 = item.Para1
        this.para2 = item.Para2
        this.icon = item.Icon
    }
}  

// 充值数据
class ChargeData{
    public rmb:number
    public item:ItemData
    public num:number
    public giveItem:ItemData
    public giveNum:number
    constructor(charge:any){
        this.rmb = charge.rmb
        if(charge.reward.length == 2){
            this.item = DataManager.Instance.getItemInfo(charge.reward[0])
            this.num = charge.reward[1]
        }
        if(charge.presenter.length == 2){
            this.giveItem = DataManager.Instance.getItemInfo(charge.presenter[0])
            this.giveNum = charge.presenter[1]
        }
    }
}
// 商城数据
class ShopData{
    public id:number
    public costType:number
    public label:number
    public item:ItemData
    constructor(shop:any){
        this.id = shop.ID
        this.costType = shop.Money
        this.label = shop.Laber
        this.item = DataManager.Instance.getItemInfo(shop.Item)
    }
}

class DataManager extends Dispatcher {
    public static Instance : DataManager = new DataManager();
    constructor() {
        super();
    }

    public getGames():any{
        var jsonData = RES.getRes('hall_json')
        var games = {
            1:[],
            2:[],
            3:[]
        }
        for(var id in jsonData.Game){
            var game = jsonData.Game[id]
            games[game.type].push(game)
        }
        return games
    }
    public getJsonData(name:string):any{
        var jsonData = RES.getRes(name + '_json')
        return jsonData
    }

    public getItemInfo(id:number):any{
        var items = this.getJsonData('items')
        for(var itemid in items.Item){
            var item = items.Item[itemid]
            if(item.ID == id){
                return new ItemData(item)
            }
        }
        return null
    }

    public getLanguageList():Array<Object>{
        var list = []
        var cfg = DataManager.Instance.getJsonData("text")
        for(var l in cfg.LangList){
            list.push(cfg.LangList[l])
        }
        return list 
    }

    // public getJson(name, callback:Function, thisObject){
    //     var path = "resource/config/" + name + ".json"
    //     if(this.jsonList[path] == null || this.jsonList[path] == undefined){
    //         RES.getResAsync(path, (data, key)=>{
    //             if(key == path){
    //                 callback.call(thisObject, data, key)
    //             }
    //         }, this)
    //     }
    //     return this.jsonList[path]
    // }
}
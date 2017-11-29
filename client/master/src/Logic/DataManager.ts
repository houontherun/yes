// TypeScript file

class DataManager extends Dispatcher {
    public static Instance : DataManager = new DataManager();
    constructor() {
        super();
    }

    private jsonList = {}

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
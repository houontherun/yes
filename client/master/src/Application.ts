// TypeScript file

class Application {
    public static Init(){
        ResourceManager.Instance.Init()
        PlayerManager.Instance.Init()
        RoomManager.Instance.Init()
        ChatManager.Instance.Init()
    }

    private static packageInfo:any = null
    private static language:string = null

    private static childGameCount:number = 0
    private static childGames = null

    private static defaultChildGameIds = null
    private static defaultChildGameRes = null

    private static lastGameId:number = 0

    public static InitPackageInfo(){
        var packageName = Application.PackageName
        var cfg = DataManager.Instance.getJsonData("hall")
        for(var key in cfg.package){
            if(cfg.package[key].package == packageName){
                Application.packageInfo = cfg.package[key]
                Application.language = cfg.package[key].Lang
                Application.defaultChildGameIds = cfg.package[key].game
            }
        }
        Application.defaultChildGameRes = []
        for(var i = 0; i < Application.defaultChildGameIds.length; i++){
            var gameId = Application.defaultChildGameIds[i]
            Application.defaultChildGameRes.push(cfg.Game[gameId].ResName)
        }
        
        Application.childGameCount = 0
        Application.childGames = {
            1:[],
            2:[],
            3:[]
        }
        for(var id in cfg.Game){
            var game = cfg.Game[id]
            if(game[Application.PackageName] == 1){
                Application.childGameCount++
                Application.childGames[game.type].push(game)
                Application.lastGameId = game.ID
            }
        }
    }

    public static get LastGameId():number{
        return Application.lastGameId
    }

    public static get PackageName():string{
        return 'package1'
    } 
    public static get Language():string{
        return Application.language
    }
    public static get PackageInfo():any{
        return Application.packageInfo
    }
    public static get ChildGames():any{
        return Application.childGames
    }
    public static get ChildGameCount():any{
        return Application.childGameCount
    }
}
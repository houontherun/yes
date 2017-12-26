// TypeScript file

class Util{
    // 格式化数字: 123456.12 => 123,456.12
    public static formatNum(num:number):string {
        var integer = Math.floor(num) // 四舍五入
        var float = Math.floor((num - integer)*100)

        var res = integer.toString()
        var sections = []
        while(res.length > 3){
            sections.push(res.slice(res.length - 3, res.length)) 
            res = res.substr(0, res.length - 3)
        }

        for(var i = sections.length - 1; i >=0; i--){
            res += ',' + sections[i]
        }
        if(float > 0){
            res += "." + float.toString()
        }
        return res
    }

    // 本地存储
    public static getItem(key:string){
        return egret.localStorage.getItem(key) 
    } 
    public static setItem(key:string, value:string){
        return egret.localStorage.setItem(key, value) 
    } 

    public static uiText(id):string{
        var cfg = DataManager.Instance.getJsonData("text")
        if(cfg.UIText[id]){
            return cfg.UIText[id].NR
        }else{
            return id
        }
    }
    public static backText(id):string{
        var cfg = DataManager.Instance.getJsonData("text")
        if(cfg.BackText[id]){
            return cfg.UIText[id].NR
        }else{
            return id
        }
    }
    public static tableText(id):string{
        var cfg = DataManager.Instance.getJsonData("text")
        if(cfg.UIText[id]){
            return cfg.TableText[id].NR
        }else{
            return id
        }
    }
}
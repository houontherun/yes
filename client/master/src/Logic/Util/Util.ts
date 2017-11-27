// TypeScript file

class Util{
    // 格式化数字: 123456.12 => 123,456.12
    public static formatNum(num:number):string {
        console.log('num:' + num)
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
        console.log('res ' + res)
        return res
    }
}
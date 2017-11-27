// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Util = (function () {
    function Util() {
    }
    // 格式化数字: 123456.12 => 123,456.12
    Util.formatNum = function (num) {
        console.log('num:' + num);
        var integer = Math.floor(num); // 四舍五入
        var float = Math.floor((num - integer) * 100);
        var res = integer.toString();
        var sections = [];
        while (res.length > 3) {
            sections.push(res.slice(res.length - 3, res.length));
            res = res.substr(0, res.length - 3);
        }
        for (var i = sections.length - 1; i >= 0; i--) {
            res += ',' + sections[i];
        }
        if (float > 0) {
            res += "." + float.toString();
        }
        console.log('res ' + res);
        return res;
    };
    return Util;
}());
__reflect(Util.prototype, "Util");
//# sourceMappingURL=Util.js.map
/*
* 基类
* Created by panyinglong(503940285@qq.com).
* DateTime: 2017/10/27 20：07
*/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameObject = (function () {
    function GameObject() {
    }
    return GameObject;
}());
__reflect(GameObject.prototype, "GameObject");
//# sourceMappingURL=GameObject.js.map
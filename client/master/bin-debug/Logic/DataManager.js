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
var DataManager = (function (_super) {
    __extends(DataManager, _super);
    function DataManager() {
        var _this = _super.call(this) || this;
        _this.jsonList = {};
        return _this;
    }
    DataManager.prototype.getGames = function () {
        var jsonData = RES.getRes('hall_json');
        var games = {
            1: [],
            2: [],
            3: []
        };
        for (var id in jsonData.Game) {
            var game = jsonData.Game[id];
            games[game.type].push(game);
        }
        return games;
    };
    DataManager.prototype.getJsonData = function (name) {
        var jsonData = RES.getRes(name + '_json');
        return jsonData;
    };
    DataManager.Instance = new DataManager();
    return DataManager;
}(Dispatcher));
__reflect(DataManager.prototype, "DataManager");
//# sourceMappingURL=DataManager.js.map
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
var ui_game = (function (_super) {
    __extends(ui_game, _super);
    function ui_game() {
        var _this = _super.call(this, "resource/eui_skins/ui_game.exml") || this;
        _this.AddClick(_this.btn_tuoguan, function () {
        }, _this);
        return _this;
    }
    ui_game.Shared = function () {
        if (ui_game.shared == null) {
            ui_game.shared = new ui_game();
        }
        return ui_game.shared;
    };
    return ui_game;
}(gameUI.base));
__reflect(ui_game.prototype, "ui_game");
//# sourceMappingURL=ui_game.js.map
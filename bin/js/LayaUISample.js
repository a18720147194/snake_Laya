var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var test = ui.test.TestPageUI;
var Label = Laya.Label;
var Handler = Laya.Handler;
var Loader = Laya.Loader;
var WebGL = Laya.WebGL;
var _Event = Laya.Event;
var Sprite = Laya.Sprite;
var Tween = Laya.Tween;
var TestUI = /** @class */ (function (_super) {
    __extends(TestUI, _super);
    function TestUI() {
        var _this = _super.call(this) || this;
        _this.isStart = false;
        _this.my_count = 100;
        _this.arrow = 0;
        _this.my_list = [];
        _this.elements = [];
        _this.scoreCount = 0;
        //btn是编辑器界面设定的，代码里面能直接使用，并且有代码提示
        //初始化场景
        _this.init();
        _this.start.on(_Event.CLICK, _this, function () {
            if (this.isStart)
                return;
            this.isStart = true;
            this.gameStart();
        });
        var _loop_1 = function (i) {
            this_1["btn_" + i].on(_Event.CLICK, this_1, function () {
                var count = this.arrow % 2;
                if (i % 2 == count)
                    return;
                this.arrow = i;
            });
        };
        var this_1 = this;
        for (var i = 1; i <= 4; i++) {
            _loop_1(i);
        }
        Laya.stage.on(_Event.KEY_DOWN, _this, function (e) {
            if (e.keyCode >= 37 && e.keyCode <= 40) {
                var count = this.arrow % 2;
                if ((e.keyCode - 36) % 2 == count)
                    return;
                this.arrow = e.keyCode - 36;
            }
        });
        return _this;
    }
    TestUI.prototype.init = function () {
        var bg = new Sprite();
        this.addChild(bg);
        bg.size(300, 300).pos(150, 50);
        this.trail = new Sprite();
        this.addChild(this.trail);
        this.trail.size(300, 300).pos(150, 50);
        this.food = new Sprite();
        this.addChild(this.food);
        this.food.size(300, 300).pos(150, 50);
        this.main_bg = bg;
        bg.graphics.drawRect(0, 0, 300, 300, "#fff");
        for (var i = 0; i < 30; i++) {
            for (var j = 0; j < 30; j++) {
                this.elements.push({ x: i * 10, y: j * 10 });
            }
        }
        this.addMy();
    };
    TestUI.prototype.addMy = function () {
        this.my = new Sprite();
        this.main_bg.addChild(this.my);
        this.my.size(10, 10).pos(150, 150);
        this.my.graphics.drawRect(0, 0, 10, 10, "#2fb007");
    };
    TestUI.prototype.gameStart = function () {
        console.log("start");
        this.arrow = 3;
        this.ani();
        this.addFood();
    };
    TestUI.prototype.gameOver = function () {
        console.log("游戏结束");
        this.isStart = false;
        this.trail.graphics.clear();
        this.my.removeSelf();
        this.my_list = [];
        this.scoreCount = 0;
        this.score.text = 0 + "";
        this.addMy();
    };
    TestUI.prototype.judgePosition = function () {
        var x = this.my.x, y = this.my.y;
        switch (this.arrow) {
            case 1:
                x = this.my.x - 10;
                break;
            case 2:
                y = this.my.y - 10;
                break;
            case 3:
                x = this.my.x + 10;
                break;
            case 4:
                y = this.my.y + 10;
                break;
            default: console.log("错误");
        }
        return { x: x, y: y };
    };
    TestUI.prototype.judgeOver = function () {
        var _this = this;
        return this.my.x >= 300 || this.my.y < 0 || this.my.y >= 300 || this.my.x < 0 || (function () {
            var flag = false;
            for (var i = 0; i < _this.my_list.length; i++) {
                var obj = _this.my_list[i];
                var next = _this.judgePosition();
                // let rect1 = new Laya.Rectangle(x, y, 10, 10);
                // let rect2 = new Laya.Rectangle(obj.x, obj.y, 10, 10);
                // if(rect1.intersects(rect2))flag = true;
                if (next.x == obj.x && next.y == obj.y)
                    flag = true;
            }
            return flag;
        })();
    };
    TestUI.prototype.judgeFood = function () {
        var obj = this.judgePosition();
        if (!this.foodPosition)
            return;
        if (obj.x == this.foodPosition.x && obj.y == this.foodPosition.y) {
            this.my_count++;
            this.scoreCount++;
            this.score.text = this.scoreCount + '';
            this.addFood();
        }
    };
    TestUI.prototype.ani = function () {
        var time = 100;
        var length = 10;
        if (this.judgeOver()) {
            this.gameOver();
            return;
        }
        //画痕迹
        if (this.my_list.length >= this.my_count)
            this.my_list.splice(0, 1);
        this.my_list.push({ x: this.my.x, y: this.my.y });
        this.trail.graphics.clear();
        for (var i = 0; i < this.my_list.length; i++) {
            var obj = this.my_list[i];
            this.trail.graphics.drawRect(obj.x, obj.y, 10, 10, "#2fb007");
        }
        //判断失误
        this.judgeFood();
        switch (this.arrow) {
            case 2:
                Tween.to(this.my, { y: this.my.y - length }, time, null, Handler.create(this, this.ani));
                break;
            case 3:
                Tween.to(this.my, { x: this.my.x + length }, time, null, Handler.create(this, this.ani));
                break;
            case 4:
                Tween.to(this.my, { y: this.my.y + length }, time, null, Handler.create(this, this.ani));
                break;
            case 1:
                Tween.to(this.my, { x: this.my.x - length }, time, null, Handler.create(this, this.ani));
                break;
            default: console.log("错误");
        }
    };
    TestUI.prototype.addFood = function () {
        this.food.graphics.clear();
        var list = [];
        for (var i = 0; i < 900; i++) {
            list.push(i);
        }
        var has = [];
        for (var i = 0; i < this.my_list.length; i++) {
            var count = this.my_list[i].x / 10 + this.my_list[i].y * 3;
            has.push(count);
        }
        has.sort(function (a, b) {
            return b - a;
        });
        for (var i = 0; i < has.length; i++) {
            list.splice(has[i], 1);
        }
        var obj = this.elements[list[Math.floor(Math.random() * list.length)]];
        this.food.graphics.drawRect(obj.x, obj.y, 10, 10, "#ff0000");
        this.foodPosition = { x: obj.x, y: obj.y };
    };
    return TestUI;
}(ui.test.TestPageUI));
//程序入口
Laya.init(600, 400, WebGL);
//激活资源版本控制
Laya.ResourceVersion.enable("version.json", Handler.create(null, beginLoad), Laya.ResourceVersion.FILENAME_VERSION);
function beginLoad() {
    Laya.loader.load("res/atlas/comp.atlas", Handler.create(null, onLoaded));
}
function onLoaded() {
    //实例UI界面
    var testUI = new TestUI();
    Laya.stage.addChild(testUI);
}
//# sourceMappingURL=LayaUISample.js.map
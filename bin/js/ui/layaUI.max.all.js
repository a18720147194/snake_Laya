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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var test;
    (function (test) {
        var TestPageUI = /** @class */ (function (_super) {
            __extends(TestPageUI, _super);
            function TestPageUI() {
                return _super.call(this) || this;
            }
            TestPageUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.test.TestPageUI.uiView);
            };
            TestPageUI.uiView = { "type": "View", "props": { "width": 600, "height": 400 }, "child": [{ "type": "Image", "props": { "y": 301, "x": 477, "var": "start", "skin": "comp/bg.png" }, "child": [{ "type": "Text", "props": { "y": 27, "x": 17, "width": 62, "text": "Start", "height": 30, "fontSize": 30, "color": "#000000", "align": "center" } }] }, { "type": "Image", "props": { "y": 228, "x": 485, "width": 29, "var": "btn_1", "skin": "comp/arrow-left.png", "height": 23 } }, { "type": "Image", "props": { "y": 285, "x": 522, "width": 29, "var": "btn_4", "skin": "comp/arrow-left.png", "rotation": 270, "height": 23 } }, { "type": "Image", "props": { "y": 192, "x": 544, "width": 29, "var": "btn_2", "skin": "comp/arrow-left.png", "rotation": 90, "height": 23 } }, { "type": "Image", "props": { "y": 251, "x": 578, "width": 29, "var": "btn_3", "skin": "comp/arrow-left.png", "rotation": 180, "height": 23 } }, { "type": "Text", "props": { "y": 34, "x": 486, "width": 93, "var": "score", "text": "0", "height": 51, "fontSize": 50, "color": "#ff3100", "align": "center" } }] };
            return TestPageUI;
        }(View));
        test.TestPageUI = TestPageUI;
    })(test = ui.test || (ui.test = {}));
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map
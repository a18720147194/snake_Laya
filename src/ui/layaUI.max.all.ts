
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.test {
    export class TestPageUI extends View {
		public start:Laya.Image;
		public btn_1:Laya.Image;
		public btn_4:Laya.Image;
		public btn_2:Laya.Image;
		public btn_3:Laya.Image;
		public score:laya.display.Text;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":301,"x":477,"var":"start","skin":"comp/bg.png"},"child":[{"type":"Text","props":{"y":27,"x":17,"width":62,"text":"Start","height":30,"fontSize":30,"color":"#000000","align":"center"}}]},{"type":"Image","props":{"y":228,"x":485,"width":29,"var":"btn_1","skin":"comp/arrow-left.png","height":23}},{"type":"Image","props":{"y":285,"x":522,"width":29,"var":"btn_4","skin":"comp/arrow-left.png","rotation":270,"height":23}},{"type":"Image","props":{"y":192,"x":544,"width":29,"var":"btn_2","skin":"comp/arrow-left.png","rotation":90,"height":23}},{"type":"Image","props":{"y":251,"x":578,"width":29,"var":"btn_3","skin":"comp/arrow-left.png","rotation":180,"height":23}},{"type":"Text","props":{"y":34,"x":486,"width":93,"var":"score","text":"0","height":51,"fontSize":50,"color":"#ff3100","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.test.TestPageUI.uiView);

        }

    }
}

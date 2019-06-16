import test = ui.test.TestPageUI;
import Label = Laya.Label;
import Handler = Laya.Handler;
import Loader = Laya.Loader;
import WebGL = Laya.WebGL;
import _Event = Laya.Event;
import Sprite = Laya.Sprite;
import Tween = Laya.Tween;

class TestUI extends ui.test.TestPageUI {
	public main_bg:Sprite;
	public isStart:boolean = false;
	public my:Sprite;
	public my_count:number = 100;
	public arrow:number = 0;
	public my_list:any[] = [];
	public trail:Sprite;
	public food:Sprite;
	public elements:any[] = [];
	public foodPosition:any;
	public scoreCount:number=0;
	constructor() {
		super();
		//btn是编辑器界面设定的，代码里面能直接使用，并且有代码提示

		//初始化场景
		this.init();
		this.start.on(_Event.CLICK, this, function(){
			if(this.isStart) return;
			this.isStart = true;
			this.gameStart();
		});

		for(let i = 1; i <= 4; i++){
			this[`btn_`+i].on(_Event.CLICK, this, function(){
				let count = this.arrow%2;
				if(i%2==count) return;
				this.arrow = i;
			});
		}

		Laya.stage.on(_Event.KEY_DOWN, this, function(e){
			if(e.keyCode>=37 && e.keyCode<=40){
				let count = this.arrow%2;
				if((e.keyCode - 36)%2==count) return;
				this.arrow = e.keyCode - 36;
			}
		});

		
	}

	private init ():void{
		let bg = new Sprite(); this.addChild(bg); bg.size(300, 300).pos(150, 50);
		this.trail = new Sprite(); this.addChild(this.trail); this.trail.size(300, 300).pos(150, 50);
		this.food = new Sprite(); this.addChild(this.food); this.food.size(300, 300).pos(150, 50);
		this.main_bg = bg;
		bg.graphics.drawRect(0, 0, 300, 300, "#fff");

		for(let i=0;i<30;i++){
			for(let j=0;j<30;j++){
				this.elements.push({x:i*10,y:j*10});
			}
		}

		this.addMy();
	}
	private addMy ():void{
		this.my = new Sprite(); this.main_bg.addChild(this.my);
		this.my.size(10, 10).pos(150, 150);
		this.my.graphics.drawRect(0, 0, 10, 10, "#2fb007");
	}

	private gameStart ():void{
		console.log("start");
		this.arrow = 3;
		this.ani();
		this.addFood();
	}
	private gameOver ():void{
		console.log("游戏结束");
		this.isStart = false;
		this.trail.graphics.clear();
		this.my.removeSelf();
		this.my_list = [];
		this.scoreCount = 0;
		this.score.text = 0+"";
		this.addMy();
	}
	private judgePosition ():any{
		let x= this.my.x,y=this.my.y;
		switch(this.arrow){
			case 1: x=this.my.x-10;break;
			case 2: y=this.my.y-10;break;
			case 3: x=this.my.x+10;break;
			case 4: y=this.my.y+10;break;
			default : console.log("错误");
		}
		return {x,y};
	}
	private judgeOver ():boolean {
		return this.my.x >= 300 || this.my.y < 0 || this.my.y >= 300 || this.my.x < 0 || (()=>{
			let flag = false;
			for(let i=0;i<this.my_list.length;i++){
				let obj = this.my_list[i];
				let next = this.judgePosition();
				// let rect1 = new Laya.Rectangle(x, y, 10, 10);
				// let rect2 = new Laya.Rectangle(obj.x, obj.y, 10, 10);
				// if(rect1.intersects(rect2))flag = true;
				if(next.x==obj.x&&next.y==obj.y)flag = true;
			}
			return flag;
		})();
	}
	private judgeFood ():void{
		let obj = this.judgePosition();
		if(!this.foodPosition) return;
		if(obj.x==this.foodPosition.x && obj.y==this.foodPosition.y){
			this.my_count ++;
			this.scoreCount++;
			this.score.text = this.scoreCount+'';
			this.addFood();
		}
	}

	private ani ():void{
		let time = 100;
		let length = 10;
		if(this.judgeOver()) {
			this.gameOver();
			return;
		}
		//画痕迹
		if(this.my_list.length>=this.my_count)this.my_list.splice(0,1);
		this.my_list.push({x:this.my.x, y:this.my.y});
		this.trail.graphics.clear();
		for(let i=0;i<this.my_list.length;i++){
			let obj = this.my_list[i];
			this.trail.graphics.drawRect(obj.x, obj.y, 10, 10, "#2fb007");
		}
		//判断失误
		this.judgeFood();
		switch(this.arrow){
			case 2 : Tween.to(this.my, {y:this.my.y-length}, time, null, Handler.create(this, this.ani));break;
			case 3 : Tween.to(this.my, {x:this.my.x+length}, time, null, Handler.create(this, this.ani));break;
			case 4 : Tween.to(this.my, {y:this.my.y+length}, time, null, Handler.create(this, this.ani));break;
			case 1 : Tween.to(this.my, {x:this.my.x-length}, time, null, Handler.create(this, this.ani));break;
			default : console.log("错误");
		}
		
	}
	private addFood ():void{
		this.food.graphics.clear();
		let list = [];
		for(let i=0;i<900;i++){
			list.push(i);
		}
		let has = [];
		for(let i=0;i<this.my_list.length;i++){
			let count = this.my_list[i].x/10 + this.my_list[i].y*3;
			has.push(count);
		}
		has.sort(function(a,b){
			return b-a;
		});
		for(let i=0;i<has.length;i++){
			list.splice(has[i],1);
		}
		let obj = this.elements[list[Math.floor(Math.random()*list.length)]];

		this.food.graphics.drawRect(obj.x, obj.y, 10, 10,"#ff0000");
		this.foodPosition = {x:obj.x,y:obj.y};
	}

}

//程序入口
Laya.init(600, 400, WebGL);
//激活资源版本控制
Laya.ResourceVersion.enable("version.json", Handler.create(null, beginLoad), Laya.ResourceVersion.FILENAME_VERSION);

function beginLoad(){
	Laya.loader.load("res/atlas/comp.atlas", Handler.create(null, onLoaded));
}

function onLoaded(): void {
	//实例UI界面
	var testUI: TestUI = new TestUI();
	Laya.stage.addChild(testUI);
}
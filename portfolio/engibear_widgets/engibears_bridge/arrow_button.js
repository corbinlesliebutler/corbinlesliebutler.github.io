(function (){
	engibear.ArrowButton = function(){
		var count = 0;
		const HIT_W = 150;
		const HIT_H = 150;
		//const HIT_X = -5;
		//const HIT_Y = 0;
		const SIN_CO = 0.006;
		const BTN_SCALE = 0.8;
		const BTN_SCALE_CHANGE = 0.02;
		
		var enabled = true;
		
		var view = this.view = new createjs.Container();
		
		//shine
		var shine = new engibear.Shine();
		view.addChild(shine.view);
		shine.view.scaleX = shine.view.scaleY = 0.5;
		
		//btn
		var img = engibear.preload.getResult("arrow_button");
		var btn = new createjs.Bitmap(img);
		btn.regX = img.width/2;
		btn.regY = img.height/2;
		btn.x = 5;
		view.addChild(btn);
		
		//hitArea
		var hitArea = new createjs.Shape();
		hitArea.graphics.beginFill("DeepSkyBlue").drawRect(-HIT_W/2, -HIT_H/2, HIT_W, HIT_H);
		//view.addChild(hitArea);
		view.hitArea = hitArea;
		//hitArea.alpha = 0.5;
		//hitArea.visible = false;
		
		this.disable = function()
		{
			enabled = false;
			view.mouseEnabled = false;
			btn.alpha = 0.5;
			shine.view.visible = false;
		}
		
		this.enable = function()
		{
			enabled = true;
			view.mouseEnabled = true;
			btn.alpha = 1;
			shine.view.visible = true;
		}
		
		this.update = function(time)
		{
			if(enabled)
			{
				shine.update(time);
				count += time;
				var sin = Math.sin(count*SIN_CO);
				btn.scaleX = btn.scaleY = BTN_SCALE + sin*BTN_SCALE_CHANGE;
			}
		}
	}
})();
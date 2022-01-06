(function (){
	engibear.OKButton = function(imgId){
		var count = 0;
		var SIN_CO = 0.006;
		var BTN_SCALE = 0.95;
		var BTN_SCALE_CHANGE = 0.02;
		var BTN_ROT = 5;
		var BTN_ROT_CHANGE = 5;
		
		var view = this.view = new createjs.Container();
		
		//shine
		//var shine = new engibear.Shine({r:150, g:255, b:150});
		var shine = new engibear.Shine();
		view.addChild(shine.view);
		shine.view.scaleX = shine.view.scaleY = 0.7;
		
		//btn
		var img = engibear.preload.getResult(imgId);
		var btn = new createjs.Bitmap(img);
		btn.regX = img.width/2;
		btn.regY = img.height/2;
		btn.x = 20;
		view.addChild(btn);
		
		this.update = function(time)
		{
			shine.update(time);
			count += time;
			var sin = Math.sin(count*SIN_CO);
			btn.scaleX = btn.scaleY = BTN_SCALE + sin*BTN_SCALE_CHANGE;
			btn.rotation = BTN_ROT + sin*BTN_ROT_CHANGE;
		}
	}
})();
(function (){
	engibear.Books = function(){
		var count = 0;
		var SIN_CO = 0.003;
		var SCALE = 0.95;
		var SCALE_CHANGE = 0.01;
		var ROT = 0;
		var ROT_CHANGE = 2;
		
		var view = this.view = new createjs.Container();
		
		//shine
		var shine = new engibear.Shine();
		view.addChild(shine.view);
		//shine.view.scaleX = shine.view.scaleY = 0.7;
		
		//img
		var img = engibear.preload.getResult("books");
		var bmp = new createjs.Bitmap(img);
		bmp.regX = img.width/2;
		bmp.regY = img.height/2;
		view.addChild(bmp);
		
		//hitare
		var hitArea = new createjs.Shape();
		hitArea.graphics.beginFill("#FFF").drawRect(-img.width/2, -img.height/2, img.width, img.height);
		//view.addChild(hitArea);
		
		view.hitArea = hitArea;
		
		this.update = function(time)
		{
			shine.update(time);
			count += time;
			var sin = Math.sin(count*SIN_CO);
			bmp.scaleX = bmp.scaleY = (SCALE + sin*SCALE_CHANGE) * 1/0.8;
			bmp.rotation = ROT + sin*ROT_CHANGE;
		}
	}
})();
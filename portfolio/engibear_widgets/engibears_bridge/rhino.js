(function (){
	engibear.Rhino = function(){
		
		var view = this.view = new createjs.Container();
		var img;
		var bmp;
		var stickLeft;
		var stickRight;
		
		img = engibear.preload.getResult("rhino");
		var bmp = new createjs.Bitmap(img);
		bmp.scaleX = bmp.scaleY = 1/0.6;
		view.addChild(bmp);
		
		img = engibear.preload.getResult("stick_left");
		stickLeft = new createjs.Bitmap(img);
		view.addChild(stickLeft);
		
		img = engibear.preload.getResult("stick_right");
		stickRight = new createjs.Bitmap(img);
		view.addChild(stickRight);
		
		stickLeft.x = stickRight.x = 387;
		stickLeft.y = stickRight.y = 266;
		
		stickLeft.visible = stickRight.visible = false;
		
		this.release = function()
		{
			stickLeft.visible = false;
			stickRight.visible = false;
		}
		
		this.right = function()
		{
			stickLeft.visible = false;
			stickRight.visible = true;
		}
		
		this.left = function()
		{
			stickLeft.visible = true;
			stickRight.visible = false;
		}
	}
})();
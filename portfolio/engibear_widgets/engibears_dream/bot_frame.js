(function (){
	engibear.BotFrame = function(col){
		
		var BAR_HEIGHT = 71;
		var BAR_REPEAT = 7;
		
		var view = this.view = new createjs.Container();
		var img = engibear.preload.getResult("frame_top");
		var bmpTop = new createjs.Bitmap(img);
		bmpTop.regX = img.width/2;
		view.addChild(bmpTop);
		
		for(var i = 0; i < BAR_REPEAT; i++)
		{
			img = engibear.preload.getResult("frame_bar");
			var bmpBar = new createjs.Bitmap(img);
			bmpBar.regX = img.width/2;
			bmpBar.x = -2;
			bmpBar.y = 85 + BAR_HEIGHT*i;
			view.addChild(bmpBar);
		}
	}
})();
(function (){
	engibear.ArrowButton = function(imgOff, imgOn, cX, cY){
		
		this.cX = cX;
		this.cY = cY;
		var view = this.view = new createjs.Container();
		
		var img;
		img = engibear.preload.getResult(imgOff);
		var offBmp = new createjs.Bitmap(img);
		img = engibear.preload.getResult(imgOn);
		var onBmp = new createjs.Bitmap(img);
		onBmp.visible = false;
		
		view.addChild(offBmp);
		view.addChild(onBmp);
		
		this.turnOn = function()
		{
			onBmp.visible = true;
			offBmp.visible = false;
		}
	}
})();
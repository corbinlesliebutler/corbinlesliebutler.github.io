(function (){
	engibear.Bar = function(len){
		this.length = len;
		var view = this.view = new createjs.Container();
		//bar
		var img = engibear.preload.getResult("bar");
		var bmp = new createjs.Bitmap(img);
		bmp.regY = img.height/2;
		bmp.scaleX = len/img.width;
		view.addChild(bmp);
		//join1
		img = engibear.preload.getResult("join");
		bmp = new createjs.Bitmap(img);
		bmp.regX = img.width/2;
		bmp.regY = img.height/2;
		view.addChild(bmp);
		//join2
		img = engibear.preload.getResult("join");
		bmp = new createjs.Bitmap(img);
		bmp.regX = img.width/2;
		bmp.regY = img.height/2;
		view.addChild(bmp);
		bmp.x = len;
	}
})();
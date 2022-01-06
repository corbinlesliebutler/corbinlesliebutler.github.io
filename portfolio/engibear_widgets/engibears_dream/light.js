(function (){
	engibear.Light = function(){
		
		var sinCount = 0;
		
		var view = this.view = new createjs.Container();
		var img = engibear.preload.getResult("light");
		var light = new createjs.Bitmap(img);
		view.addChild(light);
		light.regX = img.width/2;
		light.regY = 0;
		
		this.update = function(time)
		{
			sinCount += time*0.002;
			light.rotation = Math.cos(sinCount/2)*3;
		}
	}
})();
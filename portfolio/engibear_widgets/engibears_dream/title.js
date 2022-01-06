(function (){
	engibear.Title = function(col){
		
		var sinCount = 0;
		var ROT = -2;
		
		var view = this.view = new createjs.Container();
		var img = engibear.preload.getResult("title");
		title = new createjs.Bitmap(img);
		view.addChild(title);
		title.regX = img.width/2;
		title.regY = img.height/2;
		title.rotation = ROT;
		
		this.update = function(time)
		{
			sinCount += time*0.002;
			var sin = Math.sin(sinCount);
			var cos = Math.cos(sinCount/2);
			title.rotation = ROT + sin*2;
			title.x = sin*5;
			title.y = cos*5;
		}
	}
})();
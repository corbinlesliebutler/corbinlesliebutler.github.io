(function (){
	engibear.Shine = function(col){
		var count = 0;
		var ROT_CO = 0.03;
		var SIN_CO = 0.002;
		var SHINE_SCALE_CHANGE = 0.1;
		var THICK_ALPHA = 1;
		var CHANGE_ALPHA = 0.3;
		
		var view = this.view = new createjs.Container();
		var img = engibear.preload.getResult("shine_thick");
		var shineThick = new createjs.Bitmap(img);
		shineThick.regX = img.width/2;
		shineThick.regY = img.height/2;
		shineThick.alpha = THICK_ALPHA;
		view.addChild(shineThick);
		
		this.update = function(time)
		{
			count += time;
			var sin = Math.sin(count*SIN_CO);
			var cos = Math.cos(count*SIN_CO);
			shineThick.rotation = count*ROT_CO;
			shineThick.scaleX = shineThick.scaleY = (1 + sin*SHINE_SCALE_CHANGE) * 2;
			shineThick.alpha = THICK_ALPHA + cos*CHANGE_ALPHA;
		}
	}
})();
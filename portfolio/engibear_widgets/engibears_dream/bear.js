(function (){
	engibear.Bear = function(){
		var count = 0;
		var BLINK_INTERVAL = 4000;
		var BLINK_ZONES = [[0,100],[1500,1600],[3600,3700]];
		
		var view = this.view = new createjs.Container();
		var img = engibear.preload.getResult("engibear");
		var bmp = new createjs.Bitmap(img);
		bmp.regX = img.width/2;
		bmp.regY = img.height/2;
		img = engibear.preload.getResult("engiblink");
		var bmpBlink = new createjs.Bitmap(img);
		view.addChild(bmp);
		view.addChild(bmpBlink);
		bmpBlink.x = 99 - bmp.regX;
		bmpBlink.y = 52 - bmp.regY;
		
		this.update = function(time)
		{
			count += time;
			if(count > BLINK_INTERVAL)
			{
				count -= BLINK_INTERVAL;
			}
			bmpBlink.visible = false;
			for(var i = 0; i < BLINK_ZONES.length; i++)
			{
				var zone = BLINK_ZONES[i];
				if(count > zone[0] && count < zone[1])
				{
					bmpBlink.visible = true;
					break;
				}
			}
		}
		
		this.smile = function()
		{
			img = engibear.preload.getResult("engi_smile");
			var bmpSmile = new createjs.Bitmap(img);
			view.addChild(bmpSmile);
			bmpSmile.x = 136 - bmp.regX;
			bmpSmile.y = 145 - bmp.regY;
		}
	}
})();
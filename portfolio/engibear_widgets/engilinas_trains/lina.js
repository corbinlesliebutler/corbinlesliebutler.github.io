(function (){
	engibear.Lina = function(){
		var count = 0;
		var BLINK_INTERVAL = 4000;
		var BLINK_ZONES = [[0,100],[1500,1600],[3600,3700]];
		
		var view = this.view = new createjs.Container();
		var img = engibear.preload.getResult("engilina");
		var bmp = new createjs.Bitmap(img);
		bmp.regX = img.width/2;
		bmp.regY = img.height/2;
		img = engibear.preload.getResult("lina_blink");
		var bmpBlink = new createjs.Bitmap(img);
		view.addChild(bmp);
		view.addChild(bmpBlink);
		bmpBlink.x = 150 - bmp.regX;
		bmpBlink.y = 73 - bmp.regY;
		
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
	}
})();
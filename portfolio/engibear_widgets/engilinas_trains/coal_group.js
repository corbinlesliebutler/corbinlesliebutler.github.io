(function (){
	engibear.CoalGroup = function(){
		//const COAL_COUNT = 80;
		var SIN_CO = 0.01;//0.002;
		const RAD = 60;
		const DROP_SPEED = 2;
		const PIECE_RAD = 15;
		const IMGS = ["coal1", "coal2", "coal3"];
		const ROT_CO = 10;//0.03;
		const MOVE_CO = 2;
		const GRAVITY = 3;
		var DROP_TIME = 2000;
		var currentPos = {x:0, y:0};
		//const COAL_LIFE = 1;
		
		var dropped = false;
		//var count = 0;
		var dropCount = 0;
		var instance = this;
		instance.alive = true;
		
		
		var view = this.view = new createjs.Container();
		var coals = [];
		var iX = -RAD;
		var coalCount = 0;
		while(iX < RAD*2)
		{
			iX += PIECE_RAD + Math.random()*PIECE_RAD;
			var iY = -RAD;
			while(iY < RAD*2)
			{
				iY += PIECE_RAD + Math.random()*PIECE_RAD;
				if(CommonUtil.distance(0,0,iX,iY) <= RAD)
				{
					var img = engibear.preload.getResult(IMGS[CommonUtil.randomInt(IMGS.length)]);
					var bmp = new createjs.Bitmap(img);
					bmp.regX = img.width/2;
					bmp.regY = img.height/2;
					bmp.scaleX = bmp.scaleY = 0;
					TweenMax.to(bmp, 0.3, {scaleX:1,scaleY:1,ease:Back.easeOut});
					view.addChild(bmp);
					var coal = {
						bmp:bmp,
						startX:iX,
						startY:iY,
						startRot:-10 + Math.random()*40,
						xSpd:0, 
						ySpd:0,
						rotSpd:0,
						count:Math.random()*1000
						};
					coals.push(coal);
					coalCount++;
				}
			}
		}
		for(var i = 0; i < coalCount; i++)
		{
			view.setChildIndex(coals[i].bmp, Math.floor(Math.random()*coalCount));
		}
		
		this.init = function(pos)
		{
			this.updatePos(pos);
			/*currentPos.x = pos.x;
			currentPos.y = pos.y;
			 for(i = 0; i < coalCount; i++)
			{
				var coal = coals[i];
				coal.bmp.x = pos.x + coal.startX;
				coal.bmp.y = pos.y + coal.startY;
			} */
		}
		
		this.updatePos = function(pos)
		{
			currentPos.x = pos.x;
			currentPos.y = pos.y;
			/* for(i = 0; i < coalCount; i++)
			{
				var coal = coals[i];
				coal.bmp.x = pos.x + coal.startX;
				coal.bmp.y = pos.y + coal.startY;
			} */
		}
		
		this.drop = function(pos)
		{
			dropped = true;
			this.updatePos(pos);
			
			for(var i = 0; i < coalCount; i++)
			{
				var dir = CommonUtil.directionRad(0, -RAD, coals[i].startX, coals[i].startY);
				coals[i].xSpd = Math.cos(dir)*DROP_SPEED*Math.max(0, coals[i].startY/RAD)*2;
				coals[i].ySpd = Math.sin(dir)*DROP_SPEED + (coals[i].startY + RAD)/30;
				coals[i].rotSpd = Math.random()*5;
			}
		}
		
		this.update = function(time)
		{
			var timeFactor = time/engibear.STANDARD_INTERVAL;
			//count += time;
			//var cos = Math.cos(count*SIN_CO);
			
			if(dropped)
			{
				dropCount += time;
				if(dropCount > DROP_TIME)
				{
					instance.alive = false;
				}
				
				for(i = 0; i < coalCount; i++)
				{
					var coal = coals[i];
					coal.ySpd += GRAVITY * timeFactor;
					coal.bmp.y += coal.ySpd * timeFactor;
					coal.bmp.x += coal.xSpd * timeFactor;
					coal.bmp.rotation += coal.rotSpd * timeFactor;
				}
			}
			else
			{
				//hold and wobble
				for(i = 0; i < coalCount; i++)
				{
					var coal = coals[i];
					coal.count += time;
					var sin = Math.sin(coal.count*SIN_CO);
					var sin2 = Math.sin(coal.count/2*SIN_CO);
					coal.bmp.rotation = coal.startRot + sin*ROT_CO;
					coal.bmp.x = currentPos.x + coal.startX + sin*MOVE_CO;
					coal.bmp.y = currentPos.y + coal.startY + sin2*MOVE_CO;
				}
			}
			
		}
		
	}
})();
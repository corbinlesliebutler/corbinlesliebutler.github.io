(function (){
	engibear.Glint = function(){
		const LOCATIONS = [
		{x:289,y:566},
		{x:394,y:521},
		{x:602,y:543},
		{x:588,y:463},
		{x:466,y:490},
		{x:506,y:548},
		{x:412,y:568},
		{x:798,y:519},
		{x:541,y:508},
		{x:522,y:441},
		{x:412,y:480},
		{x:671,y:488},
		{x:707,y:553},
		{x:915,y:563},
		{x:787,y:588},
		{x:544,y:581},
		{x:656,y:447},
		{x:174,y:574},
		{x:318,y:519},
		{x:752,y:462},
		{x:643,y:585},
		{x:859,y:530},
		{x:712,y:428},
		{x:586,y:408},
		{x:467,y:434},
		{x:511,y:388},
		{x:642,y:393},
		{x:849,y:572},
		{x:730,y:514},
		{x:610,y:499},
		{x:555,y:430},
		{x:499,y:412},
		{x:562,y:381},
		{x:533,y:408},
		{x:613,y:436},
		{x:599,y:379},
		{x:677,y:423},
		{x:677,y:392},
		{x:750,y:425},
		{x:708,y:459},
		{x:540,y:468},
		{x:446,y:457},
		{x:507,y:468},
		{x:791,y:444},
		{x:808,y:480},
		{x:657,y:535},
		{x:457,y:531},
		{x:351,y:548},
		{x:243,y:553},
		{x:641,y:419},
		{x:613,y:403},
		{x:472,y:393}];
		
		const VANISH = {x:610,y:237};
		const LIFE_CO = 0.0005;
		const MOVE_CO = 0.03;
		const ONE = 1;
		const HALF = 0.5;
		this.life = 0;
		
		var img = engibear.preload.getResult("glint" + Math.ceil(Math.random()*2));
		this.view = new createjs.Bitmap(img);
		this.view.regX = img.width/2;
		this.view.regY = img.height/2;
		
		this.respawn = function()
		{
			var pos = LOCATIONS[Math.floor(Math.random()*LOCATIONS.length)];
			var dir = Math.atan2(pos.y - VANISH.y, pos.x - VANISH.x);
			this.moveX = Math.cos(dir);
			this.moveY = Math.sin(dir);
			this.view.x = pos.x;
			this.view.y = pos.y;
			//this.view.rotation = (dir * (180 / Math.PI)) - 90;
		}
		
		this.update = function(time)
		{
			this.life += time*LIFE_CO;
			if(this.life < ONE)
			{
				var yFactor = (this.view.y-300)/300;
				var xFactor = 1-(Math.abs(this.view.x-VANISH.x)/500);
				var lifeFactor;// = ONE;
				if(this.life > HALF)
				{
					lifeFactor = (ONE-((this.life-HALF)/HALF));
				}
				else
				{
					lifeFactor = this.life/HALF;
				}
				this.view.alpha = lifeFactor * yFactor;
				this.view.scaleX = this.view.scaleY = lifeFactor * yFactor * yFactor * xFactor * 1.5;
				this.view.x += time*MOVE_CO*yFactor*yFactor*yFactor*xFactor*this.moveX;
				this.view.y += time*MOVE_CO*yFactor*yFactor*yFactor*xFactor*this.moveY;
			}
			else
			{
				this.life -= ONE;
				this.respawn();
			}
			
		}
	}
})();
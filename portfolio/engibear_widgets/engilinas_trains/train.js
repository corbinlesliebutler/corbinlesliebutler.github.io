(function (){
	engibear.Train = function(col){
		var wheels = [];
		const WHEEL_SEP = 174;
		const L_REG_X = 77;
		const L_REG_Y = 78;
		const S_REG_X = 44;
		const S_REG_Y = 42;
		const MAX_SPEED = 50;
		const FRICTION = 1.1;
		const ACC_TIME = 5;
		const DEACC_TIME = 3;
		const LARGE_DIAMETER = 152;
		const SMALL_DIAMETER = 78;
		const CARRIAGE_SEP = 598;
		const CARRIAGE_Y = 136;
		const PAD_X = 20;
		const PAD_Y = -25;
		const BAR_X = 102;
		const BAR_Y = -13;
		const PUMP_X = 158;
		const PUMP_SEP = 286;
		const RAISE_Y = -130;
		const DIST_PUFF = 400;
		const PUFF_LIFE = 1500;
		const INSTANCE = this;
		const RES_SCALE = 1/0.6;
		INSTANCE.speed = 0;
		
		var view = this.view = new createjs.Container();
		var distMoved = 0;
		var puffDistCount = 0;
		var currentSpeed = 0;
		var puffs=[];
		
		var puffLayer = new createjs.Container();
		view.addChild(puffLayer);
		
		var img = engibear.preload.getResult("marlin_bg");
		var bg = new createjs.Bitmap(img);
		bg.x = 862-622;
		bg.y = 216;
		view.addChild(bg);
		
		img = engibear.preload.getResult("marlin_wheel_small");
		var wheel = new createjs.Bitmap(img);
		wheel.regX = S_REG_X / RES_SCALE;wheel.regY = S_REG_Y / RES_SCALE;
		wheel.scaleX = wheel.scaleY = RES_SCALE;
		wheel.d = SMALL_DIAMETER;
		wheel.x = 806;
		wheel.y = 310;
		view.addChild(wheel);
		wheels.push(wheel);
		
		wheel = new createjs.Bitmap(img);
		wheel.regX = S_REG_X;wheel.regY = S_REG_Y;
		wheel.d = SMALL_DIAMETER;
		wheel.x = 1578-622;
		wheel.y = 310;
		view.addChild(wheel);
		wheels.push(wheel);
		
		var wx = 949-622;
		var wy = 271;
		
		img = engibear.preload.getResult("marlin_wheel_large");
		wheel = new createjs.Bitmap(img);
		wheel.regX = L_REG_X / RES_SCALE;wheel.regY = L_REG_Y / RES_SCALE;
		wheel.scaleX = wheel.scaleY = RES_SCALE;
		wheel.d = LARGE_DIAMETER;
		wheel.x = wx;
		wheel.y = wy;
		view.addChild(wheel);
		wheels.push(wheel);
		
		var wheel1 = wheel;
		
		wheel = new createjs.Bitmap(img);
		wheel.regX = L_REG_X / RES_SCALE;wheel.regY = L_REG_Y / RES_SCALE;
		wheel.scaleX = wheel.scaleY = RES_SCALE;
		wheel.d = LARGE_DIAMETER;
		wheel.x = wx + WHEEL_SEP;
		wheel.y = wy;
		view.addChild(wheel);
		wheels.push(wheel);
		
		wheel = new createjs.Bitmap(img);
		wheel.regX = L_REG_X / RES_SCALE;wheel.regY = L_REG_Y / RES_SCALE;
		wheel.scaleX = wheel.scaleY = RES_SCALE;
		wheel.d = LARGE_DIAMETER;
		wheel.x = wx + WHEEL_SEP*2;
		wheel.y = wy;
		view.addChild(wheel);
		wheels.push(wheel);
		
		var barContainer = new createjs.Container();
		view.addChild(barContainer);
		var bar = new engibear.Bar(WHEEL_SEP);
		barContainer.addChild(bar.view);
		bar = new engibear.Bar(WHEEL_SEP);
		bar.view.x = WHEEL_SEP;
		barContainer.addChild(bar.view);
		
		var raiseContainer = new createjs.Container();
		view.addChild(raiseContainer);
		
		img = engibear.preload.getResult("maglev");
		var maglev = INSTANCE.maglev = new createjs.Bitmap(img);
		raiseContainer.addChild(maglev);
		maglev.scaleX = maglev.scaleY = 2.5;
		maglev.x = -1130*maglev.scaleX;
		maglev.y = -115*maglev.scaleY;//-130*maglev.scaleY;
		maglev.xSpd = 0;
		
		const TX = -200;
		const TY = -160;
		const LW = 57;//58;
		const MW = 55;//56;
		const RW = 58;//59;
		const M_COUNT = 10;
		const TW = LW + (MW*M_COUNT) + RW - 3;
		
		for(var i = 0; i < 2; i++)
		{
			img = engibear.preload.getResult("magtrack_l");
			var l = new createjs.Bitmap(img);
			raiseContainer.addChild(l);
			l.x = TX + TW*i;
			l.y = TY;
			for(var j = 0; j<M_COUNT; j++)
			{
				img = engibear.preload.getResult("magtrack_m");
				var m = new createjs.Bitmap(img);
				raiseContainer.addChild(m);
				m.x = l.x + LW + MW * j;
				m.y = TY;
			}
			img = engibear.preload.getResult("magtrack_r");
			var r = new createjs.Bitmap(img);
			raiseContainer.addChild(r);
			r.x = l.x + LW + (MW*M_COUNT);
			r.y = TY;
		}
		
		for(var i = 0; i < 2; i++)
		{
			for(var j = 0; j < 2; j++)
			{
				img = engibear.preload.getResult("pump_bar");
				var bar = new createjs.Bitmap(img);
				raiseContainer.addChild(bar);
				bar.x = CARRIAGE_SEP*i + BAR_X + PUMP_SEP*j;
				bar.y = BAR_Y;
			}
			img = engibear.preload.getResult("pad_platform");
			var pad = new createjs.Bitmap(img);
			raiseContainer.addChild(pad);
			pad.x = CARRIAGE_SEP*i + PAD_X;
			pad.y = PAD_Y;
		}
		
		img = engibear.preload.getResult("marlin_fg");
		var fg = new createjs.Bitmap(img);
		fg.scaleX = fg.scaleY = 1/0.6;
		view.addChild(fg);
		
		img = engibear.preload.getResult("carriage");
		var carriage = new createjs.Bitmap(img);
		view.addChild(carriage);
		carriage.scaleX = carriage.scaleY = RES_SCALE;
		carriage.x = -595;
		carriage.y = CARRIAGE_Y;
		
		img = engibear.preload.getResult("carriage");
		var carriage2 = new createjs.Bitmap(img);
		view.addChild(carriage2);
		carriage2.scaleX = carriage2.scaleY = RES_SCALE;
		carriage2.x = carriage.x - CARRIAGE_SEP;
		carriage2.y = CARRIAGE_Y;
		
		raiseContainer.x = carriage2.x;
		raiseContainer.y = carriage2.y;
		
		updateMove(0);
		
		this.update = function(time)
		{
			/* if(INSTANCE.speed > 0)
			{ 
				var timeFactor = time / engibear.STANDARD_INTERVAL;
				for(var i = 0; i < wheels.length; i++)
				{
					var wheel = wheels[i];
					wheel.rotation += (INSTANCE.speed/Math.PI/wheel.d)*360*timeFactor;
				}
				view.x += INSTANCE.speed*timeFactor;
			} */
			maglev.x += maglev.xSpd;
			for(var i = 0; i < puffs.length; i++)
			{
				var puff = puffs[i];
				puff.life += time;
				if(puff.life > PUFF_LIFE)
				{
					puffLayer.removeChild(puff.bmp);
					puffs.splice(i,1);
					i--;
				}
				else
				{
					puff.bmp.scaleX = puff.bmp.scaleY = 0.1 + puff.life/PUFF_LIFE;
					puff.bmp.alpha = 1 - puff.life/PUFF_LIFE;
					puff.xSpd = puff.life/PUFF_LIFE * -currentSpeed;
					puff.bmp.x += puff.xSpd;
					puff.bmp.y += puff.ySpd;
					puff.ySpd*=0.9;
					puff.bmp.rotation -= time*0.1;
				}
			}
		}
		
		function updateMove(dist)
		{
			currentSpeed = dist - distMoved;
			distMoved = dist;
			puffDistCount += currentSpeed;
			if(puffDistCount > DIST_PUFF)
			{
				puffDistCount-=DIST_PUFF;
				var img = engibear.preload.getResult("steam");
				var bmp = new createjs.Bitmap(img);
				bmp.regX = img.width/2;
				bmp.regY = img.height/2;
				puffLayer.addChild(bmp);
				bmp.x = 821;
				bmp.y = 51;
				bmp.rotation = -20 + Math.random()*40;
				bmp.alpha = 0;
				var puff = {life:0, bmp:bmp, xSpd:0, ySpd:-30};
				puffs.push(puff);
			}
			for(var i = 0; i < wheels.length; i++)
			{
				var wheel = wheels[i];
				wheel.rotation = ((dist/Math.PI/wheel.d)*360)%360;
			}
			var pos = wheel1.localToLocal(76/RES_SCALE,109/RES_SCALE,view);
			barContainer.x = pos.x;
			barContainer.y = pos.y;
		}this.updateMove = updateMove;
		
		this.raise = function()
		{
			TweenMax.to(raiseContainer, engibear.RAISE_TIME, {y:raiseContainer.y+RAISE_Y, ease:Power0.easeNone});
		}
		
		this.popOut = function()
		{
			var windowContainer = new createjs.Container();
			var maskShape = new createjs.Shape();
			const WW = 300;
			const WH = 200;
			maskShape.graphics.beginFill("blue").drawRect(-WW/2, -WH, WW, WH);
			maskShape.alpha = 0.5;
			view.addChild(windowContainer);
			windowContainer.mask = maskShape;
			//view.addChild(maskShape);
			windowContainer.x = maskShape.x = 114;
			windowContainer.y = maskShape.y = 148;
			//windowContainer.x = 110;
			//windowContainer.y = 150;
			
			img = engibear.preload.getResult("engilina");
			var lina = new createjs.Bitmap(img);
			windowContainer.addChild(lina);
			lina.regX = 221;
			lina.regY = 283;
			lina.scaleX = lina.scaleY = 0.25;
			lina.rotation = 10;
			lina.x = 13;
			
			img = engibear.preload.getResult("mac");
			var mac = new createjs.Bitmap(img);
			windowContainer.addChild(mac);
			mac.regX = 221 / RES_SCALE;
			mac.regY = 315 / RES_SCALE;//337;
			mac.scaleX = mac.scaleY = 0.25 * RES_SCALE;
			mac.rotation = -25;
			mac.x = -10;
			
			
			TweenMax.from(lina, 0.5, {delay:0.3, alpha:0, scaleX:0, scaleY:0, rotation:0, ease:Back.easeOut});
			TweenMax.from(mac, 0.5, {alpha:0, scaleX:0, scaleY:0, rotation:0, ease:Back.easeOut});
		}
		
		/* this.go = function()
		{
			TweenMax.to(INSTANCE, ACC_TIME, {speed:MAX_SPEED, ease:Power1.easeIn});
		}
		
		this.stop = function()
		{
			TweenMax.to(INSTANCE, DEACC_TIME, {speed:0, ease:Power3.easeOut});
		} */
	}
})();
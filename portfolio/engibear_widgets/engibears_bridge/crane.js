(function (){
	engibear.Crane = function(){
		const JOIN_Y = 278;
		const ROT_CHANGE_FREE = 5;
		const DEACC_CO = 0.005;
		const SIN_CO = 0.002;
		const H_ACC = 1.3;
		const MAX_XSPD = 10;
		const MAX_MOVEMENT_ROT = 10;
		//const MOVEMENT_ROT_FORCE_CO = 0.08;
		const GRAVITY = 0.005;
		const ROT_FRICTION = 0.98;
		const ROT_TWEEN_EASE = Power1.easeInOut;//Power0.easeNone;//Power3.easeInOut;//Back.easeOut;//
		const ROT_TWEEN_DUR = 0.8;
		const STATE_IDLE = 0;
		const STATE_IDLE_LOAD = 1;
		const STATE_CONTROLLING_LOAD = 2;
		const STATE_PLACING_LOAD = 3;
		const STATE_STILL = 4;
		
		var count = 0;
		var state = STATE_IDLE;
		var view = this.view = new createjs.Container();
		var currentPiece;
		var controlling = 0;
		var rotTween;
		var rotTweenVars = {movementRot:0};
		var gravityRotForce = 0;
		var gravityRot = 0;
		var xSpd = 0;
		
		var img = engibear.preload.getResult("crane");
		var rope = new createjs.Bitmap(img);
		rope.regX = img.width/2;
		view.addChild(rope);
		
		img = engibear.preload.getResult("chain");
		var chain = new createjs.Bitmap(img);
		chain.regX = img.width/2;
		chain.regY = 30;
		chain.y = JOIN_Y;
		view.addChild(chain);
		chain.visible = false;
		
		this.placePiece = function()
		{
			state = STATE_PLACING_LOAD;
			if(rotTween)rotTween.kill();
			var dist = CommonUtil.distance(view.x, view.y, currentPiece.atX, currentPiece.atY - JOIN_Y);
			const PLACE_DUR = (dist/200+1)/3;
			var tl = new TimelineMax();
			tl.add(TweenMax.to(view, PLACE_DUR, {rotation:0, x:currentPiece.atX, y:currentPiece.atY - JOIN_Y, ease:Power1.easeInOut}));
			tl.add(TweenMax.to(currentPiece.view, PLACE_DUR, {rotation:0, ease:Power2.easeInOut}), 0);
			tl.addCallback(function(){
				//release
				view.dispatchEvent("release");
				state = STATE_STILL;
				chain.visible = false;
			});
		}
		
		this.setPiece = function(piece)
		{
			currentPiece = piece;
			view.addChild(currentPiece.view);
			currentPiece.view.x = 0;
			currentPiece.view.y = JOIN_Y;
			chain.visible = true;
			state = STATE_IDLE_LOAD;
			gravityRot = MAX_MOVEMENT_ROT;
		}
		
		this.left = function()
		{
			if(controlling != -1)
			{
				if(rotTween)rotTween.kill();
				rotTween = TweenMax.to(rotTweenVars, ROT_TWEEN_DUR, {movementRot:-MAX_MOVEMENT_ROT, ease:ROT_TWEEN_EASE});
			}
			state = STATE_CONTROLLING_LOAD;
			controlling = -1;
			xSpd -= H_ACC;
			xSpd = Math.max(-MAX_XSPD, xSpd);
		}
		
		this.right = function()
		{
			if(controlling != 1)
			{
				if(rotTween)rotTween.kill();
				rotTween = TweenMax.to(rotTweenVars, ROT_TWEEN_DUR, {movementRot:MAX_MOVEMENT_ROT, ease:ROT_TWEEN_EASE});
			}
			state = STATE_CONTROLLING_LOAD;
			controlling = 1;
			xSpd += H_ACC;
			xSpd = Math.min(MAX_XSPD, xSpd);
		}
		
		this.stop = function()
		{
			if(rotTween)rotTween.kill();
			controlling = 0;
			state = STATE_IDLE_LOAD;
			gravityRot += rotTweenVars.movementRot;
			rotTweenVars.movementRot = 0;
			//movement_rot_force = 0;
		}
		
		this.update = function(time)
		{
			//rotation
			if(state == STATE_CONTROLLING_LOAD)
			{
				gravityRotForce = 0;
				gravityRot *= 0.9;
			}
			if(state == STATE_IDLE_LOAD)
			{
				//gravity
				gravityRotForce -= gravityRot * GRAVITY;
				gravityRot += gravityRotForce;
				gravityRotForce *= ROT_FRICTION;
				rotTweenVars.movementRot *= 0.9;
			}
			if(state == STATE_CONTROLLING_LOAD || state == STATE_IDLE_LOAD)
			{
				view.rotation = rotTweenVars.movementRot + gravityRot;
				currentPiece.view.rotation = -view.rotation/2;
			}
			if(state == STATE_IDLE)
			{
				count += time;
				view.rotation = Math.sin(count*SIN_CO)*ROT_CHANGE_FREE;
			}
			
			//xspd
			if(state == STATE_CONTROLLING_LOAD || state == STATE_IDLE_LOAD)
			{
				if(xSpd != 0)
				{
					if(state == STATE_IDLE_LOAD)
					{
						//deaccelerate
						xSpd *= 1-(time*DEACC_CO);
						if(Math.abs(xSpd) < 0.1)xSpd = 0;
					}
					this.view.x += xSpd;
				}
			}
			
			
		}
	}
})();
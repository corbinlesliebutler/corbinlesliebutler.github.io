(function (){
	engibear.ControlRoom = function(){
		var dropCount = 0;
		const MIN_DRAG_Y = 300;
		const SPARK_X = 870;
		const SPARK_Y = 530;
		
		var currentCoalGroup;
		var coalGroups = [];
		var dragging = false;
		
		this.grabPos = {x:120, y:250};
		this.dropPos = {x:800, y:150};
		
		var view = this.view = new createjs.Container();
		var dragLayer = new createjs.Container();
		var dropLayer = new createjs.Container();
		var img = engibear.preload.getResult("control_room_bg");
		var bg = new createjs.Bitmap(img);
		bg.x = -5;
		bg.y = -5;
		img = engibear.preload.getResult("control_room_glow");
		var glow = new createjs.Bitmap(img);
		glow.x = bg.x + 669;
		glow.y = bg.y + 261;
		glow.alpha = 0;
		img = engibear.preload.getResult("control_room_fg");
		var fg = new createjs.Bitmap(img);
		fg.x = bg.x;
		fg.y = bg.y + 138;
		var pileShine = new engibear.Shine();
		pileShine.view.x = bg.x + 98;
		pileShine.view.y = bg.y + 270;
		pileShine.view.scaleX = pileShine.view.scaleY = 0.8;
		var pileTouchContainer = new createjs.Container();
		var pileTouch = new createjs.Shape();
		pileTouch.graphics.beginFill("blue").drawCircle(120,250,150);
		pileTouchContainer.hitArea = pileTouch;
		
		img = engibear.preload.getResult("mac");
		var mac = new createjs.Bitmap(img);
		mac.regX = img.width/2;
		mac.regY = img.height/2;
		mac.scaleX = mac.scaleY = 1/0.6;
		mac.x = 120;
		mac.y = 575;
		
		var sparks = [];
		
		view.addChild(bg);
		view.addChild(glow);
		view.addChild(pileShine.view);
		view.addChild(dropLayer);
		view.addChild(fg);
		view.addChild(dragLayer);
		view.addChild(mac);
		view.addChild(pileTouchContainer);
	
		function stageMove(event)
		{
			if(dragging)
			{
				var pos = dragLayer.globalToLocal(event.stageX, event.stageY);
				pos.y = Math.min(pos.y, MIN_DRAG_Y);
				currentCoalGroup.updatePos(pos);
			}
		}
		
		function stageUp(event)
		{
			if(dragging)
			{
				var pos = dragLayer.globalToLocal(event.stageX, event.stageY);
				drop(pos);
			}
		}
		
		function pressPile(event)
		{
			if(!dragging && dropCount < 4)
			{
				var pos = dragLayer.globalToLocal(event.stageX, event.stageY);
				pickUp(pos);
			}
		}
		
		function pickUp(pos)
		{
			dragging = true;
			currentCoalGroup = new engibear.CoalGroup();
			dragLayer.addChild(currentCoalGroup.view);
			currentCoalGroup.init(pos);
			coalGroups.push(currentCoalGroup);
		}
		this.pickUp = pickUp;
		
		function drop(pos)
		{
			currentCoalGroup.drop(pos);
			dragging = false;
			droppedCoalGroup = currentCoalGroup;
			dropLayer.addChild(droppedCoalGroup.view);
			currentCoalGroup = undefined;
			if(pos.x > 689 && pos.x < 934)
			{
				//dropped in fire
				dropCount++;
				//const GLOW_DELAY = 1;
				var glowDelay = 0.5+(1-pos.y/engibear.widgetHeight)*0.5;
				TweenMax.delayedCall(glowDelay, function(){
					var sparkSystem = new engibear.SparkSystem((dropCount == 4)?-1:300);
					dropLayer.addChild(sparkSystem.view);
					sparkSystem.view.x = SPARK_X;
					sparkSystem.view.y = SPARK_Y;
					sparks.push(sparkSystem);
				});
				if(dropCount == 4)
				{
					TweenMax.to(glow, 0.5, {delay:glowDelay, alpha:1});
					finish();
					TweenMax.delayedCall(1.5,function(){
						view.dispatchEvent("WIN");
					});
				}
				else
				{
					TweenMax.to(glow, 0.5, {delay:glowDelay, alpha:0.5, onComplete:function(){
						TweenMax.to(glow, 0.5, {alpha:0});
					}});
				}
			}
		}
		this.drop = drop;
		
		this.update = function(time)
		{
			pileShine.update(time);
			
			for(var i = 0; i < coalGroups.length; i++)
			{
				var cg = coalGroups[i];
				cg.update(time);
				if(!cg.alive)
				{
					dragLayer.removeChild(cg.view);
					coalGroups.splice(i, 1);
					i--;
				}
			}
			
			for(var i = 0; i < sparks.length; i++)
			{
				var ss = sparks[i];
				if(ss.alive)
				{
					ss.update(time);
				}
				else
				{
					sparks.splice(i, 1);
					i--;
					dropLayer.removeChild(ss.view);
				}
			}
		}
		
		this.start = function()
		{
			engibear.stage.addEventListener("stagemousemove", stageMove);
			engibear.stage.addEventListener("stagemouseup", stageUp);
			pileTouchContainer.addEventListener("mousedown", pressPile);
		}
		
		function finish()
		{
			engibear.stage.removeEventListener("stagemousemove", stageMove);
			engibear.stage.removeEventListener("stagemouseup", stageUp);
			pileTouchContainer.removeEventListener("mousedown", pressPile);
		}
		
		this.updatePos = function(pos)
		{
			if(dragging)
			{
				//var pos = dragLayer.globalToLocal(event.stageX, event.stageY);
				currentCoalGroup.updatePos(pos);
			}
		}
	}
})();
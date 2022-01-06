(function (){
	engibear.Welder = function(col){
		
		var view = this.view = new createjs.Container();
		var container = new createjs.Container();
		view.addChild(container);
		var img;
		img = engibear.preload.getResult("welder_arm_1");
		var arm1 = new createjs.Bitmap(img);
		arm1.regX = 59;
		arm1.regY = 596;
		arm1.joinX = 54;
		arm1.joinY = 36;
		img = engibear.preload.getResult("welder_arm_2");
		var arm2 = new createjs.Bitmap(img);
		arm2.regX = 48;
		arm2.regY = 295;
		arm2.joinX = 47;
		arm2.joinY = 27;
		img = engibear.preload.getResult("welder_nozzle");
		var nozzle = new createjs.Bitmap(img);
		nozzle.regX = 26;
		nozzle.regY = 144;
		nozzle.joinX = 26;
		nozzle.joinY = 0;
		img = engibear.preload.getResult("welder_flame");
		var flame = new createjs.Bitmap(img);
		flame.regX = 10;
		flame.regY = 126;
		flame.scaleY = 0;
		
		arm1.rotation = 45;
		
		container.addChild(arm2);
		container.addChild(flame);
		container.addChild(nozzle);
		container.addChild(arm1);
		
		this.weld = function(piece)
		{
			const ROT_DUR = 0.5;
			const RISE_DUR = 0.3;
			const FALL_DUR = 0.4;
			const FLAME_DUR = 0.5;
			//const FLAME_IN_OUT_DUR = 0.2;
			const HIDE_TIME = ROT_DUR + FLAME_DUR;
			
			arm1.rotation = arm2.rotation = nozzle.rotation = flame.rotation = 0;
			view.visible = true;
			var tl = new TimelineMax();
			tl.add(TweenMax.to(container, RISE_DUR, {y:-piece.upY/view.scaleY, ease:Back.easeOut}), 0);
			tl.add(TweenMax.to(arm1, ROT_DUR, {rotation:piece.wr1}),0) ;
			tl.add(TweenMax.to(arm2, ROT_DUR, {rotation:piece.wr1 + piece.wr2}),0);
			tl.add(TweenMax.to(nozzle, ROT_DUR, {rotation:piece.wr1 + piece.wr2 + piece.wr3}),0);
			tl.set(flame, {scaleY:1}, ROT_DUR);//out flame
			tl.addCallback(piece.spark, ROT_DUR);
			tl.set(flame, {scaleY:0}, ROT_DUR + FLAME_DUR);//in flame
			tl.addCallback(piece.stopSpark, ROT_DUR + FLAME_DUR);
			tl.add(TweenMax.to(arm1, ROT_DUR, {rotation:0}), HIDE_TIME);
			tl.add(TweenMax.to(arm2, ROT_DUR, {rotation:0}), HIDE_TIME);
			tl.add(TweenMax.to(nozzle, ROT_DUR, {rotation:0}), HIDE_TIME);
			tl.add(TweenMax.to(container, FALL_DUR, {y:0, ease:Back.easeIn, onComplete:function(){
				//view.visible = false;
			}}), HIDE_TIME);//hide
		}
		
		this.update = function(time)
		{
			var join1 = arm1.localToLocal(arm1.joinX, arm1.joinY, container);
			arm2.x = join1.x;
			arm2.y = join1.y;
			var join2 = arm2.localToLocal(arm2.joinX, arm2.joinY, container);
			nozzle.x = join2.x;
			nozzle.y = join2.y;
			var join3 = nozzle.localToLocal(nozzle.joinX, nozzle.joinY, container);
			flame.x = join3.x;
			flame.y = join3.y;
			flame.rotation = nozzle.rotation;
		}
	}
})();
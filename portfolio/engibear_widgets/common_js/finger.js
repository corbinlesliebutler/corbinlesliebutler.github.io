(function (){
	engibear.Finger = function(col){
		engibear.PRESS_TIME = 0.3;
		engibear.RELEASE_TIME = 0.5;
		var PRESS_SCALE = 0.7;
		var HOVER_SCALE = 1;
		var FINGER_ALPHA = 0.8;
		var view = this.view = new createjs.Container();
		var img = engibear.preload.getResult("finger");
		var bmpFinger = new createjs.Bitmap(img);
		bmpFinger.regX = 53;
		bmpFinger.regY = 53;
		img = engibear.preload.getResult("ring");
		var bmpRing = new createjs.Bitmap(img);
		bmpRing.regX = img.width/2;
		bmpRing.regY = img.height/2;
		bmpRing.visible = false;
		bmpFinger.scaleX = bmpFinger.scaleY = HOVER_SCALE;
		bmpFinger.alpha = FINGER_ALPHA;
		view.addChild(bmpRing);
		view.addChild(bmpFinger);
		
		this.press = function()
		{
			bmpRing.visible = true;
			bmpRing.alpha = 1;
			bmpRing.scaleX = bmpRing.scaleY = 0;
			TweenMax.to(bmpRing, 0.7, {scaleX:1.3, scaleY:1.3, alpha:0, delay:engibear.PRESS_TIME});
			TweenMax.to(bmpFinger, engibear.PRESS_TIME, {scaleX:PRESS_SCALE, scaleY:PRESS_SCALE, ease:Power2.easeIn});
		}
		
		this.release = function()
		{
			bmpRing.visible = true;
			bmpRing.alpha = 1;
			bmpRing.scaleX = bmpRing.scaleY = 0;
			TweenMax.to(bmpRing, 0.7, {scaleX:1.3, scaleY:1.3, alpha:0});
			TweenMax.to(bmpFinger, engibear.RELEASE_TIME, {scaleX:HOVER_SCALE, scaleY:HOVER_SCALE, ease:Power2.easeInOut});
		}
	}
})();
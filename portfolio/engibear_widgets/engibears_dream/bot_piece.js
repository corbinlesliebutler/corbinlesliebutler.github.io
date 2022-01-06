(function (){
	engibear.BotPiece = function(bean){
		var count = Math.random()*1000;
		var ROT_CO = 0.03;
		var SHINE_ALPHA = 0.5;
		var SIN_CO = 0.006;
		var ROT_CHANGE = 2.5;
		var SCALE_CHANGE = 0.01;
		var view = this.view = new createjs.Container();
		var shine;
		var grabbable = true;
		var addView;
		var imageLayer = new createjs.Container();
		var sparkSystem;
		var model = this;
		
		view.addChild()
		
		for(var prop in bean)
		{
			this[prop] = bean[prop];
		}
		
		var img = engibear.preload.getResult(bean.imgId);
		var bmp = new createjs.Bitmap(img);
		bmp.regX = bean.regX;
		bmp.regY = bean.regY;
		view.model = this;
		shine = new engibear.Shine();
		shine.view.scaleX = shine.view.scaleY = this.shineScale; 
		shine.view.alpha = SHINE_ALPHA;
		view.addChild(shine.view);
		view.addChild(imageLayer);
		imageLayer.addChild(bmp);
		if(this.hitShape)
		{
			view.hitArea = this.hitShape;
		}
		if(this.addImg)
		{
			img = engibear.preload.getResult(this.addImg);
			var addBmp = new createjs.Bitmap(img);
			addBmp.x = this.addX - bmp.regX;
			addBmp.y = this.addY - bmp.regY;
			imageLayer.addChild(addBmp);
			addView = addBmp;
		}
		
		this.reShelf = function()
		{
			grabbable = true;
			count = 0;
			TweenMax.to(shine.view, 0.3, {alpha:SHINE_ALPHA});
		}
		
		this.init_reset = function()
		{
			grabbable = true;
			model.attached = false;
			count = 0;
			shine.view.alpha = SHINE_ALPHA;
		}
		
		this.grab = function()
		{
			grabbable = false;
			TweenMax.to(shine.view, 0.3, {alpha:0});
			TweenMax.to(imageLayer, 0.3, {rotation:0, scaleX:1, scaleY:1});
		}
		
		this.attach = function()
		{
			if(addView)
			{
				addView.visible = false;
			}
		}
		
		this.spark = function()
		{
			sparkSystem = new engibear.SparkSystem();
			imageLayer.addChild(sparkSystem.view);
			sparkSystem.view.x = model.sparkX - bmp.regX;
			sparkSystem.view.y = model.sparkY - bmp.regY;
		}
		
		this.stopSpark = function()
		{
			sparkSystem.sparking = false;
		}
		
		this.update = function(time)
		{
			if(grabbable)
			{
				shine.update(time);
				count += time;
				var sin = Math.sin(count*SIN_CO);
				imageLayer.scaleX = imageLayer.scaleY = 1 + sin*SCALE_CHANGE;
				imageLayer.rotation = sin*ROT_CHANGE;
			}
			if(sparkSystem)
			{
				if(sparkSystem.alive)
				{
					sparkSystem.update(time);
				}
				else
				{
					imageLayer.removeChild(sparkSystem.view);
					sparkSystem = null;
				}
			}
		}
	}
})();
(function (){
	engibear.SparkSystem = function(lifeSpan){
		const GEN_INTERVAL = 30;
		const DECAY_TIME = 1200;
		const START_SPEED = 20;
		const FLOAT_YSPD = 0.01;
		const SIN_CO = 3;
		
		this.alive = true;
		this.sparking = true;
		var count = GEN_INTERVAL;
		var lifeCount = 0;
		var sparks = [];
		var view = this.view = new createjs.Container();
		
		
		this.update = function(time)
		{
			if(this.sparking)
			{
				count += time;
				lifeCount += time;
				while((lifeCount<lifeSpan||lifeSpan==-1) && count >= GEN_INTERVAL)
				{
					var img = engibear.preload.getResult("spark");
					var spark = new createjs.Bitmap(img);
					spark.regX = img.width/2;
					spark.regY = img.height/2;
					view.addChild(spark);
					var angle = (-90 - Math.random()*70)*(Math.PI/180);
					var speed = Math.random()*START_SPEED;
					spark.xSpd = Math.cos(angle)*speed;
					spark.ySpd = Math.sin(angle)*speed;
					spark.life = DECAY_TIME;
					sparks.push(spark);
					count -= GEN_INTERVAL;
				}
			}
			for(var i = 0; i < sparks.length; i++)
			{
				var spark = sparks[i];
				spark.life -= time;
				if(spark.life > 0)
				{
					spark.x += spark.xSpd + Math.sin(spark.life/2)*SIN_CO;
					spark.y += spark.ySpd;
					spark.scaleX = spark.scaleY = spark.alpha = spark.life/DECAY_TIME;
					//spark.ySpd -= FLOAT_YSPD;
					spark.xSpd *= 0.95;
					spark.ySpd *= 0.99;
				}
				else
				{
					view.removeChild(spark);
					sparks.splice(i, 1);
					i--;
				}
			}
			this.alive = (sparks.length > 0);
		}
	}
})();
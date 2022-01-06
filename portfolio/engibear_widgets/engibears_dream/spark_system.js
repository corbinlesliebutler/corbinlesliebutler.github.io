(function (){
	engibear.SparkSystem = function(){
		const GEN_INTERVAL = 30;
		const DECAY_TIME = 600;
		const START_SPEED = 40;
		const GRAVITY = 3;
		
		this.alive = true;
		this.sparking = true;
		var count = GEN_INTERVAL;
		var sparks = [];
		var view = this.view = new createjs.Container();
		
		this.update = function(time)
		{
			if(this.sparking)
			{
				count += time;
				while(count >= GEN_INTERVAL)
				{
					var img = engibear.preload.getResult("welder_spark");
					var spark = new createjs.Bitmap(img);
					spark.regX = img.width/2;
					spark.regY = img.height/2;
					view.addChild(spark);
					var angle = Math.random()*360;
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
					spark.x += spark.xSpd;
					spark.y += spark.ySpd;
					spark.scaleX = spark.scaleY = spark.alpha = spark.life/DECAY_TIME;
					spark.ySpd += GRAVITY;
					spark.xSpd *= 0.9;
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
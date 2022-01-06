(function (){
	engibear.GlintSystem = function(){
		
		const GLINT_COUNT = 20;
		var sinCount = 0;
		var glintArr = [];
		this.view = new createjs.Container();
		
		for(var i = 0; i < GLINT_COUNT; i++)
		{
			var glint = new engibear.Glint();
			glint.respawn();
			glint.life = Math.random();
			this.view.addChild(glint.view);
			glintArr.push(glint);
		}
		
		this.update = function(time)
		{
			for(var i = 0; i < GLINT_COUNT; i++)
			{
				var glint = glintArr[i];
				glint.update(time);
			}
		}
	}
})();
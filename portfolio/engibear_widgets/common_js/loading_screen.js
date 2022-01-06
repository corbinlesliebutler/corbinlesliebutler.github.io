(function(){
	engibear.LoadingScreen = function()
	{
		const ROT_CO = 0.1;
		const fgCol = "#823e91";
		const bgCol = "#c439e2";
		var view = this.view = new createjs.Container();
		
		var img = new Image();
		img.src = "loading_assets/loading.png";
		var title = new createjs.Bitmap(img);
		title.x = engibear.widgetWidth/2;
		title.y = engibear.widgetHeight/2 - 30;
		view.addChild(title);
		
		img = new Image();
		img.src = "loading_assets/cog.png";
		var cog1 = new createjs.Bitmap(img);
		cog1.x = title.x + 35;
		cog1.y = title.y - 80;
		view.addChild(cog1);
		
		var cog2 = new createjs.Bitmap(img);
		cog2.x = cog1.x - 70;
		cog2.y = cog1.y;
		cog2.scaleX = cog2.scaleY = 0.7;
		view.addChild(cog2);
		cog2.rotation = -2;
		
		cog1.regX = cog1.regY = cog2.regX = cog2.regY = 44;
		title.regX = 93;
		title.regY = 30;
		
		var barWidth = engibear.widgetWidth * 0.9;
		var barHeight = engibear.widgetHeight * 0.04;
		
		var barContainer = new createjs.Container();
		barContainer.x = engibear.widgetWidth/2;
		barContainer.y = title.y + 70;
		view.addChild(barContainer);
		
		var bg = new createjs.Shape();
		bg.graphics.setStrokeStyle(6).beginStroke(fgCol).drawRoundRect(-barWidth/2, -barHeight/2, barWidth, barHeight, barHeight/2);
		
		var progressMask = new createjs.Shape();
		progressMask.graphics.beginFill("#000").drawRect(0, -barHeight/2, barWidth, barHeight);
		progressMask.x = -barWidth/2;
		progressMask.scaleX = 0;
		var fillProgressContainer = new createjs.Container();
		var fillEdgeContainer = new createjs.Container();
		fillEdgeContainer.mask = bg;
		fillEdgeContainer.addChild(fillProgressContainer);
		fillProgressContainer.mask = progressMask;
		barContainer.addChild(fillEdgeContainer);
		barContainer.addChild(bg);
		
		var sectionWidth = 30;
		var bottomOffsetX = 5;
		var fillPieces = Math.ceil(barWidth/sectionWidth/2);
		var fill = new createjs.Shape();
		var x = -barWidth/2-sectionWidth*2;
		var y = -barHeight/2;
		for(var i = 0; i < fillPieces*2 + 1; i++)
		{
			fill.graphics.beginFill((i%2==0?fgCol:"#e28df4"));
			fill.graphics.moveTo(x, y);
			fill.graphics.lineTo(x + sectionWidth, y);
			fill.graphics.lineTo(x + sectionWidth + bottomOffsetX, y + barHeight);
			fill.graphics.lineTo(x + bottomOffsetX, y + barHeight);
			fill.graphics.lineTo(x, y);
			x += sectionWidth;
		}
		fill.x = bg.x;
		fill.y = bg.y;
		fillProgressContainer.addChild(fill);
		
		this.update = function(time)
		{
			fill.x += time/10;
			if(fill.x - bg.x > sectionWidth*2)
			{
				fill.x -= sectionWidth*2;
			}
			
			cog1.rotation += time*ROT_CO;
			cog2.rotation -= time*ROT_CO/cog2.scaleX;
		}
		
		this.updateProgress = function(progress)
		{
			progressMask.scaleX = progress;
		}
	}
})();
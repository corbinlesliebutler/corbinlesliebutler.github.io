(function (){
	engibear.Piece = function(bean){
		
		for(var prop in bean)
		{
			this[prop] = bean[prop];
		}
		
		var img = engibear.preload.getResult(this.imgId);
		this.view = new createjs.Bitmap(img);
		this.view.regX = this.regX;
		this.view.regY = this.regY;
		this.atX += this.regX;
		this.atY += this.regY;
	}
})();
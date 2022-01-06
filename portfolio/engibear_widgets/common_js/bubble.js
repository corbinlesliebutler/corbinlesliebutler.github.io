(function (){
	engibear.Bubble = function(){
		
		var HIT_W = 850;
		var HIT_H = 320;
		var HIT_X = -120;
		var HIT_Y = -30;
		var OKEnabled = false;
		var OK_SCALE = 0.85;
		var showing = true;
		var okButton;
		var view = this.view = new createjs.Container();
		var container = new createjs.Container();
		view.addChild(container);
		var img = engibear.preload.getResult("bubble");
		var bmp = new createjs.Bitmap(img);
		bmp.regX = 90;
		bmp.regY = 16;
		bmp.rotation = 1;
		container.addChild(bmp);
		
		var textView = new createjs.Text("","50px BACKISSUES", "#000000");
		container.addChild(textView);
		textView.x = -30;
		
		setImage("ok_button");
		
		//hitArea
		var hitArea = new createjs.Shape();
		hitArea.graphics.beginFill("DeepSkyBlue").drawRect(HIT_X, HIT_Y, HIT_W, HIT_H);
		view.addChild(hitArea);
		view.hitArea = hitArea;
		//hitArea.alpha = 0.5;
		hitArea.visible = false;
		
		view.addEventListener("click", clickOK);
		
		
		
		this.update = function(time)
		{
			okButton.update(time);
		}
		
		this.setText = function(txt, fontSize)
		{
			if(fontSize == undefined){fontSize = 50;}
			textView.font = fontSize + "px BACKISSUES";
			textView.text = txt;
			textView.y = 135 - textView.getBounds().height/2;
		}
		
		this.show = function(ok)
		{
			if(!showing)
			{
				OKEnabled = false;
				okButton.view.scaleX = okButton.view.scaleY = 0;
				if(ok==undefined)
				{
					ok = true;
				}
				TweenMax.to(container, 0.3, {scaleX:1, scaleY:1, ease:Back.easeOut, onComplete:function(){
					if(ok)enableOK();
				}});
				showing = true;
				view.visible = true;
			}
		}
		
		function enableOK()
		{
			OKEnabled = true;
			TweenMax.to(okButton.view, 0.3, {scaleX:OK_SCALE, scaleY:OK_SCALE, ease:Back.easeOut});
		}
		this.enableOK = enableOK;
		
		function clickOK()
		{
			if(showing && OKEnabled)
			{
				TweenMax.to(container, 0.3, {scaleX:0, scaleY:0, ease:Back.easeIn, onComplete:function(){
					view.visible = false;
				}});
				showing = false;
				view.dispatchEvent("OK");
			}
		}
		
		function setImage(imgId)
		{
			if(okButton)
			{
				container.removeChild(okButton.view);
			}
			okButton = new engibear.OKButton(imgId);
			container.addChild(okButton.view);
			okButton.view.x = 600;
			okButton.view.y = 140;
			okButton.view.scaleX = okButton.view.scaleY = OK_SCALE;
		}
		this.setImage = setImage;
		
		/* function hide()
		{
			if(showing)
			{
				TweenMax.to(container, 0.3, {scaleX:0, scaleY:0, ease:Back.easeIn, onComplete:function(){
					view.visible = false;
				}});
				showing = false;
				//view.removeEventListener("click", hide);
			}
		}
		this.hide = hide; */
	}
})();
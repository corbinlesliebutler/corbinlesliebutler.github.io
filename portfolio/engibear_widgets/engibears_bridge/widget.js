(function(){
	
	var scripts = [
	"title.js",
	"glint.js",
	"crane.js",
	"piece.js",
	"arrow_button.js",
	"rhino.js",
	"glint_system.js"
	];
	
	for(var i = 0; i < scripts.length; i++)
	{
		var script = document.createElement('script');
		script.src = engibear.widget_src + "/" + scripts[i];
		document.getElementsByTagName("head")[0].appendChild(script);
	}
	
	engibear.manifest = engibear.manifest.concat([
		{id: "title", src:"engibears_bridge/assets/img/title.png"},
		{id: "glint1", src:"engibears_bridge/assets/img/glint1.png"},
		{id: "glint2", src:"engibears_bridge/assets/img/glint2.png"},
		{id: "crane", src:"engibears_bridge/assets/img/crane.png"},
		{id: "chain", src:"engibears_bridge/assets/img/chain.png"},
		{id: "arrow_button", src:"engibears_bridge/assets/img/arrow_button.png"},
		{id: "piece_1", src:"engibears_bridge/assets/img/pieces/piece_1.png"},
		{id: "piece_2", src:"engibears_bridge/assets/img/pieces/piece_2.png"},
		{id: "piece_3", src:"engibears_bridge/assets/img/pieces/piece_3.png"},
		{id: "piece_4", src:"engibears_bridge/assets/img/pieces/piece_4.png"},
		{id: "piece_5", src:"engibears_bridge/assets/img/pieces/piece_5.png"},
		{id: "piece_6", src:"engibears_bridge/assets/img/pieces/piece_6.png"},
		{id: "rhino", src:"engibears_bridge/assets/img/rhino.png"},
		{id: "stick_left", src:"engibears_bridge/assets/img/stick_left.jpg"},
		{id: "stick_right", src:"engibears_bridge/assets/img/stick_right.jpg"},
		{id: "bg_win", src:"engibears_bridge/assets/img/bg_win.jpg"},
		{id: "window", src:"engibears_bridge/assets/img/window.png"},
		{id: "mark", src:"engibears_bridge/assets/img/mark.png"},
		{id: "plan", src:"engibears_bridge/assets/img/plan.png"},
		{id: "bg", src:"engibears_bridge/assets/img/bg.jpg"}]);
		
engibear.Widget = function()
{
	const GAME_START = 0;
	const GAME_PLAY = 2;
	const GAME_OVER = 3;
	const BUTTON_PAD = 70;
	const BUTTON_Y = 200;//120;
	const CRANE_ON_Y = -200;
	const CRANE_OFF_Y = -500;
	const BUBBLE_START = {rot:-1, x:300, y:engibear.widgetHeight-240, scale:0.9};
	const ATTACH_RANGE = 10;
	const CRANE_MOVE_DUR = 1;
	const CRANE_RANGE_PAD = 200;
	const BTN_OFF_X = 130;
	const BTN_OFF_DUR = 0.5;
	var INITIATORS = [];
	var doingTutorial = false;
	
	INITIATORS[GAME_START] = {
		TITLE_SCALE:1,
		TITLE_X:engibear.widgetWidth/2,
		TITLE_Y:155,
		BG_X:0,
		BEAR_SCALE:1.4,
		BEAR_X:170,
		BEAR_Y:700,
		RHINO_X:1005,
		RHINO_Y:310,
		CRANE_X:100,
		CRANE_Y:-100,
		FG_X:0
	}
	
	INITIATORS[GAME_PLAY] = {
		TITLE_SCALE:0.4,
		TITLE_X:150,
		TITLE_Y:60,
		//TITLE_X:engibear.widgetWidth - 155,
		//TITLE_Y:engibear.widgetHeight - 60,
		BG_X:0,//-59,
		BEAR_SCALE:1,
		BEAR_X:-160,
		BEAR_Y:630,
		FG_X:-1100
	}
	
	var view = this.view = new createjs.Container();
	var HUDLayer = new createjs.Container();
	var buttonLayer = new createjs.Container();
	var mainLayer = new createjs.Container();
	var bridgeLayer = new createjs.Container();
	var fgLayer = new createjs.Container();
	var bookLayer = new createjs.Container();
	//var bearLayer = new createjs.Container();
	var gameState = GAME_START;
	var pieces = [
	{imgId:"piece_1", craneStartX:700, regX:59, regY:34, atX:318, atY:199},
	{imgId:"piece_2", craneStartX:500, regX:58, regY:46, atX:766, atY:184},
	{imgId:"piece_3", craneStartX:700, regX:52, regY:36, atX:412, atY:102},
	{imgId:"piece_4", craneStartX:400, regX:56, regY:29, atX:685, atY:97},
	{imgId:"piece_5", craneStartX:400, regX:97, regY:2, atX:510, atY:76},
	{imgId:"piece_6", craneStartX:600, regX:113, regY:35, atX:173, atY:78}
	];
	var sinCount = 0;
	var bg;
	var glintSystem;
	var title;
	var bear;
	var rhino;
	var bubble;
	var finger;
	var crane;
	var pieceIndex = 0;
	var buttonLeft;
	var buttonRight;
	var leftPressed = false;
	var rightPressed = false;
	var currentPiece;
	var controllingCrane = false;
	var bgWin;
	var winMask;
	var windowImage;
	var mark;
	var plan;
	var books;
	
	this.start = function()
	{
		var img;
		var bmp;
		
		view.addChild(mainLayer);
		view.addChild(fgLayer);
		view.addChild(buttonLayer);
		view.addChild(bookLayer);
		//view.addChild(bearLayer);
		view.addChild(HUDLayer);
		
		mainLayer.y = 60;//80;
		
		var img = engibear.preload.getResult("bg");
		bg = new createjs.Bitmap(img);
		mainLayer.addChild(bg);
		
		mainLayer.addChild(bridgeLayer);
		
		img = engibear.preload.getResult("bg_win");
		bgWin = new createjs.Bitmap(img);
		mainLayer.addChild(bgWin);
		bgWin.visible = false;
		winMask = new createjs.Shape();
		winMask.graphics.beginFill("#000").drawRect(0,0,img.width, img.height);
		bgWin.mask = winMask;
		
		glintSystem = new engibear.GlintSystem();
		mainLayer.addChild(glintSystem.view);
		
		crane = new engibear.Crane();
		mainLayer.addChild(crane.view);
		
		img = engibear.preload.getResult("window");
		windowImage = new createjs.Bitmap(img);
		windowImage.scaleX = windowImage.scaleY = 1/0.6;
		fgLayer.addChild(windowImage);
		windowImage.x = -5;
		windowImage.y = mainLayer.y - 100;
		windowImage = new createjs.Bitmap(img);
		windowImage.scaleX = windowImage.scaleY = 1/0.6;
		fgLayer.addChild(windowImage);
		windowImage.x = 1095;
		windowImage.y = mainLayer.y - 100;
		
		img = engibear.preload.getResult("mark");
		mark = new createjs.Bitmap(img);
		fgLayer.addChild(mark);
		mark.x = 1274;//1215;
		mark.y = 28 + mainLayer.y;
		mark.scaleX = mark.scaleY = 1/0.6;
		
		img = engibear.preload.getResult("plan");
		plan = new createjs.Bitmap(img);
		fgLayer.addChild(plan);
		plan.x = 400;//1215;
		plan.y = 170;
		plan.scaleX = plan.scaleY = 1/0.6;
		
		rhino = new engibear.Rhino();
		fgLayer.addChild(rhino.view);
		
		bear = new engibear.Bear();
		fgLayer.addChild(bear.view);
		
		title = new engibear.Title();
		HUDLayer.addChild(title.view);
		
		buttonLeft = new engibear.ArrowButton();
		buttonLayer.addChild(buttonLeft.view);
		buttonLeft.view.x = BUTTON_PAD;
		buttonLeft.view.y = BUTTON_Y;
		buttonRight = new engibear.ArrowButton();
		buttonLayer.addChild(buttonRight.view);
		buttonRight.view.x = engibear.widgetWidth-BUTTON_PAD;
		buttonRight.view.y = BUTTON_Y;
		buttonLeft.view.scaleX = -1;
		
		buttonLeft.view.visible = buttonRight.view.visible = false;
		
		buttonLeft.view.addEventListener("mousedown", mouseDownLeft);
		buttonRight.view.addEventListener("mousedown", mouseDownRight);
		engibear.stage.addEventListener("stagemouseup", stageUp);
		engibear.stage.enableMouseOver();
		createjs.Touch.enable(engibear.stage, true, false);
		
		bubble = new engibear.Bubble();
		HUDLayer.addChild(bubble.view);
		bubble.enableOK();
		//bubble.view.visible = false;
		
		finger = new engibear.Finger();
		HUDLayer.addChild(finger.view);
		finger.view.visible = false;
		
		for(var i = 0; i < pieces.length; i++)
		{
			pieces[i] = new engibear.Piece(pieces[i]);
		}
		
		goToStart();
	}
	
	/* function clickStage(event)
	{
		var touchX = event.stageX / view.scaleX;
		var touchY = event.stageY / view.scaleY;
		var circle = new createjs.Shape();
		circle.graphics.beginFill("#FFF").drawCircle(0,0,10);
		circle.x = touchX;
		circle.y = touchY;
		view.addChild(circle);
	} */
	
	function goToStart()
	{
		gameState = GAME_START;
		var init = INITIATORS[GAME_START];
		
		buttonLeft.view.x = -BTN_OFF_X
		buttonRight.view.x = engibear.widgetWidth + BTN_OFF_X;
		
		mainLayer.x = init.BG_X;
		
		fgLayer.x = init.FG_X;
		
		crane.view.x = init.CRANE_X;
		crane.view.y = init.CRANE_Y;
		
		title.view.x = init.TITLE_X;
		title.view.y = init.TITLE_Y;
		title.view.scaleX = title.view.scaleY = init.TITLE_SCALE;
		
		bear.view.scaleX = bear.view.scaleY = init.BEAR_SCALE;
		bear.view.x = init.BEAR_X;
		bear.view.y = init.BEAR_Y;
		
		rhino.view.x = init.RHINO_X;
		rhino.view.y = init.RHINO_Y;
		
		bubble.setText("Can you \nhelp me build \na new bridge?");
		bubble.setImage("ok_button");
		bubble.show();
		bubble.view.x = BUBBLE_START.x;
		bubble.view.y = BUBBLE_START.y;
		bubble.view.scaleX = bubble.view.scaleY = BUBBLE_START.scale;
		bubble.view.rotation = BUBBLE_START.rot;
		var cb = function(){bubble.view.removeEventListener("OK", cb);click_start();}
		bubble.view.addEventListener("OK", cb); 
		
		//grabPiece();
	}
	
	function click_start(event)
	{
		gameState = GAME_PLAY;
		doingTutorial = true;
		
		buttonLeft.view.visible = buttonRight.view.visible = true;
		
		var init = INITIATORS[GAME_PLAY];
		
		var DUR = 1.5;
		var EASE = Power3.easeInOut;
		
		var tl = new TimelineMax();
		tl.add(TweenMax.to(crane.view, DUR, {y:CRANE_OFF_Y, ease:Back.easeIn}));
		tl.add(TweenMax.to(fgLayer, DUR, {x:init.FG_X, ease:EASE}),0);
		tl.add(TweenMax.to(title.view, DUR, {x:init.TITLE_X, y:init.TITLE_Y, scaleX:init.TITLE_SCALE, scaleY:init.TITLE_SCALE, ease:EASE}),0);
		tl.addCallback(function(){grabPiece(false)});
		tl.add(TweenMax.to(buttonLeft.view, BTN_OFF_DUR, {x:BUTTON_PAD, ease:Back.easeOut}));
		tl.add(TweenMax.to(buttonRight.view, BTN_OFF_DUR, {x:engibear.widgetWidth - BUTTON_PAD, ease:Back.easeOut}), "-=" + BTN_OFF_DUR);
		tl.addCallback(function(){
			bubble.setText("Use the arrows\nto move the\npieces into place.", 45);
			bubble.show(false);
			var cb = function(){
				bubble.view.removeEventListener("OK", cb);
				grabPiece();
				TweenMax.delayedCall(CRANE_MOVE_DUR*1.5, enableMove);
				doingTutorial = false;
			}
			bubble.view.addEventListener("OK", cb);
			finger.view.visible = true;
			finger.view.x = engibear.widgetWidth + 200;
			finger.view.y = 100;
			var tutTl = new TimelineMax();
			tutTl.add(TweenMax.to(finger.view, 1.5, {x:buttonLeft.view.x, y:buttonLeft.view.y, ease:Power2.easeInOut}),0);
			tutTl.addCallback(finger.press, "-=0.3");
			tutTl.addCallback(function(){leftPressed = true;rhino.left();}, "+="+engibear.PRESS_TIME);
			tutTl.addCallback(function(){
				finger.release();
			}, "+=2");
			tutTl.add(TweenMax.to(finger.view, 0.5, {x:buttonLeft.view.x+100, y:buttonLeft.view.y-100, ease:Power2.easeInOut}),"+=0.3");
			tutTl.addCallback(bubble.enableOK);
			tutTl.add(TweenMax.to(finger.view, 0.5, {alpha:0}));
		}, "+=0.5");
		
		
		
		
		
		
	}
	
	function grabPiece(onScreen)
	{
		if(onScreen == undefined) onScreen = true;
		var piece = currentPiece = pieces[pieceIndex];
		var tl = new TimelineMax();
		if(onScreen)tl.add(TweenMax.to(crane.view, CRANE_MOVE_DUR/2, {y:CRANE_OFF_Y, ease:Back.easeIn}));
		tl.set(crane.view, {x:piece.craneStartX});
		tl.addCallback(function()
		{
			crane.setPiece(piece);
		});
		tl.add(TweenMax.to(crane.view, CRANE_MOVE_DUR, {y:CRANE_ON_Y, ease:Back.easeOut}));
		tl.addCallback(function()
		{
			controllingCrane = true;
		});
	}
	
	function mouseDownLeft(event) 
	{
		if(!doingTutorial)
		{
			leftPressed = true;
			rhino.left();
		}
	} 
	
	function mouseDownRight(event) 
	{
		if(!doingTutorial)
		{
			rightPressed = true;
			rhino.right();
		}
	} 
	
	function stageUp(event) 
	{
		if(!doingTutorial && (leftPressed || rightPressed))
		{
			crane.stop();
			leftPressed = rightPressed = false;
			rhino.release();
		}
	} 
	
	/* function mouseDownPiece(event) 
	{
		grabbing = true;
		var touchX = event.stageX / view.scaleX;
		var touchY = event.stageY / view.scaleY;
		currentGrabbed = event.target.model;
		grabPiece(currentGrabbed);
	} 
	
	function handleClickBooks(event)
	{
		view.dispatchEvent("clickBooks");
	}*/
	
	function disableMove()
	{
		buttonLeft.disable();
		buttonRight.disable();
		leftPressed = rightPressed = false;
	}
	
	function enableMove()
	{
		buttonLeft.enable();
		buttonRight.enable();
	}
	
	function handleRelease(event)
	{
		crane.view.removeEventListener("release", handleRelease);
		//attach
		currentPiece.view.x += crane.view.x;
		currentPiece.view.y += crane.view.y;
		currentPiece.view.rotation += crane.view.rotation;
		bridgeLayer.addChild(currentPiece.view);
		pieceIndex++;
		
		//grab new
		if(pieceIndex < pieces.length)
		{
			if(!doingTutorial)
			{
				grabPiece();
				TweenMax.delayedCall(CRANE_MOVE_DUR*1.5, enableMove);
			}
		}
		else
		{
			//win
			win();
		} 
		
	}
	
	function win()
	{
		bgWin.visible = true;
		winMask.scaleX = 0;
		TweenMax.to(crane.view, CRANE_MOVE_DUR, {y:CRANE_OFF_Y, ease:Back.easeIn});
		buttonLeft.view.mouseEnabled = false;
		buttonRight.view.mouseEnabled = false;
		TweenMax.to(buttonLeft.view, BTN_OFF_DUR, {x:-BTN_OFF_X, ease:Back.easeIn});
		TweenMax.to(buttonRight.view, BTN_OFF_DUR, {x:engibear.widgetWidth + BTN_OFF_X, ease:Back.easeIn});
		
		plan.visible = false;
		var init = INITIATORS[GAME_START];
		var DUR = 1.5;
		var EASE = Power3.easeInOut;
		var tl = new TimelineMax();
		tl.add(TweenMax.to(fgLayer, DUR, {x:init.FG_X, ease:EASE}));
		tl.add(TweenMax.to(winMask, 1, {scaleX:1}), "+=0.25");
		tl.addCallback(bear.smile, "-=0.5");
		tl.addCallback(function(){
			bubble.setText("Good job!\nMunnagong really \nneeded this bridge.", 45);
			bubble.show();
			var cbOuter = function(){
				bubble.view.removeEventListener("OK", cbOuter);
				books = new engibear.Books();
				books.view.addEventListener("click", handleClickBooks);
				bookLayer.addChild(books.view);
				bookLayer.addChild(bear.view);
				books.view.x = engibear.widgetWidth/2 + 50;
				books.view.rotation = 2;
				books.view.y = engibear.widgetHeight/2 - 20;
				books.view.scaleX = books.view.scaleY = 0;
				TweenMax.to(books.view, DUR/2, {scaleX:1.2, scaleY:1.2, ease:Back.easeOut});
				TweenMax.delayedCall(1, function(){
					bubble.setText("Learn more about \nBridges in the book\n\"Engibear's Bridge\".", 40);
					bubble.setImage("replay_button");
					bubble.show(false);
					});
				TweenMax.delayedCall(2.5, function(){
					bubble.enableOK();
					var cbInner = function(){
						bubble.view.removeEventListener("OK", cbInner);
						view.dispatchEvent("WIN");
					}
					bubble.view.addEventListener("OK", cbInner);
				});
			}
			bubble.view.addEventListener("OK", cbOuter);
			
			
		});
	}
	
	function handleClickBooks(event)
	{
		view.dispatchEvent("clickBooks");
	}
	
	this.update = function (time)
	{
		if(crane.view.visible)
		{
			if(rightPressed)
			{
				if(crane.view.x + mainLayer.x < engibear.widgetWidth-CRANE_RANGE_PAD)
				{
					crane.right();
				}
				else
				{
					crane.stop();
					rhino.release();
					rightPressed = false;
				}
			}
			else if(leftPressed)
			{
				if(crane.view.x + mainLayer.x > CRANE_RANGE_PAD)
				{
					crane.left();
				}
				else
				{
					crane.stop();
					rhino.release();
					rightPressed = false;
				}
			}
			if(controllingCrane)
			{
				if(crane.view.x > currentPiece.atX-ATTACH_RANGE && crane.view.x < currentPiece.atX+ATTACH_RANGE)
				{
					//place piece
					controllingCrane = false;
					crane.placePiece();
					rhino.release();
					crane.view.addEventListener("release", handleRelease);
					disableMove();
				}
			}
			crane.update(time);
		}
		if(buttonLeft.view.visible)
		{
			buttonLeft.update(time);
			buttonRight.update(time);
		}
		if(title.view.visible)
		{
			title.update(time);
		}
		if(bubble.view.visible)
		{
			bubble.update(time);
		}
		if(bear.view.visible)
		{
			bear.update(time);
		}
		if(glintSystem.view.visible)
		{
			glintSystem.update(time);
		}
		if(books && books.view.visible)
		{
			books.update(time);
		}
	}
}
})();
(function(){
	
	var scripts = [
	"title.js",
	"bot_frame.js",
	"bot_piece.js",
	"welder.js",
	"spark_system.js",
	"light.js"
	];
	
	for(var i = 0; i < scripts.length; i++)
	{
		var script = document.createElement('script');
		script.src = engibear.widget_src + "/" + scripts[i];
		document.getElementsByTagName("head")[0].appendChild(script);
	}
	
	engibear.manifest = engibear.manifest.concat([
		{id: "title", src:"engibears_dream/assets/img/title.png"},
		{id: "easle", src:"engibears_dream/assets/img/easle.png"},
		{id: "light", src:"engibears_dream/assets/img/light.png"},
		{id: "scaff", src:"engibears_dream/assets/img/scaff.png"},
		{id: "shelf", src:"engibears_dream/assets/img/shelf.png"},
		{id: "bot_arm_l", src:"engibears_dream/assets/img/bot_arm_l.png"},
		{id: "bot_arm_l_ext", src:"engibears_dream/assets/img/bot_arm_l_ext.png"},
		{id: "bot_arm_r", src:"engibears_dream/assets/img/bot_arm_r.png"},
		{id: "bot_arm_r_ext", src:"engibears_dream/assets/img/bot_arm_r_ext.png"},
		{id: "bot_leg_l", src:"engibears_dream/assets/img/bot_leg_l.png"},
		{id: "bot_leg_r", src:"engibears_dream/assets/img/bot_leg_r.png"},
		{id: "bot_head", src:"engibears_dream/assets/img/bot_head.png"},
		{id: "bot_torso", src:"engibears_dream/assets/img/bot_torso.png"},
		{id: "frame_top", src:"engibears_dream/assets/img/frame_top.png"},
		{id: "frame_bar", src:"engibears_dream/assets/img/frame_bar.png"},
		{id: "welder_arm_1", src:"engibears_dream/assets/img/welder/arm1.png"},
		{id: "welder_arm_2", src:"engibears_dream/assets/img/welder/arm2.png"},
		{id: "welder_nozzle", src:"engibears_dream/assets/img/welder/nozzle.png"},
		{id: "welder_flame", src:"engibears_dream/assets/img/welder/flame.png"},
		{id: "welder_spark", src:"engibears_dream/assets/img/welder/spark.png"},
		{id: "bg", src:"engibears_dream/assets/img/bg.jpg"}]);
		
engibear.Widget = function()
{
	var GAME_START = 0;
	var GAME_TRANSITION = 1;
	var GAME_PLAY = 2;
	var GAME_OVER = 3;
	var INITIATORS = [];
	
	var SHELF_STACK_X_SEPERATION = 1050;
	var SCAFF_TILE_H = 112;
	var SCAFF_X_SEPERATION = 300;
	var SCAFF_REPEAT_Y = 6;
	var SHELF_Y = [[0, 150, 300],[50,350]];
	var SHELF_PIECE_SCALE = 0.8;
	var GRAB_PIECE_SCALE = 0.73;
	var START_BUTTON_SCALE = 0.8;
	var BUBBLE_START = {rot:-1, x:300, y:engibear.widgetHeight-240, scale:0.9};
	var ATTACH_PIECE_SCALE = 0.7;
	var PIECE_SHINE_ALPHA = 0.5;
	var WELDER_Y = engibear.widgetHeight + 600;
	var hitLegL = new createjs.Shape();
	hitLegL.graphics.beginFill("blue").drawRect(-100, -150, 200, 200);
	var hitLegR = new createjs.Shape();
	hitLegR.graphics.beginFill("blue").drawRect(-100, -150, 200, 200);
	var hitArmL = new createjs.Shape();
	hitArmL.graphics.beginFill("blue").drawRect(-100, -150, 140, 250);
	var hitArmR = new createjs.Shape();
	hitArmR.graphics.beginFill("blue").drawRect(-40, -150, 140, 250);
	var hitHead = new createjs.Shape();
	hitHead.graphics.beginFill("blue").drawRect(-150, -100, 300, 200);
	var BOT_PIECES = [
		{imgId:"bot_leg_l", sparkX:115, sparkY:45, upY:460, wr1:55, wr2:-55, wr3:-95, shineScale:0.5, atX:83, atY:247, regX:100, regY:148, iStack:1, iShelf:0, shelfX:+50, shelfY:-50, shelfRot:0, hitShape:hitLegL},
		{imgId:"bot_leg_r", sparkX:80, sparkY:41, upY:460, wr1:-55, wr2:55, wr3:95, shineScale:0.5, atX:-82, atY:251, regX:94, regY:148, iStack:1, iShelf:0, shelfX:-150, shelfY:-50, shelfRot:0, hitShape:hitLegR},
		{imgId:"bot_torso", atX:3, atY:74, regX:217, regY:155, iStack:1, iShelf:1, shelfX:-50, shelfY:-130, shelfRot:0},
		{imgId:"bot_arm_r", sparkX:94, sparkY:21, upY:520, wr1:-55, wr2:65, wr3:40, shineScale:0.5, atX:-175, atY:85, regX:43, regY:153, iStack:0, iShelf:1, shelfX:50, shelfY:-40, shelfRot:-90, addImg:"bot_arm_r_ext", addX:95, addY:0, hitShape:hitArmR},
		{imgId:"bot_arm_l", sparkX:59, sparkY:31, upY:520, wr1:55, wr2:-65, wr3:-40, shineScale:0.5, atX:176, atY:85, regX:108, regY:163, iStack:0, iShelf:2, shelfX:30, shelfY:-40, shelfRot:90, addImg:"bot_arm_l_ext", addX:19, addY:12, hitShape:hitArmL},
		{imgId:"bot_head", sparkX:208, sparkY:152, upY:560, wr1:45, wr2:-50, wr3:-74, shineScale:0.5, atX:3, atY:-70, regX:140, regY:90, iStack:0, iShelf:0, shelfX:50, shelfY:-65, shelfRot:0, hitShape:hitHead}
	];
	
	INITIATORS[GAME_START] = {
		TITLE_SCALE:0.8,
		TITLE_X:engibear.widgetWidth/2,
		TITLE_Y:155,
		BG_SCALE:1.15,
		BG_X:engibear.widgetWidth/2 - 100,
		BG_Y:engibear.widgetHeight/2 + 100,
		EASLE_SCALE:1.6,
		EASLE_X:500,
		EASLE_Y:750,
		LIGHT_X:engibear.widgetWidth/2,
		LIGHT_Y:-270,
		LIGHT_SCALE:1,
		BEAR_SCALE:1.4,
		BEAR_X:190,
		BEAR_Y:700,
		SHELF_SCALE:2,
		SHELF_Y:300,
		FRAME_Y:engibear.widgetHeight+50
	}
	
	INITIATORS[GAME_PLAY] = {
		TITLE_SCALE:0.3,
		TITLE_X:150,
		TITLE_Y:60,
		BG_SCALE:0.9,
		BG_X:engibear.widgetWidth/2 - 80,
		BG_Y:engibear.widgetHeight/2 + 50,
		EASLE_SCALE:1,
		EASLE_X:engibear.widgetWidth/2,
		EASLE_Y:550,
		LIGHT_X:engibear.widgetWidth/2,
		LIGHT_Y:-180,
		LIGHT_SCALE:0.8,
		BEAR_SCALE:1,
		BEAR_X:140,
		BEAR_Y:630,
		SHELF_SCALE:0.75,
		SHELF_Y:300,
		FRAME_Y:343
	}
	
	var view = this.view = new createjs.Container();
	var HUDLayer = new createjs.Container();
	var mainLayer = new createjs.Container();
	var dragLayer = new createjs.Container();
	var botLayer = new createjs.Container();
	var pieceLayer = new createjs.Container();
	var blackLayer;
	var gameState = GAME_START;
	var sinCount = 0;
	var bg;
	var light;
	var title;
	var easle;
	var bear;
	var botFrame;
	var shelves;
	var welder;
	var bubble;
	var finger;
	var books;
	var grabbing = false;
	var currentGrabbed;
	var attachCount = 0;
	var winShine;
	
	this.start = function()
	{
		
		var img;
		var bmp;
		
		winShine = new engibear.Shine();
		botLayer.addChild(winShine.view);
		winShine.view.visible = false;
		
		blackLayer = new createjs.Shape();
		blackLayer.graphics.beginFill("#000").drawRect(0,0,engibear.widgetWidth, engibear.widgetHeight);
		blackLayer.visible = false;
		
		view.addChild(mainLayer);
		view.addChild(dragLayer);
		view.addChild(blackLayer);
		view.addChild(HUDLayer);
		
		dragLayer.mouseEnabled = false;
		
		img = engibear.preload.getResult("bg");
		bg = new createjs.Bitmap(img);
		mainLayer.addChild(bg);
		bg.regX = img.width/2;
		bg.regY = img.height/2;
		
		img = engibear.preload.getResult("easle");
		easle = new createjs.Bitmap(img);
		easle.resScale = 1/0.6;
		mainLayer.addChild(easle);
		easle.regX = img.width/2;
		easle.regY = img.height/2;
		
		light = new engibear.Light();
		mainLayer.addChild(light.view);
		
		shelves = new createjs.Container();
		var scaffLayer = new createjs.Container();
		shelves.addChild(scaffLayer);
		shelves.addChild(pieceLayer);
		for(var iStack = 0; iStack<2; iStack++)
		{
			for(var iScaff = 0; iScaff<SCAFF_REPEAT_Y; iScaff++)
			{
					img = engibear.preload.getResult("scaff");
					bmp = new createjs.Bitmap(img);
					bmp.regX = img.width/2;
					bmp.x = -SHELF_STACK_X_SEPERATION/2 + iStack * SHELF_STACK_X_SEPERATION - SCAFF_X_SEPERATION/2 + (1-iStack) * SCAFF_X_SEPERATION;
					bmp.y = SHELF_Y[iStack][0] + SCAFF_TILE_H*iScaff;
					scaffLayer.addChild(bmp);
			}
			for(var iShelf = 0; iShelf<SHELF_Y[iStack].length; iShelf++)
			{
				var shelfY = SHELF_Y[iStack][iShelf];
				img = engibear.preload.getResult("shelf");
				bmp = new createjs.Bitmap(img);
				bmp.regX = img.width/2;
				bmp.regY = img.height/2;
				bmp.x = -SHELF_STACK_X_SEPERATION/2 + iStack * SHELF_STACK_X_SEPERATION;
				bmp.y = shelfY;
				shelves.addChild(bmp);
			}
		}
		
		for(var iPiece = 0; iPiece<BOT_PIECES.length; iPiece++)
		{
			var piece = BOT_PIECES[iPiece] = new engibear.BotPiece(BOT_PIECES[iPiece]);
			piece.calcX = -SHELF_STACK_X_SEPERATION/2 + piece.iStack * SHELF_STACK_X_SEPERATION + piece.shelfX;
			piece.calcY = SHELF_Y[piece.iStack][piece.iShelf] + piece.shelfY;
		}
		mainLayer.addChild(shelves);
		shelves.x = engibear.widgetWidth/2;
		
		botFrame = new engibear.BotFrame();
		mainLayer.addChild(botFrame.view);
		botFrame.view.x = engibear.widgetWidth/2;
		
		mainLayer.addChild(botLayer);
		botLayer.x = engibear.widgetWidth/2;
		botLayer.y = engibear.widgetHeight/2;
		
		welder = new engibear.Welder();
		mainLayer.addChild(welder.view);
		welder.view.x = engibear.widgetWidth/2;
		welder.view.y = WELDER_Y;
		welder.view.scaleX = welder.view.scaleY = 0.6;
		welder.view.visible = false;
		
		bear = new engibear.Bear();
		HUDLayer.addChild(bear.view);
		
		title = new engibear.Title();
		HUDLayer.addChild(title.view);
		
		bubble = new engibear.Bubble();
		HUDLayer.addChild(bubble.view);
		bubble.enableOK();
		
		finger = new engibear.Finger();
		HUDLayer.addChild(finger.view);
		
		engibear.stage.addEventListener("stagemousemove", stageMove);
		engibear.stage.addEventListener("stagemouseup", stageUp);
		engibear.stage.enableMouseOver();
		createjs.Touch.enable(engibear.stage, true, false);
		
		goToStart();
	}
	
	function goToStart()
	{
		//gameState = GAME_PLAY;
		gameState = GAME_START;
		attachCount = 0;
		var init = INITIATORS[gameState];
		
		shelves.visible = false;
		finger.view.visible = false;
		
		bg.x = init.BG_X;
		bg.y = init.BG_Y;
		bg.scaleX = bg.scaleY = init.BG_SCALE;
		
		easle.scaleX = easle.scaleY = init.EASLE_SCALE * easle.resScale;
		easle.x = init.EASLE_X;
		easle.y = init.EASLE_Y;
		
		bear.view.scaleX = bear.view.scaleY = init.BEAR_SCALE;
		bear.view.x = init.BEAR_X;
		bear.view.y = init.BEAR_Y;
		
		light.view.x = init.LIGHT_X;
		light.view.y = init.LIGHT_Y;
		light.view.scaleX = light.view.scaleY = init.LIGHT_SCALE;
		
		title.view.x = init.TITLE_X;
		title.view.y = init.TITLE_Y;
		title.view.scaleX = title.view.scaleY = init.TITLE_SCALE;
		
		botFrame.view.y = init.FRAME_Y;
		
		shelves.scaleX = shelves.scaleY = init.SHELF_SCALE;
		shelves.y = init.SHELF_Y;
		
		for(var iPiece = 0; iPiece<BOT_PIECES.length; iPiece++)
		{
			var piece = BOT_PIECES[iPiece];
			pieceLayer.addChild(piece.view);
			piece.view.x = piece.calcX;
			piece.view.y = piece.calcY;
			piece.view.rotation = piece.shelfRot;
			piece.view.scaleX = piece.view.scaleY = SHELF_PIECE_SCALE;
			piece.init_reset();
			piece.view.addEventListener("mousedown", mouseDownPiece);
		}
		
		bubble.setText("Can you \nhelp me build \na new Bearbot?");
		bubble.setImage("ok_button");
		bubble.show();
		bubble.view.x = BUBBLE_START.x;
		bubble.view.y = BUBBLE_START.y;
		bubble.view.scaleX = bubble.view.scaleY = BUBBLE_START.scale;
		bubble.view.rotation = BUBBLE_START.rot;
		//bubble.view.addEventListener("OK", click_start);
		var cb = function(){bubble.view.removeEventListener("OK", cb);click_start();}
		bubble.view.addEventListener("OK", cb);
		
		//HUDLayer.addChild(startButton.view);
		//startButton.view.addEventListener("click", click_start);
	}
	
	function click_start(event)
	{
		mainLayer.mouseEnabled = false;
		shelves.visible = true;
		gameState = GAME_PLAY;
		var init = INITIATORS[gameState];
		
		var DUR = 1.5;
		var EASE = Power3.easeInOut;
		
		var tl = new TimelineMax({onComplete:function(){
			bubble.setText("Drag the \nparts to the \ncorrect positions.", 45);
			bubble.show(false);
			var cb = function(){
				hideBear();
				bubble.view.removeEventListener("OK", cb);
				mainLayer.mouseEnabled = true;
			}
			bubble.view.addEventListener("OK", cb);
			finger.view.visible = true;
			finger.view.x = -200;//engibear.widgetWidth + 50;
			finger.view.y = 100;//engibear.widgetHeight/2;
			const TUTORIAL_PIECE = BOT_PIECES[2];
			var torsoX = TUTORIAL_PIECE.calcX * shelves.scaleX + shelves.x;
			var torsoY = TUTORIAL_PIECE.calcY * shelves.scaleY + shelves.y;
			var tutTl = new TimelineMax();
			tutTl.add(TweenMax.to(finger.view, 1.5, {x:torsoX, y:torsoY, ease:Power2.easeInOut}),0);
			tutTl.addCallback(finger.press, "-=0.3");
			tutTl.addCallback(grabPiece, "+="+engibear.PRESS_TIME, [TUTORIAL_PIECE]);
			tutTl.add(TweenMax.to(finger.view, 0.8, {x:TUTORIAL_PIECE.atX + botLayer.x, y:TUTORIAL_PIECE.atY + botLayer.y, ease:Power1.easeInOut, onUpdate:function(){
				TUTORIAL_PIECE.view.x = finger.view.x;
				TUTORIAL_PIECE.view.y = finger.view.y;
			}}),"+=0.2");
			tutTl.addCallback(function(){
				finger.release();
				attachPiece(TUTORIAL_PIECE);
			});
			tutTl.add(TweenMax.to(finger.view, 0.5, {x:TUTORIAL_PIECE.atX+botLayer.x+100, y:TUTORIAL_PIECE.atY+botLayer.y-100, ease:Power2.easeInOut}),"+=0.3");
			tutTl.addCallback(bubble.enableOK);
			tutTl.add(TweenMax.to(finger.view, 0.5, {alpha:0}));
		}});
		tl.add(TweenMax.to(bear.view, DUR, {x:init.BEAR_X, y:init.BEAR_Y, scaleX:init.BEAR_SCALE, scaleY:init.BEAR_SCALE, ease:Power2.easeInOut}),0);
		tl.add(TweenMax.to(easle, DUR, {x:init.EASLE_X, y:init.EASLE_Y, scaleX:init.EASLE_SCALE*easle.resScale, scaleY:init.EASLE_SCALE*easle.resScale, ease:EASE}),0);
		tl.add(TweenMax.to(bg, DUR, {x:init.BG_X, y:init.BG_Y, scaleX:init.BG_SCALE, scaleY:init.BG_SCALE, ease:EASE}),0);
		tl.add(TweenMax.to(title.view, DUR, {x:init.TITLE_X, y:init.TITLE_Y, scaleX:init.TITLE_SCALE, scaleY:init.TITLE_SCALE, ease:EASE}),0);
		tl.add(TweenMax.to(shelves, DUR, {y:init.SHELF_Y, scaleX:init.SHELF_SCALE, scaleY:init.SHELF_SCALE, ease:EASE}),0);
		tl.add(TweenMax.to(light.view, DUR, {y:init.LIGHT_Y, scaleX:init.LIGHT_SCALE, scaleY:init.LIGHT_SCALE, ease:EASE}),0);
		tl.add(TweenMax.to(botFrame.view, DUR/2, {y:init.FRAME_Y, scaleX:init.LIGHT_SCALE, scaleY:init.LIGHT_SCALE, ease:Back.easeOut}),DUR/2);
	}
	
	function hideBear() 
	{
		TweenMax.to(bear.view, 0.5, {x:-150, ease:Power2.easeIn, onComplete:function(){
			bear.view.visible = false;
		}});
	}
	
	function mouseDownPiece(event) 
	{
		grabbing = true;
		var touchX = event.stageX / view.scaleX;
		var touchY = event.stageY / view.scaleY;
		currentGrabbed = event.target.model;
		grabPiece(currentGrabbed);
	}
	
	function grabPiece(piece)
	{
		dragLayer.addChild(piece.view);
		piece.view.scaleX = piece.view.scaleY = shelves.scaleX * SHELF_PIECE_SCALE;
		piece.view.x = shelves.x + piece.calcX * shelves.scaleX;
		piece.view.y = shelves.y + piece.calcY * shelves.scaleY;
		piece.grab();
		TweenMax.to(piece.view, 0.3, {scaleX:GRAB_PIECE_SCALE, scaleY:GRAB_PIECE_SCALE, rotation:0});
	}
	
	function attachPiece(piece)
	{
		attachCount++;
		mainLayer.mouseEnabled = false;
		piece.attached = true;
		for(var i = 0; i < BOT_PIECES.length; i++)
		{
			var p = BOT_PIECES[i];
			if(p.attached)
			{
				botLayer.addChild(p.view);
			}
		}
		piece.view.x -= botLayer.x;
		piece.view.y -= botLayer.y;
		piece.view.removeEventListener("mousedown", mouseDownPiece);
		
		TweenMax.to(piece.view, 0.2, {x:piece.atX, y:piece.atY, scale:ATTACH_PIECE_SCALE, ease:Power1.easeOut, onComplete:function(){
			piece.attach();
			if(piece.imgId != "bot_torso")
			{
				welder.weld(piece);
			}
		}});
		TweenMax.delayedCall(1.2, function(){
			mainLayer.mouseEnabled = true;
		});
		
	}
	
	function stageUp(event) 
	{
		if(grabbing)
		{
			grabbing = false;
			var dist = CommonUtil.distance(currentGrabbed.view.x-botLayer.x,currentGrabbed.view.y-botLayer.y, currentGrabbed.atX, currentGrabbed.atY);
			if( dist < 60)
			{
				attachPiece(currentGrabbed);
				if(attachCount == BOT_PIECES.length)
				{
					TweenMax.delayedCall(1.7, win);
					return;
				}
			}
			else
			{
				var releasePiece = currentGrabbed;
				releasePiece.view.removeEventListener("mousedown", mouseDownPiece);
				var shelfX = shelves.x + releasePiece.calcX*shelves.scaleX;
				var shelfY = shelves.y + releasePiece.calcY*shelves.scaleY;
				var scaleTo = shelves.scaleX * SHELF_PIECE_SCALE;
				TweenMax.to(releasePiece.view, 0.5, {x:shelfX, y:shelfY, scale:scaleTo, ease:Power1.easeOut, rotation:releasePiece.shelfRot, onComplete:function(){
					releasePiece.view.x = releasePiece.calcX;
					releasePiece.view.y = releasePiece.calcY;
					releasePiece.view.scaleX = releasePiece.view.scaleY = SHELF_PIECE_SCALE;
					pieceLayer.addChild(releasePiece.view);
					releasePiece.view.addEventListener("mousedown", mouseDownPiece);
					releasePiece.reShelf();
				}});
			}
		}
	}
	
	function win()
	{
		gameState = GAME_OVER;
		bear.smile();
		mainLayer.mouseEnabled = false;
		var bookLayer = new createjs.Container();
		view.addChild(botLayer);
		view.addChild(bookLayer);
		view.addChild(HUDLayer);
		bear.view.visible = true;
		winShine.view.visible = true;
		winShine.view.scaleX = winShine.view.scaleY = 0;
		blackLayer.visible = true;
		blackLayer.alpha = 0;
		const DUR = 0.8;
		var init = INITIATORS[GAME_START];
		TweenMax.to(blackLayer, DUR, {alpha:0.5});
		TweenMax.to(winShine.view, DUR, {scaleX:1, scaleY:1, ease:Back.easeOut});
		TweenMax.to(botLayer, DUR, {scaleX:1.5, scaleY:1.5, y:engibear.widgetHeight/2-100, ease:Back.easeOut});
		TweenMax.to(bear.view, DUR, {delay:1, x:init.BEAR_X, y:init.BEAR_Y, scaleX:init.BEAR_SCALE, scaleY:init.BEAR_SCALE, ease:Power2.easeInOut, onComplete:function(){
			bubble.setText("Well done! \nThis is the best \nBearbot yet.");
			bubble.show();
			var cbOuter = function(){
				bubble.view.removeEventListener("OK", cbOuter);
				books = new engibear.Books();
				books.view.addEventListener("click", handleClickBooks);
				bookLayer.addChild(books.view);
				books.view.x = engibear.widgetWidth/2 + 50;
				books.view.rotation = 2;
				books.view.y = engibear.widgetHeight/2 - 20;
				books.view.scaleX = books.view.scaleY = 0;
				TweenMax.to(botLayer, DUR, {scaleX:0, scaleY:0, ease:Back.easeIn});
				TweenMax.to(books.view, DUR/2, {delay:DUR, scaleX:1.2, scaleY:1.2, ease:Back.easeOut});
				TweenMax.delayedCall(DUR + 1, function(){
					bubble.setText("Learn more about \nBearbot in the book\n\"Engibear's Dream\".", 40);
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
			
		}});
		
	}
	
	function handleClickBooks(event)
	{
		view.dispatchEvent("clickBooks");
	}
	
	function stageMove(event) 
	{
		if(grabbing)
		{
			currentGrabbed.view.x = event.stageX / view.scaleX;
			currentGrabbed.view.y = event.stageY / view.scaleY;
		}
	}
	
	this.update = function (time)
	{
		if(title.view.visible)
		{
			title.update(time);
		}
		if(bubble.view.visible)
		{
			bubble.update(time);
		}
		if(light.view.visible)
		{
			light.update(time);
		}
		if(bear.view.visible)
		{
			bear.update(time);
		}
		if(welder.view.visible)
		{
			welder.update(time);
		}
		if(winShine.view.visible)
		{
			winShine.update(time);
		}
		if(books && books.view.visible)
		{
			books.update(time);
		}
		for(var i = 0; i < BOT_PIECES.length; i++)
		{
			BOT_PIECES[i].update(time);
		}
		/* switch(gameState)
		{
			case GAME_START:
				light.update(time);
				title.update(time);
				bear.update(time);
				//startButton.update(time);
			break;
			case GAME_PLAY:
				light.update(time);
				title.update(time);
				bear.update(time);
			break;
		} */
	}
}
})();
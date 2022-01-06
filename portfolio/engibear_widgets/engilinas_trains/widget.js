(function(){
	
	var scripts = [
	"title.js",
	"lina.js",
	"bar.js",
	"coal_group.js",
	"control_room.js",
	"arrow_button.js",
	"spark_system.js",
	"train.js"
	];
	
	for(var i = 0; i < scripts.length; i++)
	{
		var script = document.createElement('script');
		script.src = engibear.widget_src + "/" + scripts[i];
		document.getElementsByTagName("head")[0].appendChild(script);
	}
	
	engibear.manifest = engibear.manifest.concat([
		{id: "title", src:"engilinas_trains/assets/img/title.png"},
		{id: "lina_blink", src:"engilinas_trains/assets/img/lina_blink.png"},
		{id: "control_room_bg", src:"engilinas_trains/assets/img/control_room_bg.jpg"},
		{id: "control_room_fg", src:"engilinas_trains/assets/img/control_room_fg.png"},
		{id: "control_room_glow", src:"engilinas_trains/assets/img/control_room_glow.jpg"},
		{id: "coal1", src:"engilinas_trains/assets/img/coal1.png"},
		{id: "coal2", src:"engilinas_trains/assets/img/coal2.png"},
		{id: "coal3", src:"engilinas_trains/assets/img/coal3.png"},
		{id: "bar", src:"engilinas_trains/assets/img/bar.png"},
		{id: "join", src:"engilinas_trains/assets/img/join.png"},
		{id: "marlin_wheel_large", src:"engilinas_trains/assets/img/marlin_wheel_large.png"},
		{id: "marlin_wheel_small", src:"engilinas_trains/assets/img/marlin_wheel_small.png"},
		{id: "marlin_bg", src:"engilinas_trains/assets/img/marlin_bg.png"},
		{id: "marlin_fg", src:"engilinas_trains/assets/img/marlin_fg.png"},
		{id: "scenery", src:"engilinas_trains/assets/img/scenery2.jpg"},
		{id: "tracks", src:"engilinas_trains/assets/img/tracks.jpg"},
		{id: "shed_wall", src:"engilinas_trains/assets/img/shed_wall.png"},
		{id: "platform", src:"engilinas_trains/assets/img/platform.png"},
		{id: "platform_end", src:"engilinas_trains/assets/img/platform_end.png"},
		{id: "carriage", src:"engilinas_trains/assets/img/carriage.png"},
		{id: "pump_bar", src:"engilinas_trains/assets/img/pump_bar.png"},
		{id: "pad_platform", src:"engilinas_trains/assets/img/pad_platform.png"},
		{id: "magtrack_l", src:"engilinas_trains/assets/img/magtrack_l.png"},
		{id: "magtrack_m", src:"engilinas_trains/assets/img/magtrack_m.png"},
		{id: "magtrack_r", src:"engilinas_trains/assets/img/magtrack_r.png"},
		{id: "maglev", src:"engilinas_trains/assets/img/maglev.png"},
		{id: "mag_mid", src:"engilinas_trains/assets/img/mag_mid.png"},
		{id: "mag_pole_top", src:"engilinas_trains/assets/img/mag_pole_top.png"},
		{id: "mag_pole_bottom", src:"engilinas_trains/assets/img/mag_pole_bottom.png"},
		{id: "machine", src:"engilinas_trains/assets/img/machine.png"},
		{id: "arrow_right_on", src:"engilinas_trains/assets/img/arrow_right_on.png"},
		{id: "arrow_right_off", src:"engilinas_trains/assets/img/arrow_right_off.png"},
		{id: "arrow_up_on", src:"engilinas_trains/assets/img/arrow_up_on.png"},
		{id: "arrow_up_off", src:"engilinas_trains/assets/img/arrow_up_off.png"},
		{id: "tree", src:"engilinas_trains/assets/img/tree.png"},
		{id: "strappy", src:"engilinas_trains/assets/img/strappy.png"},
		{id: "bush", src:"engilinas_trains/assets/img/bush.png"},
		{id: "mac", src:"engilinas_trains/assets/img/mac.png"},
		{id: "fg_grass", src:"engilinas_trains/assets/img/fg_grass.png"},
		{id: "spark", src:"engilinas_trains/assets/img/spark.png"},
		{id: "steam", src:"engilinas_trains/assets/img/steam.png"},
		{id: "engilina", src:"engilinas_trains/assets/img/engilina.png"}]);
		
engibear.Widget = function()
{
	engibear.RAISE_TIME = 1;
	const GAME_START = 0;
	const GAME_PLAY = 2;
	const GAME_OVER = 3;
	const PLATFORM_PIECES = 10;
	const PLATFORM_PIECE_WIDTH = 180;//474;
	const TRACK_PIECES = 4;
	const TRACK_PIECE_WIDTH = 397;
	const ZOOM_REG_X = 500;
	const ZOOM_REG_Y = 350;
	const TRAIN_FOLLOW_X = 650;//970;
	const TRAIN_DIST = 7000;
	const BG_DIST = 765;
	const MID_CO = 0.8;
	const FG_CO = 1.5;
	const FLOAT_ACC = 0.8;
	//const FLOAT_GRAV = 0.3;
	//const MID_DIST = TRAIN_DIST * 0.8;
	//const FG_DIST = TRAIN_DIST * 1.5;
	const TRAIN_TIME = 10;//1;//10;
	const BUBBLE_START = {rot:-1, x:300, y:engibear.widgetHeight-240, scale:0.9};
	const RES_SCALE = 1/0.6;
	const BTN_SHINE_SCALE = 0.7;
	
	const TREE = {img:"tree", regX:320, regY:614};
	const BUSH = {img:"bush", regX:301, regY:132};
	const STRAPPY = {img:"strappy", regX:178, regY:139};
	
	const FG_ITEMS = [
	{item:TREE, x:0.2},
	{item:STRAPPY, x: 0.3},
	{item:BUSH, x: 0.5},
	{item:STRAPPY, x: 0.6},
	{item:BUSH, x: 0.7},
	{item:TREE, x: 0.9},
	{item:STRAPPY, x: 0.95}
	];
	const MID_ITEMS = [
	{item:BUSH, x: 0.2},
	{item:TREE, x: 0.4},
	{item:BUSH, x: 0.6},
	{item:STRAPPY, x: 0.8}
	];
	
	const INIT_TITLE = {
		TITLE_SCALE:1,
		TITLE_X:engibear.widgetWidth/2,
		TITLE_Y:155,
		BEAR_SCALE:1.2,
		BEAR_X:170,
		BEAR_Y:570,
		FG_LAYER_SCALE:1,
		TRAIN_X:122,
		TRAIN_Y:200,
		TRACK_Y:460,
		TRAIN_LAYER_SCALE:1,
		MID_SCALE:1,
		ROOM_SCALE:0.5
	}
	
	const INIT_CONTROL_ROOM = {
		TITLE_SCALE:0.4,
		TITLE_X:150,
		TITLE_Y:60,
		BEAR_SCALE:2,
		BEAR_X:0,
		BEAR_Y:630,
		FG_LAYER_SCALE:10,
		TRAIN_LAYER_SCALE:7,
		MID_SCALE:2,
		ROOM_SCALE:1
	}
	
	const INIT_FOLLOW_TRAIN = {
		FG_LAYER_SCALE:0.7,
		TRAIN_LAYER_SCALE:0.5,
		MID_SCALE:0.4
	}
	
	var view = this.view = new createjs.Container();
	var HUDLayer = new createjs.Container();
	var mainLayer = new createjs.Container();
	var fgLayer = new createjs.Container();
	var trackLayer = new createjs.Container();
	var trainLayer = new createjs.Container();
	var magLayer = new createjs.Container();
	var roomLayer = new createjs.Container();
	var midLayer = new createjs.Container();
	var bookLayer = new createjs.Container();
	var gameState = GAME_START;
	var doingTutorial = false;
	var followingTrain = false;
	var trainFollowX = {val:0};
	var sinCount = 0;
	var title;
	var bear;
	var lina;
	var bubble;
	var finger;
	var books;
	var controlRoom;
	var train;
	var shedWall;
	var magMid;
	var scenery;
	var tracks = [];
	var platform;
	var tweenEase;
	var btnUp;
	var btnRight;
	var shineUp;
	var shineRight;
	var touchRight;
	
	this.start = function()
	{
		var img;
		var bmp;
		
		img = engibear.preload.getResult("scenery");
		scenery = new createjs.Bitmap(img);
		mainLayer.addChild(scenery);
		
		mainLayer.addChild(trackLayer);
		mainLayer.addChild(midLayer);
		mainLayer.addChild(roomLayer);
		mainLayer.addChild(trainLayer);
		mainLayer.addChild(magLayer);
		mainLayer.addChild(fgLayer);
		view.addChild(mainLayer);
		view.addChild(bookLayer);
		view.addChild(HUDLayer);
		
		trackLayer.regX = midLayer.regX = trainLayer.regX = fgLayer.regX = ZOOM_REG_X;
		trackLayer.regY = midLayer.regY = trainLayer.regY = fgLayer.regY = ZOOM_REG_Y;
		
		for(var i = 0; i < TRACK_PIECES; i++)
		{
			img = engibear.preload.getResult("tracks");
			var track = new createjs.Bitmap(img);
			track.x = i*TRACK_PIECE_WIDTH;
			track.y = INIT_TITLE.TRACK_Y;//460;//510;
			tracks.push(track);
			trackLayer.addChild(track);
		}
		
		img = engibear.preload.getResult("shed_wall");
		shedWall = new createjs.Bitmap(img);
		shedWall.x = -5;
		shedWall.y = -12;
		shedWall.scaleX = shedWall.scaleY = 0.9 * (1/0.6);
		midLayer.addChild(shedWall);
		
		img = engibear.preload.getResult("mag_mid");
		magMid = new createjs.Bitmap(img);
		magMid.x = TRAIN_DIST - 200;
		magMid.y = -210;
		magMid.scaleX = magMid.scaleY = RES_SCALE;
		midLayer.addChild(magMid);
		
		//fg platform
		var piece;
		var iX = 0;
		const PIECE_Y = 600;
		for(var i = 0; i < PLATFORM_PIECES; i++)
		{
			img = engibear.preload.getResult("platform");
			piece = new createjs.Bitmap(img);
			piece.x = iX;
			piece.y = PIECE_Y;
			fgLayer.addChild(piece);
			iX += PLATFORM_PIECE_WIDTH;
		}
		img = engibear.preload.getResult("platform_end");
		piece = new createjs.Bitmap(img);
		piece.x = iX;
		piece.y = PIECE_Y + 1;
		fgLayer.addChild(piece);
		iX+=70;
		
		//fg_grass
		while(iX < TRAIN_DIST * FG_CO + 1000)
		{
			img = engibear.preload.getResult("fg_grass");
			var bmp = new createjs.Bitmap(img);
			bmp.x = iX;
			bmp.y = 650;
			//bmp.scaleX = bmp.scaleY = 0.8;
			fgLayer.addChild(bmp);
			iX+=397;
		}
		
		train = new engibear.Train();
		trainLayer.addChild(train.view);
		
		//magtrack
		const TX = TRAIN_DIST + 701;
		const TY = 46;
		const LW = 57;//58;
		const MW = 55;//56;
		const RW = 58;//59;
		const M_COUNT = 10;
		const TW = LW + (MW*M_COUNT) + RW - 3;
		
		
		//pole
		img = engibear.preload.getResult("mag_pole_top");
		var poleTop = new createjs.Bitmap(img);
		magLayer.addChild(poleTop);
		poleTop.x = TX + 150;
		poleTop.y = TY + 120;
		for(var j = 0; j<20; j++)
		{
			img = engibear.preload.getResult("mag_pole_bottom");
			var p = new createjs.Bitmap(img);
			magLayer.addChild(p);
			p.x = poleTop.x;
			p.y = poleTop.y + 69 + 29*j;
		}
		
		//track
		for(var i = 0; i < 2; i++)
		{
			img = engibear.preload.getResult("magtrack_l");
			var l = new createjs.Bitmap(img);
			magLayer.addChild(l);
			l.x = TX + TW*i;
			l.y = TY;
			for(var j = 0; j<M_COUNT; j++)
			{
				img = engibear.preload.getResult("magtrack_m");
				var m = new createjs.Bitmap(img);
				magLayer.addChild(m);
				m.x = l.x + LW + MW * j;
				m.y = TY;
			}
			img = engibear.preload.getResult("magtrack_r");
			var r = new createjs.Bitmap(img);
			magLayer.addChild(r);
			r.x = l.x + LW + (MW*M_COUNT);
			r.y = TY;
		}
		
		lina = new engibear.Lina();
		fgLayer.addChild(lina.view);
		
		//mag control
		
		img = engibear.preload.getResult("machine");
		var machine = new createjs.Bitmap(img);
		machine.x = TRAIN_DIST*FG_CO + 1055;
		machine.y = -170;
		machine.scaleX = machine.scaleY = RES_SCALE;
		fgLayer.addChild(machine);
		
		bear = new engibear.Bear();
		fgLayer.addChild(bear.view);
		bear.view.x = machine.x + 605;
		bear.view.y = machine.y + 450;
		bear.view.scaleX = bear.view.scaleY = 1.4;
		bear.view.visible = false;
		
		btnUp = new engibear.ArrowButton("arrow_up_off", "arrow_up_on", 109, 88);
		btnRight = new engibear.ArrowButton("arrow_right_off", "arrow_right_on", 72, 108);
		btnUp.view.x = machine.x + 966;
		btnUp.view.y = machine.y + 87;
		btnRight.view.x = machine.x + 1195;
		btnRight.view.y = machine.y + 72;
		
		shineUp = new engibear.Shine();
		shineUp.view.x = btnUp.view.x + btnUp.cX;
		shineUp.view.y = btnUp.view.y + btnUp.cY;
		shineRight = new engibear.Shine();
		shineRight.view.x = btnRight.view.x + btnRight.cX;
		shineRight.view.y = btnRight.view.y + btnRight.cY;
		shineUp.view.scaleX = shineUp.view.scaleY = BTN_SHINE_SCALE;
		shineRight.view.scaleX = shineRight.view.scaleY = 0;
		shineRight.view.alpha = 0;
		
		fgLayer.addChild(shineUp.view);
		fgLayer.addChild(shineRight.view);
		
		fgLayer.addChild(btnUp.view);
		fgLayer.addChild(btnRight.view);
		
		touchRight = new createjs.Container();
		var touchShape = new createjs.Shape();
		touchShape.graphics.beginFill("blue").drawCircle(0,0,100);
		touchRight.hitArea = touchShape;
		//touchRight.addChild(touchShape);
		touchRight.x = shineRight.view.x;
		touchRight.y = shineRight.view.y;
		fgLayer.addChild(touchRight);
		
		touchUp = new createjs.Container();
		var touchShape = new createjs.Shape();
		touchShape.graphics.beginFill("blue").drawCircle(0,0,100);
		touchUp.hitArea = touchShape;
		touchUp.x = shineUp.view.x;
		touchUp.y = shineUp.view.y;
		fgLayer.addChild(touchUp);
		
		//items
		for(var i = 0; i < FG_ITEMS.length; i++)
		{
			var item = FG_ITEMS[i];
			img = engibear.preload.getResult(item.item.img);
			var bmp = new createjs.Bitmap(img);
			bmp.regX = item.item.regX / RES_SCALE;
			bmp.regY = item.item.regY / RES_SCALE;
			bmp.x = ZOOM_REG_X + item.x*TRAIN_DIST*FG_CO;
			bmp.y = 800;
			bmp.scaleX = bmp.scaleY = 1.5 * RES_SCALE;
			fgLayer.addChild(bmp);
		}
		for(var i = 0; i < MID_ITEMS.length; i++)
		{
			var item = MID_ITEMS[i];
			img = engibear.preload.getResult(item.item.img);
			var bmp = new createjs.Bitmap(img);
			bmp.regX = item.item.regX / RES_SCALE;
			bmp.regY = item.item.regY / RES_SCALE;
			bmp.x = ZOOM_REG_X + item.x*TRAIN_DIST*MID_CO;
			bmp.y = 440;
			bmp.scaleX = bmp.scaleY = 0.8 * RES_SCALE;
			midLayer.addChild(bmp);
		}
		
		//hud
		
		title = new engibear.Title();
		HUDLayer.addChild(title.view);
		
		bubble = new engibear.Bubble();
		HUDLayer.addChild(bubble.view);
		bubble.enableOK();
		
		finger = new engibear.Finger();
		HUDLayer.addChild(finger.view);
		finger.view.visible = false;
		
		engibear.stage.enableMouseOver();
		createjs.Touch.enable(engibear.stage, true, false);
		
		goToStart();
	}
	
	function goToStart()
	{
		gameState = GAME_START;
		var init = INIT_TITLE;
		
		title.view.x = init.TITLE_X;
		title.view.y = init.TITLE_Y;
		title.view.scaleX = title.view.scaleY = init.TITLE_SCALE;
		
		lina.view.scaleX = lina.view.scaleY = init.BEAR_SCALE;
		lina.view.x = init.BEAR_X;
		lina.view.y = init.BEAR_Y;
		
		train.view.x = init.TRAIN_X;
		train.view.y = init.TRAIN_Y;
		
		fgLayer.x = trackLayer.x = trainLayer.x = midLayer.x = ZOOM_REG_X;
		fgLayer.y = trackLayer.y = trainLayer.y = midLayer.y = ZOOM_REG_Y;
		
		bubble.setText("Can you help \nme get our \ntrains running?");
		bubble.setImage("ok_button");
		bubble.show();
		bubble.view.x = BUBBLE_START.x;
		bubble.view.y = BUBBLE_START.y;
		bubble.view.scaleX = bubble.view.scaleY = BUBBLE_START.scale;
		bubble.view.rotation = BUBBLE_START.rot;
		var cb = function(){bubble.view.removeEventListener("OK", cb);click_start();}
		bubble.view.addEventListener("OK", cb); 
	}
	
	function click_start(event)
	{
		gameState = GAME_PLAY;
		doingTutorial = true;
		
		var init = INIT_CONTROL_ROOM;
		
		var DUR = 1.4;
		var EASE = Power3.easeInOut;
		
		controlRoom = new engibear.ControlRoom(); 
		controlRoom.view.addEventListener("WIN", winControlRoom);
		controlRoom.view.visible = false;
		roomLayer.addChild(controlRoom.view);
		
		const START_FADE_IN = 0.7;
		
		var tl = new TimelineMax();
		tl.add(TweenMax.to(title.view, DUR, {x:init.TITLE_X, y:init.TITLE_Y, scaleX:init.TITLE_SCALE, scaleY:init.TITLE_SCALE, ease:EASE}),0);
		tl.add(TweenMax.to(lina.view, DUR, {x:init.BEAR_X, ease:EASE}),0);
		tl.add(TweenMax.to(fgLayer, DUR, {scaleX:init.FG_LAYER_SCALE, scaleY:init.FG_LAYER_SCALE, ease:EASE}),0);
		tl.add(TweenMax.to(trainLayer, DUR, {scaleX:init.TRAIN_LAYER_SCALE, scaleY:init.TRAIN_LAYER_SCALE, ease:EASE}),0);
		tl.add(TweenMax.to(trackLayer, DUR, {scaleX:init.TRAIN_LAYER_SCALE, scaleY:init.TRAIN_LAYER_SCALE, ease:EASE}),0);
		tl.add(TweenMax.to(midLayer, DUR, {scaleX:init.MID_SCALE, scaleY:init.MID_SCALE, ease:EASE}),0);
		tl.set(controlRoom.view, {visible:true}, START_FADE_IN);
		tl.add(TweenMax.to(trainLayer, 0.5, {alpha:0}), START_FADE_IN);
		tl.addCallback(function(){
			lina.view.visible = false;
			bubble.setText("Drag some coal \ninto the engine.", 45);
			bubble.show(false);
			var cb = function(){
				bubble.view.removeEventListener("OK", cb);
				doingTutorial = false;
				controlRoom.start();
			}
			bubble.view.addEventListener("OK", cb);
			finger.view.visible = true;
			finger.view.x = engibear.widgetWidth + 200;
			finger.view.y = 100;
			var tutTl = new TimelineMax();
			tutTl.add(TweenMax.to(finger.view, 1.5, {x:controlRoom.grabPos.x, y:controlRoom.grabPos.y, ease:Power2.easeInOut}),0);
			tutTl.addCallback(finger.press, "-=0.3");
			tutTl.addCallback(function(){controlRoom.pickUp(controlRoom.grabPos);}, "+=0.1");
			tutTl.add(TweenMax.to(finger.view, 1.5, {x:controlRoom.dropPos.x, y:controlRoom.dropPos.y, ease:Power2.easeInOut, onUpdate:function(){
				controlRoom.updatePos({x:finger.view.x, y:finger.view.y});
			}}),"+=0.1");
			tutTl.addCallback(function(){
				finger.release();
				controlRoom.drop(controlRoom.dropPos);
			}, "-=0.1");
			tutTl.addCallback(bubble.enableOK, "+=1.5");
			tutTl.add(TweenMax.to(finger.view, 0.5, {x:controlRoom.dropPos.x+100, y:controlRoom.dropPos.y-100, ease:Power2.easeInOut}),"+=0.3");
			tutTl.add(TweenMax.to(finger.view, 0.5, {alpha:0}));
		}, 1.5);
		
	}
	
	function winControlRoom(event)
	{
		bubble.setText("Well done! Now \nwe can get going.");
		bubble.show();
		var cb = function(){
			bubble.view.removeEventListener("OK", cb);
			depart();
		}
		bubble.view.addEventListener("OK", cb);
	}
	
	function depart()
	{
		//train.go();
		followingTrain = true;
		var init = INIT_TITLE;
		
		const DUR = 1.4;
		const EASE = Power3.easeOut;
		const START_ZOOM_OUT = 0;//0.25;
		const DELAY_FADE = 0;
		
		var time;
		
		var tl = new TimelineMax();
		tl.add(TweenMax.to(trainLayer, 0.25, {alpha:1}), 0);
		tl.set(controlRoom.view, {visible:false}, 0.25);
		tl.add(TweenMax.to(fgLayer, DUR, {scaleX:init.FG_LAYER_SCALE, scaleY:init.FG_LAYER_SCALE, ease:EASE}),START_ZOOM_OUT);
		tl.add(TweenMax.to(trainLayer, DUR, {scaleX:init.TRAIN_LAYER_SCALE, scaleY:init.TRAIN_LAYER_SCALE, ease:EASE}),START_ZOOM_OUT);
		tl.add(TweenMax.to(trackLayer, DUR, {scaleX:init.TRAIN_LAYER_SCALE, scaleY:init.TRAIN_LAYER_SCALE, ease:EASE}),START_ZOOM_OUT);
		tl.add(TweenMax.to(midLayer, DUR, {scaleX:init.MID_SCALE, scaleY:init.MID_SCALE, ease:EASE}),START_ZOOM_OUT);
		tl.addCallback(train.popOut, "-=0.4");
		
		
		tweenEase = {x:0,y:0};
		
		const eIn = 0.4;
		const eMid = 0.2;
		const eOut = 0;
		
		var p = [{x: 0, y: 0}, {x: eIn, y: 0}, {x: 1-eOut, y: 1}, {x: 1, y: 1}];
		const midX = p[2].x - p[1].x;
		const midY = p[2].y - p[1].y;
		var bezier_path = [
		p[0], 
		p[1], 
		{x:p[1].x + midX*eMid, y:p[1].y + midY*eMid}, 
		{x:p[1].x + midX/2, y:p[1].y + midY/2},
		{x:p[2].x - midX*eMid, y:p[2].y - midY*eMid}, 
		p[2], 
		p[3]];
		time = tl.duration() + 0.3;
		tl.add(TweenMax.to(trainFollowX, TRAIN_TIME*0.8, {val:TRAIN_FOLLOW_X, ease:Power1.easeInOut}),time + TRAIN_TIME*0.2);
		tl.add(TweenMax.to(tweenEase, TRAIN_TIME, {bezier:{
			type: 'quadratic',
			values: bezier_path
		},onComplete:function(){
			//finish
			followingTrain = false;
		}}), time);
		/* debugDot = new createjs.Shape();
		debugDot.graphics.beginFill("blue").drawCircle(0,0,7);
		view.addChild(debugDot); 
		for(var i = 0; i < bezier_path.length; i++)
		{
			var c = new createjs.Shape();
			c.graphics.beginFill("red").drawCircle(0,0,5);
			c.x = 100 + bezier_path[i].x * 200;
			c.y = 100 + bezier_path[i].y * 200;
			view.addChild(c);
		}*/
		
		//Y SHIFT
		time = tl.duration();
		const EASE2 = Power0.easeNone;//Power3.easeInOut;
		const DUR2 = engibear.RAISE_TIME;
		const Y_SHIFT = 250;
		tl.add(TweenMax.to(trainLayer, DUR2, {y:ZOOM_REG_Y + Y_SHIFT, ease:EASE2}), time);
		tl.add(TweenMax.to(trackLayer, DUR2, {y:ZOOM_REG_Y + Y_SHIFT, ease:EASE2}), time);
		tl.add(TweenMax.to(magLayer, DUR2, {y:Y_SHIFT, ease:EASE2}), time);
		tl.add(TweenMax.to(fgLayer, DUR2, {y:ZOOM_REG_Y + Y_SHIFT * FG_CO, ease:EASE2}), time);
		tl.add(TweenMax.to(midLayer, DUR2, {y:ZOOM_REG_Y + Y_SHIFT * MID_CO, ease:EASE2}), time);
		tl.addCallback(function(){
			train.raise();
			bear.view.visible = true;
			}, time);
		
		//XSHIFT
		const EASE3 = Power1.easeInOut;
		const DUR3 = 1.5;
		const X_SHIFT = 1000;
		time = tl.duration();
		tl.add(TweenMax.to(train.maglev, DUR3, {x:train.maglev.x + 1000, ease:EASE3}), time);
		tl.add(TweenMax.to(trainLayer, DUR3, {x:ZOOM_REG_X + TRAIN_FOLLOW_X - X_SHIFT, ease:EASE3}), time);
		tl.add(TweenMax.to(trackLayer, DUR3, {x:ZOOM_REG_X - TRAIN_DIST + TRAIN_FOLLOW_X - X_SHIFT, ease:EASE3}), time);
		tl.add(TweenMax.to(magLayer, DUR3, {x:-TRAIN_DIST - X_SHIFT, ease:EASE3}), time);
		tl.add(TweenMax.to(fgLayer, DUR3, {x:ZOOM_REG_X - (TRAIN_DIST + X_SHIFT) * FG_CO, ease:EASE3}), time);
		tl.add(TweenMax.to(midLayer, DUR3, {x:ZOOM_REG_X - (TRAIN_DIST + X_SHIFT) * MID_CO, ease:EASE3}), time);
		tl.addCallback(function(){
			bubble.setText("Press the buttons \nto activate the \nelectromagnets.", 48);
			bubble.show();
			var cb = function(){
				bubble.view.removeEventListener("OK", cb);
				touchUp.addEventListener("click", function(){
				touchUp.removeAllEventListeners();
				btnUp.turnOn();
				TweenMax.to(shineUp.view, 0.3, {scaleX:0, scaleY:0, alpha:0, ease:Back.easeIn});
				TweenMax.to(shineRight.view, 0.3, {scaleX:BTN_SHINE_SCALE, scaleY:BTN_SHINE_SCALE, alpha:1, ease:Back.easeOut});
				TweenMax.to(train.maglev, 0.8, {y:train.maglev.y - 50, ease:Power1.easeInOut, onComplete:function(){
					TweenMax.to(train.maglev, 0.5, {y:train.maglev.y + 10, ease:Power1.easeInOut}).yoyo(true).repeat(-1);
					TweenMax.delayedCall(0.5, function(){
						touchRight.addEventListener("click", zoomOff);
					})
				}});
			});
			};
			bubble.view.addEventListener("OK", cb);
			/* finger.view.visible = true;
			finger.view.alpha = 1;
			finger.view.x = - 200;
			finger.view.y = 100;
			var tutTl = new TimelineMax();
			var p = shineUp.view.localToLocal(0,0,HUDLayer);
			tutTl.add(TweenMax.to(finger.view, 1.5, {x:p.x, y:p.y, ease:Power2.easeInOut}),0);
			tutTl.addCallback(finger.press, "-=0.3");
			tutTl.addCallback(function(){
				btnUp.turnOn();
				TweenMax.to(shineUp.view, 0.3, {scaleX:0, scaleY:0, alpha:0, ease:Back.easeIn});
				TweenMax.to(train.maglev, 0.8, {y:train.maglev.y - 50, ease:Power1.easeInOut, onComplete:function(){
					TweenMax.to(train.maglev, 0.5, {y:train.maglev.y + 10, ease:Power1.easeInOut}).yoyo(true).repeat(-1);
				}});
				finger.release();
			}, "+=0.2");
			tutTl.add(TweenMax.to(finger.view, 0.5, {x:p.x+100, y:p.y-100, ease:Power2.easeInOut}),"+=0.5");
			tutTl.addCallback(function(){
				bubble.enableOK();
				var cb = function(){
					bubble.view.removeEventListener("OK", cb);
					touchRight.addEventListener("click", zoomOff);
					};
				bubble.view.addEventListener("OK", cb);
				});
			tutTl.add(TweenMax.to(finger.view, 0.5, {alpha:0})); */
		});
	}
	
	function zoomOff(evt)
	{
		btnRight.turnOn();
		TweenMax.to(train.maglev, 2, {xSpd:300, ease:Power3.easeIn});
		TweenMax.to(shineRight.view, 0.3, {alpha:0, scaleX:0, scaleY:0, ease:Back.easeIn});
		touchRight.removeEventListener("click", zoomOff);
		bear.smile();
		TweenMax.delayedCall(2.5, win);
	}
	
	function win()
	{
		const DUR = 0.8;
		const SWAP_X = 500;
		const SWAP_DUR = 0.5;
		var p = bear.view.localToLocal(0,0,bookLayer);
		bear.view.x = p.x;
		bear.view.y = p.y;
		lina.view.visible = true;
		lina.view.scaleX = lina.view.scaleY = INIT_TITLE.BEAR_SCALE;
		var p = bookLayer.globalToLocal(0,0);
		lina.view.x = p.x + INIT_TITLE.BEAR_X - SWAP_X;
		lina.view.y = p.y + INIT_TITLE.BEAR_Y;
		bookLayer.addChild(bear.view);
		bookLayer.addChild(lina.view);
		TweenMax.to(bear.view, SWAP_DUR, {x:bear.view.x - SWAP_X, ease:Back.easeIn});
		TweenMax.to(lina.view, SWAP_DUR, {x:lina.view.x + SWAP_X, ease:Back.easeOut, onComplete:function(){
			bubble.setText("Good job!\nThe trains are \nrunning on time.", 45);
			bubble.show();
			var cbOuter = function(){
				bubble.view.removeEventListener("OK", cbOuter);
				books = new engibear.Books();
				books.view.addEventListener("click", handleClickBooks);
				bookLayer.addChild(books.view);
				bookLayer.addChild(lina.view);
				books.view.x = engibear.widgetWidth/2 + 50;
				books.view.rotation = 2;
				books.view.y = engibear.widgetHeight/2 - 20;
				books.view.scaleX = books.view.scaleY = 0;
				TweenMax.to(books.view, DUR/2, {scaleX:1.2, scaleY:1.2, ease:Back.easeOut});
				TweenMax.delayedCall(1, function(){
					bubble.setText("Learn more about \ntrains in the book\n\"Engilina's Trains\".", 40);
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
	
	this.update = function (time)
	{
		var timeFactor = time / engibear.STANDARD_INTERVAL;
		if(title.view.visible)
		{
			title.update(time);
		}
		if(bubble.view.visible)
		{
			bubble.update(time);
		}
		if(lina.view.visible)
		{
			lina.update(time);
		}
		if(bear.view.visible)
		{
			bear.update(time);
			shineUp.update(time);
			shineRight.update(time);
		}
		if(books && books.view.visible)
		{
			books.update(time);
		}
		if(controlRoom && controlRoom.view.visible)
		{
			controlRoom.update(time);
		}
		if(train && train.view.visible)
		{
			train.update(time);
		}
		if(followingTrain)
		{
			var progress = tweenEase.y;
			trainLayer.x = ZOOM_REG_X + trainFollowX.val;
			trackLayer.x = ZOOM_REG_X - TRAIN_DIST * progress + trainFollowX.val;
			magLayer.x = -TRAIN_DIST * progress;
			fgLayer.x = ZOOM_REG_X - FG_CO * TRAIN_DIST * progress;
			midLayer.x = ZOOM_REG_X - MID_CO * TRAIN_DIST * progress;
			scenery.x = - BG_DIST * progress;
			train.updateMove(TRAIN_DIST *progress);
		}
		if(train)
		{
			var gaps;
			do
			{
				gaps = false;
				for(var i = 0; i < TRACK_PIECES; i++)
				{
					var piece = tracks[i];
					if(piece.x + (trackLayer.x - ZOOM_REG_X) < -TRACK_PIECE_WIDTH)
					{
						piece.x += TRACK_PIECE_WIDTH * TRACK_PIECES;
						gaps = true;
					}
				}
			}
			while (gaps); 
		}
	}
}
})();
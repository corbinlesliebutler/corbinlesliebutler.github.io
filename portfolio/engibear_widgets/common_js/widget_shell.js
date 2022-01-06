(function(){
	var script = document.createElement('script');
	script.src = engibear.widget_src + "/widget.js";
	document.getElementsByTagName("head")[0].appendChild(script);
	
	engibear.widgetWidth = 1000;
	engibear.widgetHeight = 750;
	engibear.ratio = engibear.widgetHeight / engibear.widgetWidth;

	engibear.preload = new createjs.LoadQueue();
	engibear.preload.addEventListener("complete", handleWidgetLoaded);
	
	engibear.STANDARD_INTERVAL = 52;

	const MAX_TIME = 60;
	
	var canvas;
	var wrapper;
	//var scaleFrame;
	var elapsedTime = 0;
	var stage;
	var widgetLoaded = false;

	function handleWidgetLoaded(event) 
	{
		stage.removeChild(engibear.loadingScreen.view);
		widgetLoaded = true;
		newWidget();
	}
	
	function newWidget()
	{
		engibear.widget = new engibear.Widget();
		stage.addChild(engibear.widget.view);
		engibear.widget.view.addEventListener("WIN", handleWin);
		engibear.widget.view.addEventListener("clickBooks", handleClickBooks);
		engibear.widget.start();
	}

	engibear.Init = function() 
	{
		canvas = document.getElementById('canvas');
		wrapper = document.getElementById('wrapper');
		stage = engibear.stage = new createjs.Stage("canvas");
		//stage.backgroundColor
		elapsedTime = new Date().getTime();
		createjs.Ticker.addEventListener("tick", handleTick);
		engibear.loadingScreen = new engibear.LoadingScreen();
		stage.addChild(engibear.loadingScreen.view);
		engibear.preload.loadManifest(engibear.manifest);
		engibear.preload.on("progress", handleProgress);
		
		
		/* loadFonts({
                src: "common_assets/fonts/BackIssuesBB_reg.ttf",
                type: "fontcss"
            });*/
			
			loadFonts({
                src: "common_assets/fonts/BackIssuesBB_reg.ttf"
            }); 
	}
	
	function loadFonts(config) {
		var loader = new createjs.FontLoader(config, true);
		loader.on("complete", handleFontLoad);
		loader.load();
	}
	
	function handleFontLoad(event)
	{
		//console.log("yo" + event);
	}
	
	function handleClickBooks(event)
	{
		window.location.href = "http://engibears.com/shop/";
	}

	function handleProgress(event) 
	{
		engibear.loadingScreen.updateProgress(event.progress);
	}

	function handleWin(event) 
	{
		stage.removeChild(engibear.widget.view);
		newWidget();
	}

	function handleTick(event) 
	{
		var newTime = new Date().getTime();
		var time = Math.min(MAX_TIME, newTime - elapsedTime);
		var currentView;
		if(widgetLoaded)
		{
			engibear.widget.update(time);
			currentView = engibear.widget.view;
		}
		else //loading
		{
			engibear.loadingScreen.update(time);
			currentView = engibear.loadingScreen.view;
		}
		
		var cw = Math.min(wrapper.offsetWidth, engibear.widgetWidth);
		var ch = Math.min(cw * engibear.ratio, wrapper.offsetHeight);
		cw = ch / engibear.ratio;
		canvas.width = cw;
		canvas.height = ch;
		
		var sc = canvas.width/engibear.widgetWidth;
		if(currentView)
		{
			currentView.scaleX = sc;
			currentView.scaleY = sc;
		}
		
		stage.update();
		
		
		elapsedTime = newTime;
	}
})();
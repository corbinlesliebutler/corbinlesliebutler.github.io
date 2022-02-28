(function (){
	//gallery.Artwork = function(imgPath, mmW, mmH, standDistance, title, description){
	gallery.Artwork = function(bean){
		
		var imgPath = "img/" + bean.name + ".jpg";
		var mmW = bean.w;
		var mmH = bean.h;
		var standDistance = bean.sd;
		var group = this.view = new THREE.Group();
		var visualGroup =  new THREE.Group();
		var instance = this;
		var plane;
		var touchBox;
		var frameW;
		var frameH;
		var frame;
		var blurbPlane;
		const BLURB_WIDTH = 0.2;
		const BLURB_RATIO = 0.3;
		this.standDistance = standDistance;

		group.add(visualGroup);

		function rollOver()
		{
			visualGroup.scale.set(1.2,1.2,1.2);
		}
		this.rollOver = rollOver;

		function rollOut()
		{
			visualGroup.scale.set(1,1,1);
		}
		this.rollOut = rollOut;

		var textureLoader = new THREE.TextureLoader();
		var mainTexture = textureLoader.load(imgPath, function(texture)
			{
				frameW = mmW/1000;
				frameH = frameW * (texture.image.height/texture.image.width);

				plane = new THREE.Mesh(
					new THREE.PlaneBufferGeometry( frameW, frameH ),
					new THREE.MeshLambertMaterial( {map:mainTexture} )
				);
				plane.receiveShadow = true;
				visualGroup.add(plane);
				plane.position.z = 0.001;
				//plane.isArtwork = true;
				const PAD = 0.1;
				var geometry = new THREE.BoxGeometry( frameW + PAD, frameH + PAD, PAD);
				var material = new THREE.MeshBasicMaterial( {color: 0x00ff00, transparent: true, opacity: 0.0} );
				touchBox = new THREE.Mesh( geometry, material );
				group.add( touchBox );
				touchBox.isArtwork = true;
				touchBox.controller = instance;

				var loader = new THREE.GLTFLoader();
	            loader.load(
	                'models/frames/frame1.gltf',
	                function ( gltf ) {

	                	frame = gltf.scene;//.children.filter(obj => {return obj.name == 'walls'})[0];
	                    var armature = gltf.scene.children.filter(obj => {return obj.name == 'Armature'})[0];
	                    var frameMesh = armature.children.filter(obj => {return obj.name == 'Grail'})[0];
	                	console.log(gltf.scene);
	                	//frameMesh.material = new THREE.MeshLambertMaterial( { color:new THREE.Color(0xFF00FF)} ); 
	                	frameMesh.material.color = new THREE.Color(bean.fc);
						frameMesh.castShadow = true;
	                	var frameScale = 0.05;
	                	frame.scale.set(frameScale, frameScale, frameScale);
	                	frame.rotation.x = Math.PI/2;
	                    visualGroup.add( frame );
	                    var c1 = armature.children.filter(obj => {return obj.name == 'Armature_c1'})[0];
	                    var c2 = armature.children.filter(obj => {return obj.name == 'Armature_c2'})[0];
	                    var c3 = armature.children.filter(obj => {return obj.name == 'Armature_c3'})[0];
	                    var c4 = armature.children.filter(obj => {return obj.name == 'Armature_c4'})[0];

	                    //var w = mmW/1000;
	                    //var h = mmH/1000;
	                    var addX = (frameW/frameScale - 1)/2;
	                    var addY = (frameH/frameScale - 1)/2;

	                    c1.position.x += addX;
	                    c1.position.y -= addY;

	                    c2.position.x += addX;
	                    c2.position.y += addY;

	                    c3.position.x -= addX;
	                    c3.position.y += addY;

	                    c4.position.x -= addX;
	                    c4.position.y -= addY;

	                    //c1.position.set(10,10,10);
	                },
	                // called while loading is progressing
	                function ( xhr ) {

	                    //console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	                },
	                // called when loading has errors
	                function ( error ) {

	                    console.log( 'An error happened gltf' + error );
	                }
	                );
			});

		//blurb
		var bitmap = document.createElement('canvas');
		var g = bitmap.getContext('2d');

		bitmap.width = BLURB_WIDTH * 4096;
		bitmap.height = bitmap.width * BLURB_RATIO;
		g.fillStyle = "white";
		g.fillRect(0, 0, bitmap.width, bitmap.height);
		var fontPx = Math.round(bitmap.width/20);
		g.font = 'Bold ' + fontPx + 'px Arial';

		g.fillStyle = 'black';
		g.textAlign = "center";
		var ySep = fontPx;
		var yCenter = (bitmap.width*BLURB_RATIO)/2 + fontPx*0.4;
		g.fillText('"' + bean.title + '"', bitmap.width/2, yCenter - ySep);
		g.fillText(bean.description, bitmap.width/2, yCenter + ySep);

		var blurbTexture = new THREE.Texture(bitmap) 
		blurbTexture.needsUpdate = true;

		blurbPlane = new THREE.Mesh(
			new THREE.PlaneBufferGeometry( BLURB_WIDTH, BLURB_WIDTH*BLURB_RATIO ),
			new THREE.MeshLambertMaterial( { map:blurbTexture} )
		);
		blurbPlane.castShadow = true;
		blurbPlane.position.y = -(mmH/1000 - (BLURB_WIDTH*BLURB_RATIO))/2; 
		blurbPlane.position.x = (mmW/1000 + BLURB_WIDTH)/2 + 0.1; 
		blurbPlane.origPos = blurbPlane.position.clone();
		blurbPlane.controller = instance;
		blurbPlane.isBlurb = true;
		blurbPlane.rollIn = function()
		{
			this.scale.set(1.1,1.1,1.1);
		}
		blurbPlane.rollOut = function()
		{
			this.scale.set(1,1,1);
		}

		group.add(blurbPlane);
	}
})();
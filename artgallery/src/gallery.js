const ROOM_LENGTH = 10;
const ROOM_WIDTH = 8;
const ROOM_HEIGHT = 3;
const MOUSE_PUSH_BORDER = 0.2;
const MOUSE_PAN_SPEED = 0.005;
const MOUSE_PAN_FRICTION = 0.1;
(function (){

	gallery.Application = function(){
		
		var clock = new THREE.Clock();
		var container;
		var camera, scene, renderer;
		var isMouseDown = false;
		var isfirstMouseDownStep = false;
		var user;
		var raycaster;
		var raycasterVR;
		var tempMatrix = new THREE.Matrix4();
		var controller;
		var line;
		var mouse = new THREE.Vector2()
		var intersectedArtwork;
		var camYSpeed = 0;
		//var STAND_POS = new THREE.Vector3(0,0,0.5);
		var inVR = false;
		var currentArtwork;
		var intersectedBlurb;
		var currentBlurb;
		var mixer;
		//var magSprite;
		var aimArtIntersection;
		var room;
		var canClickBlurb = false;
		const supportsVR = 'getVRDisplays' in navigator;
		/*var rooms = [
			[
				[
					//left
					{path:"img/blueguy.jpg", w:297, h:420, x:0.2, y:0.52, sd:0.5},
					{path:"img/balls.jpg", w:420, h:297, x:0.4, y:0.52, sd:0.5},
					{path:"img/flower.jpg", w:148, h:222, x:0.6, y:0.52, sd:0.4},
					{path:"img/red.jpg", w:148, h:222, x:0.8, y:0.52, sd:0.4}
				],
				[
					//right
					{path:"img/kooka.jpg", w:207, h:296, x:0.25, y:0.52, sd:0.5},
					{path:"img/galah.jpg", w:207, h:296, x:0.5, y:0.52, sd:0.5},
					{path:"img/mag.jpg", w:207, h:296, x:0.76, y:0.52, sd:0.5}
				]
			],
			[
				[
					{path:"img/blueguy.jpg", w:250, h:500, x:0.7, y:0.5, sd:0.5}//left
				],
				[
					{path:"img/blueguy.jpg", w:250, h:500, x:0.75, y:0.5, sd:0.5}//right
				]
			],
			[
				[
					{path:"img/blueguy.jpg", w:250, h:500, x:0.7, y:0.5, sd:0.5}//left
				],
				[
					{path:"img/blueguy.jpg", w:250, h:500, x:0.75, y:0.5, sd:0.5}//right
				]
			]
		];*/
		init();
		animate();
		function init() {
			container = document.createElement( 'div' );
			document.body.appendChild( container );

			scene = new THREE.Scene();
			scene.background = new THREE.Color( 0xff5050 );
			camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 100 );
			scene.fog = new THREE.Fog(0xffffff, 0.2, 20);
			//TweenMax.to(scene.fog.color, 3, {r:0, g:0, b:0});


			/*magSprite = new gallery.Sprite("img/mag_glass.png");
			scene.add( magSprite.view );
			magSprite.view.position.set(0,-2,-8);
			magSprite.view.scale.set(0.001,0.001,0.001);*/

			/*var spriteMap = new THREE.TextureLoader().load( "img/mag_glass.png" );
			var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff, depthTest:false } );
			magSprite = new THREE.Sprite( spriteMaterial );
			magSprite.scale.set(0.1,0.1,0.1);
			magSprite.renderOrder = 999;
			scene.add( magSprite );*/

			//vr camera movable
			user = new THREE.Group();
			user.add( camera );
			scene.add( user );

			renderer = new THREE.WebGLRenderer( { antialias: true } );
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( window.innerWidth, window.innerHeight );
			renderer.vr.enabled = true;
			container.appendChild( renderer.domElement );
			renderer.domElement.addEventListener( 'mousedown', onMouseDown, false );
			renderer.domElement.addEventListener( 'mouseup', onMouseUp, false );
			renderer.domElement.addEventListener( 'touchstart', onMouseDown, false );
			renderer.domElement.addEventListener( 'touchend', onMouseUp, false );
			renderer.shadowMap.enabled = true;
        	renderer.shadowMapSoft = true;
    		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
			window.addEventListener( 'resize', onWindowResize, false );

			window.addEventListener( 'vrdisplaypointerrestricted', onPointerRestricted, false );
			window.addEventListener( 'vrdisplaypointerunrestricted', onPointerUnrestricted, false );
			document.body.appendChild( WEBVR.createButton( renderer ) );
			//console.log(supportsVR);

			window.addEventListener( 'vrdisplaypresentchange', function ( event ) {
				if(inVR &! event.display.isPresenting )
				{
					//reset
					resetApplication();
				}
				inVR = event.display.isPresenting;
			});

			controller = renderer.vr.getController( 0 );
			controller.addEventListener( 'selectstart', onMouseDown );
			controller.addEventListener( 'selectend', onMouseUp );
			user.add( controller );
			
            raycasterVR = new THREE.Raycaster();

			var geometry = new THREE.BufferGeometry().setFromPoints( [ new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, - 1 ) ] );
			line = new THREE.Line( geometry );
			line.scale.z = 10;
			controller.add( line );

			room = new gallery.Room();
			scene.add(room.view);
			//user.position.set(0, 0, -ROOM_LENGTH/2);

			/*var floorPlane = new THREE.Mesh(
					new THREE.PlaneBufferGeometry( ROOM_WIDTH, ROOM_LENGTH*rooms.length ),
					new THREE.MeshStandardMaterial( { color:0x5f4129, roughness:0.5, metalness:0} )
					);
			scene.add(floorPlane);
			floorPlane.rotation.x = -Math.PI/2;
			floorPlane.position.z = -(ROOM_LENGTH*rooms.length)/2;

			var ceilingPlane = new THREE.Mesh(
					new THREE.PlaneBufferGeometry( ROOM_WIDTH, ROOM_LENGTH*rooms.length ),
					new THREE.MeshStandardMaterial( { color:0xdfd19e, roughness:0.5, metalness:0} )
					);
			scene.add(ceilingPlane);
			ceilingPlane.rotation.x = -Math.PI/2;
			ceilingPlane.rotation.y = -Math.PI;
			ceilingPlane.position.z = -(ROOM_LENGTH*rooms.length)/2;
			ceilingPlane.position.y = ROOM_HEIGHT;*/


            var ambient = new THREE.AmbientLight( 0x404040, 2.5 ); // soft white light
            scene.add( ambient );

           /* var light = new THREE.PointLight( 0xFFFFFF, 0.5, 100 );
			light.position.set( 0, 2.5, 0 );
			scene.add( light );*/

            raycaster = new THREE.Raycaster();
			document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		}

		function resetApplication()
		{
			init();
		}

		function onDocumentMouseMove( event ) {
			event.preventDefault();
			mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
		}

		function onMouseDown() {
			isMouseDown = true;
		}
		function onMouseUp() {
			isMouseDown = false;
		}
		function onPointerRestricted() {
			var pointerLockElement = renderer.domElement;
			if ( pointerLockElement && typeof(pointerLockElement.requestPointerLock) === 'function' ) {
				pointerLockElement.requestPointerLock();
			}
		}
		function onPointerUnrestricted() {
			var currentPointerLockElement = document.pointerLockElement;
			var expectedPointerLockElement = renderer.domElement;
			if ( currentPointerLockElement && currentPointerLockElement === expectedPointerLockElement && typeof(document.exitPointerLock) === 'function' ) {
				document.exitPointerLock();
			}
		}
		function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
		}
		//
		function animate() {
			renderer.setAnimationLoop( render );
		}

		function calcShortestRot(from, to)
		{
			// If from or to is a negative, we have to recalculate them.
			// For an example, if from = -45 then from(-45) + 360 = 315.
			const _360 = Math.PI*2;
			if(from < 0) {
				from += _360;
			}

			if(to < 0) {
				to += _360;
			}

			// Do not rotate if from == to.
			if(from == to ||
			from == 0  && to == _360 ||
			from == _360 && to == 0)
			{
				return 0;
			}

			// Pre-calculate left and right.
			var left = (_360 - from) + to;
			var right = from - to;
			// If from < to, re-calculate left and right.
			if(from < to)  {
				if(to > 0) {
					left = to - from;
					right = (_360 - to) + from;
				} else {
					left = (_360 - to) + from;
					right = to - from;
				}
			}

			// Determine the shortest direction.
			return ((left <= right) ? left : (right * -1));
		}

		function render() 
		{
			var delta = clock.getDelta() * 60;
			
			if(mixer)
			{
				mixer.update(delta/60);
			}

			var intersections;
			if(inVR)
			{
				tempMatrix.identity().extractRotation( controller.matrixWorld );
				raycasterVR.ray.origin.setFromMatrixPosition( controller.matrixWorld );
				raycasterVR.ray.direction.set( 0, 0, -1 ).applyMatrix4( tempMatrix );
				intersections =  raycasterVR.intersectObjects( room.view.children, true );
			}
			else
			{
				
				if(mouse.x > 1 - MOUSE_PUSH_BORDER)
				{
					camYSpeed -= MOUSE_PAN_SPEED*delta;
				}
				else if(mouse.x < -1 + MOUSE_PUSH_BORDER)
				{
					camYSpeed += MOUSE_PAN_SPEED*delta;
				}
				user.rotation.y += camYSpeed;
				camYSpeed *= (1-MOUSE_PAN_FRICTION*delta);

				raycaster.setFromCamera( mouse, camera );
				intersections = raycaster.intersectObjects( room.view.children, true );
			}

			var foundArtwork = false;
			var foundBlurb = false;
			//aimArtIntersection = null;
			if ( intersections.length > 0 ) 
			{
				for(var i = 0; i < intersections.length; i++)
				{
					var intersection = intersections[i];
					/*if(intersection.object == magSprite)
						continue;*/
					if(intersection.object.isArtwork)
					{
						var artwork = intersection.object.controller;
						if(intersectedArtwork != artwork && artwork != currentArtwork)
						{
							artwork.rollOver();
							intersectedArtwork = artwork;
						}
						foundArtwork = true;
						/*if(artwork == currentArtwork)
						{
							aimArtIntersection = intersection.point;
						}*/
					}
					else if(canClickBlurb && intersection.object.isBlurb)
					{
						var blurb = intersection.object;
						if(!currentBlurb && blurb.controller == currentArtwork)
						{
							intersectedBlurb = blurb;
							intersectedBlurb.rollIn();
							foundBlurb = true;
						}
					}
					if(inVR)
					{
						line.scale.z = intersection.distance;
					}
				}
			} 
			else 
			{
				if(inVR)
				{
					line.scale.z = 10;
				}
			}
			if(!foundArtwork)
			{
				if(intersectedArtwork)
				{
					intersectedArtwork.rollOut();
				}
				intersectedArtwork = null;
			}
			if(canClickBlurb && !foundBlurb && intersectedBlurb && !currentBlurb)
			{
				intersectedBlurb.rollOut();
				intersectedBlurb = null;
			}

			/*if(currentArtwork && aimArtIntersection)
			{
				magSprite.visible = true;
				magSprite.position.copy(aimArtIntersection);
			}
			else
			{
				magSprite.visible = false;
			}*/

			if ( isMouseDown === true ) 
			{
				if(isfirstMouseDownStep)
				{
					if(canClickBlurb)
					{
						if(currentBlurb)
						{
							TweenMax.to(currentBlurb.position, 0.5, {x:currentBlurb.origPos.x, y:currentBlurb.origPos.y, z:currentBlurb.origPos.z});
							currentBlurb.rollOut();
							currentBlurb = null;
						}
						if(intersectedBlurb)
						{
							currentBlurb = intersectedBlurb;
							var blurbPosition = new THREE.Vector3(0,0,currentArtwork.standDistance - 0.1);
							TweenMax.to(currentBlurb.position, 0.5, {x:blurbPosition.x, y:blurbPosition.y, z:blurbPosition.z});
							intersectedBlurb = null;
						}
					}
					if(intersectedArtwork && intersectedArtwork != currentArtwork)
					{
						var standPosition = intersectedArtwork.view.localToWorld( new THREE.Vector3(0,0,intersectedArtwork.standDistance) );
						var targetRotY = Math.atan2(standPosition.x - intersectedArtwork.view.position.x, standPosition.z - intersectedArtwork.view.position.z);
						var rotDelta = calcShortestRot(user.rotation.y, targetRotY);
						TweenMax.to(user.position, 1, {x:standPosition.x, z:standPosition.z});
						if(!inVR)
						{
							TweenMax.to(user.rotation, 0.5, {delay:0.5, y:user.rotation.y + rotDelta, ease: Power2.easeInOut});
						}
						currentArtwork = intersectedArtwork;
						currentArtwork.rollOut();
					}
				}
				isfirstMouseDownStep = false;
			}
			else
			{
				isfirstMouseDownStep = true;
			}
			room.update(delta);
			renderer.render( scene, camera );
		}
	}
})();
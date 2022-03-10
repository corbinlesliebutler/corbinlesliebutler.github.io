import * as THREE from "/psychVR/js/three.module.js";
import {PsychImage} from "/psychVR/src/psych_image.js";
import { VRButton } from '/psychVR/js/webxr/VRButton.js';

const NUDGE_SPEED = 0.001;

var clock = new THREE.Clock();
var scene;
var camera;
var renderer;
var mouse = new THREE.Vector2();
var raycaster;
var inVR = false;
//var img;
var imgArr = [];

init();

function init()
{
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	//mouse
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	raycaster = new THREE.Raycaster();

	//VR
	document.body.appendChild( VRButton.createButton( renderer ) );
	renderer.xr.enabled = true;
	
	window.addEventListener( 'vrdisplaypresentchange', function ( event ) {
			if(inVR &! event.display.isPresenting )
			{
				resetApplication();
			}
			inVR = event.display.isPresenting;
		});

	//render loop
	renderer.setAnimationLoop(render);
}
	
function render(){
	var delta = clock.getDelta() * 60;

	if(imgArr.length < 9)
	{
		//create image
		var img = new PsychImage('src/img/shrek.png');
		img.mesh.position.set(-5+Math.random()*10, -5+Math.random()*10, -5);
		scene.add( img.mesh );
		imgArr.push(img);
	}
	//imgArr[1].mesh.scale.multiplyScalar(0.2);
	
	//separate imgs
	/*for(let i = 0; i < imgArr.length; i++)
	{
		var img1 = imgArr[i];
		for(let q = 0; q < imgArr.length; q++)
		{
			if(i != q)
			{
				var img2 = imgArr[q];
				var img1Pos = img1.mesh.position.clone().project(camera);
				var img2Pos = img2.mesh.position.clone().project(camera);
				if(getDistance(img2Pos, img1Pos) < 0.4)
				{
					//var dir = getDirection(img2Pos, img1Pos);
					var direction = new THREE.Vector3();
 					direction.subVectors(img1Pos, img2Pos) ;
					//img1.speed.copy(direction);
					//img1.speed.x += NUDGE_SPEED * Math.sin(dir);
    				//img1.speed.y += NUDGE_SPEED * Math.cos(dir);
				}
				
			}
		}
	}*/
	if(inVR)
	{
		//check head dir for imgs
		for(let i = 0; i < imgArr.length; i++)
		{
			var img = imgArr[i];
			var imgPos = img.mesh.position.clone().project(camera);
			//imgPos.z = 0;
			if(imgPos.length() < 0.2)
			{
				img.mesh.rotation.z += 0.01;
			}
		}
	}
	else
	{
		//check mouse for imgs
		for(let i = 0; i < imgArr.length; i++)
		{
			var img = imgArr[i];
			var imgPos = img.mesh.position.clone().project(camera);
			if(getDistance(imgPos, mouse) < 0.1)
			{
				img.mesh.rotation.z += 0.01;
			}
		}
	}

	//update imgs
	for(let i = 0; i < imgArr.length; i++)
	{
		imgArr[i].update(delta);
	}
	
	renderer.render( scene, camera );
}

function getDirection(p1, p2)
{
	return Math.atan2(p1.y - p2.y, p1.x - p2.x);
}

function getDistance(p1, p2)
{
	var x = p1.x - p2.x;
	var y = p1.y - p2.y;
	return Math.sqrt( x*x + y*y );
}

function onDocumentMouseMove( event ) {
	event.preventDefault();
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	
	//console.log(img.mesh.position.project(camera));
}

export function resetApplication()
{
	init();
}
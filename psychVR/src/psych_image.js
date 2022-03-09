import * as THREE from "/psychVR/js/three.module.js";

export class PsychImage {

	static MAX_SPEED = 0.01;
	mesh;
	speed = new THREE.Vector3();
	testnum = 5;
	testVec = {x:0,y:0,z:0};

	constructor(path) {
		const geometry = new THREE.PlaneGeometry(2, 2)
		const textureLoaded = new THREE.TextureLoader().load(path)
		const material = new THREE.MeshBasicMaterial({
			//color: 0xffffff,
			map: textureLoaded,
			transparent: true
		})
		this.mesh = new THREE.Mesh(geometry, material);
  	}

	update (delta)
	{
		this.speed.clampLength(0, PsychImage.MAX_SPEED);
		this.mesh.position.x += this.speed.x;// * delta;
		this.mesh.position.y += this.speed.y;// * delta;
		//this.speed.multiplyScalar(0.9);
	}
}


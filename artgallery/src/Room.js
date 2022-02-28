(function (){
    gallery.Room = function(renderer, scene){
            var instance  = this;
            var group = this.view = new THREE.Group();
            var artWorks = [];
            var mixer1;
            var mixer2;
            var timeScale = 0.05;
            const ROOM_SIZE = 12;
            const ROOM_WALLS = 12;
            var artBeans = [
                {name:"aliens1", w:297, h:420, sd:0.5, title:"Blue Guy", description: "Oils", fc:0x6b84aa},
                {name:"aliens2", w:420, h:297, sd:0.5, title:"Meditation", description: "Oils", fc:0xdc9019},
                {name:"pt2", w:297, h:210, sd:0.4, title:"Whoojabber", description: "Pen and oil", fc:0x333333},
                {name:"pt3", w:210, h:297, sd:0.4, title:"Whoojabber", description: "Pen and oil", fc:0x333333},
                {name:"pt4", w:210, h:297, sd:0.4, title:"Whoojabber", description: "Pen and oil", fc:0x333333},
                {name:"birds1", w:210, h:297, sd:0.4, title:"Galah", description: "Oils", fc:0xc63996},
                {name:"birds2", w:210, h:297, sd:0.4, title:"Kookaburra", description: "Oils", fc:0x523f24},
                {name:"birds3", w:210, h:297, sd:0.4, title:"Magpie", description: "Oils", fc:0x2d2a42},
                {name:"skirt", w:140, h:297, sd:0.4, title:"Skirt", description: "Oils", fc:0xffa8f8},
                {name:"mumanddaughter", w:420, h:297, sd:0.5, title:"A Mum and Daughter", description: "Oils", fc:0x253b18},
                {name:"po1", w:140, h:297, sd:0.4, title:"Red Guy", description: "Pen and oil", fc:0xaa3421},
                {name:"po2", w:140, h:297, sd:0.4, title:"Sunflower Head", description: "Pen and oil", fc:0xFFFFFF}
            ];

            var light = new THREE.PointLight( 0xFFFFFF, 0.5, 100);
            //light.castShadow = true;
            light.position.set(0,2,-5);
            group.add(light);

            var loader = new THREE.GLTFLoader();
            loader.load(
                'models/circular_gallery.gltf',
                function ( gltf ) {

                    group.add( gltf.scene );

                    /*mixer = new THREE.AnimationMixer(gltf.scene);
                    for(var i = 0; i < gltf.animations.length; i++)
                    {
                        var anim = gltf.animations[i];
                        mixer.timeScale = timeScale;
                        action = mixer.clipAction(anim);
                        action.play();
                    }*/

                    var gltfWalls = gltf.scene.children.filter(obj => {return obj.name == 'walls'})[0];
                    gltfWalls.material = new THREE.MeshLambertMaterial( {color:new THREE.Color(0xd2d0b8)} );
                    gltfWalls.receiveShadow = true;

                    var gltfCeiling = gltf.scene.children.filter(obj => {return obj.name == 'ceiling'})[0];
                    gltfCeiling.material = new THREE.MeshLambertMaterial( {color:new THREE.Color(0x000000)} );

                    var gltfFloor = gltf.scene.children.filter(obj => {return obj.name == 'floor'})[0];
                    gltfFloor.material = new THREE.MeshLambertMaterial( {color:new THREE.Color(0x000000)} );

                    initArt();
                    
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

            function initArt()
            {
                var dist = ROOM_SIZE/2 - 0.205;
                for(var i = 0; i < artBeans.length; i++)
                {
                    var bean = artBeans[i];
                   // var placeHolder = templateScene.children.filter(obj => {return obj.name == bean.name})[0];
                    var artwork = new gallery.Artwork(bean);
                    group.add(artwork.view);
                    var angle = (i+0.5)*(Math.PI*2/ROOM_WALLS);
                    artwork.view.position.x = Math.sin(angle)*dist;
                    artwork.view.position.z = Math.cos(angle)*dist;
                    artwork.view.position.y = 1.6;//Math.sin(angle)*ROOM_SIZE/2;
                    artwork.view.rotation.y = angle + Math.PI;
                    //artwork.view.position.copy(placeHolder.position);
                    //artwork.view.rotation.copy(placeHolder.rotation);

                    //var quart = new THREE.Quaternion();
                    //quart.setFromEuler(placeHolder.rotation);
                    //quart.setFromAxisAngle(new THREE.Vector3(0,1,0), Math.PI);
                    //artwork.view.rotation.setFromQuaternion(quart);
                    //console.log(artwork.view.rotation);
                    //artwork.view.rotation.set(0,placeHolder.rotation.y,0);
                    //artwork.view.rotation.y = 0;
                    //rot += (Math.PI*2)/art.length;
                    //artwork.view.rotation.y += Math.PI/2;
                    //artwork.view.rotation.z += Math.PI;
                    //artwork.view.rotation.y = 1.5;
                    //var selectedObject = scene.getObjectByName(object.name);
                    //placeHolder.parent.remove( placeHolder );

                    /*var geometry = new THREE.BoxGeometry( 1, 1, 1 );
                    var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
                    var cube = new THREE.Mesh( geometry, material );
                    cube.scale.set(0.05,0.05,5);
                    cube.position.copy(artwork.view.position);
                    cube.rotation.copy(artwork.view.rotation);
                    group.add( cube );*/
                }
            }

            this.update = function(delta)
            {
                if(mixer1)
                {
                    mixer1.update(delta);
                }
                if(mixer2)
                {
                    mixer2.update(delta);
                }
            }
    }
})();
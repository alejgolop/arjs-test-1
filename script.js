
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
window.onload = () => {

    let places = staticLoadPlaces();
    renderPlaces(places);

    window.addEventListener( 'mouseup', onMouseClick, false );

};

function onMouseClick( event ) {
    console.log("Mouse Clicked");

    var renderer=document.querySelector('a-scene').renderer;
    var rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ( ( event.clientX - rect.left ) / ( rect.width - rect.left ) ) * 2 - 1;
    mouse.y = - ( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;


	//mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    //mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    let camera = document.querySelector("[camera]").getObject3D('camera');
    raycaster.setFromCamera( mouse, camera );
    var scene = document.querySelector('a-scene').object3D;
    const intersects = raycaster.intersectObjects( scene.children,false  );

	for ( let i = 0; i < intersects.length; i ++ ) {

		console.log("Int: "+intersects[ i ].object);

	}
    col=intersects;
    alert("Intersects: "+intersects.length);
}

var col;

window.addEventListener( 'click', onMouseClick, false );

function staticLoadPlaces() {
   return [
       {
           name: 'Robot',
           location: {
               lat: 37.76403580411803,
               lng: -3.7913319468498234,
           }
       },
   ];
}

var bbox;
var box;

function renderPlaces(places) {
   let scene = document.querySelector('a-scene');

   places.forEach((place) => {
       let latitude = place.location.lat;
       let longitude = place.location.lng;

       let model = document.createElement('a-entity');
       model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
       model.setAttribute('gltf-model', 'https://umacontainer.s3.eu-west-1.amazonaws.com/3D/407.gltf');
       model.setAttribute('rotation', '0 0 0');
       model.setAttribute('animation-mixer', '');
       model.setAttribute('scale', '3 3 3');
       model.setAttribute('id', 'mdl');

       model.addEventListener('loaded', (ev) => {
           window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'));
        });

        model.addEventListener('model-loaded', (ev) => {
            //console.log("3D Object loaded");
           const el = ev.target;
           const mesh = el.getObject3D('mesh');
           //console.log(el);
           if (!mesh){
             console.log("NO mesh");
             return;
           }
           bbox = new THREE.Box3().setFromObject(mesh);
           //console.log(bbox);
           var width=(bbox.max.x-bbox.min.x)/2;
           var height=(bbox.max.y-bbox.min.y)/2;
           var depth=(bbox.max.z-bbox.min.z)/2;
           //alert(width+" "+height+" "+depth);

           box = new THREE.Mesh( new THREE.CubeGeometry(width, height, depth),new THREE.MeshLambertMaterial({
            color: 0x00FF00
          }));
            //box.translateOnAxis(new THREE.Vector3( 0, 1, 0 ),height);
           mesh.add(box);


           /*bbox.addEventListener('click', () => {
            alert("bbox Click!");
        });*/
          window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'));
        });
   

       //model.setAttribute('clickhandler', '');
      /* model.addEventListener('click', () => {
        alert("Model Click!");
    });*/
  
       scene.appendChild(model);

   });
}

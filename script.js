
window.onload = () => {

    let places = staticLoadPlaces();
    renderPlaces(places);

};

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
       model.setAttribute('bboxed', '');
       model.setAttribute('id', 'mdl');

       model.addEventListener('loaded', (ev) => {
           window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'));
           console.log("Mesh Loaded");
        });
   

       //model.setAttribute('clickhandler', '');
      /* model.addEventListener('click', () => {
        alert("Model Click!");
    });*/
  
       scene.appendChild(model);

      /* model = document.createElement('a-box');
       model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
       model.setAttribute('rotation', '0 0 0');
       model.setAttribute('material', "color: green;");
       model.setAttribute('scale', '10 10 10');
       model.setAttribute('clickhandler', '');
       scene.appendChild(model);*/


   });
}

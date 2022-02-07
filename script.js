
window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
    clickMarkerRegistry();
};

function staticLoadPlaces() {
   return [
       {
           name: 'Robot',
           location: {
               lat: 37.76893586856063,
               lng: -3.787853121757507,
           }
       },
   ];
}

function renderPlaces(places) {
   let scene = document.querySelector('a-scene');

   places.forEach((place) => {
       let latitude = place.location.lat;
       let longitude = place.location.lng;

       let model = document.createElement('a-entity');
       model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
       model.setAttribute('gltf-model', 'https://umacontainer.s3.eu-west-1.amazonaws.com/3D/407.gltf');
       model.setAttribute('rotation', '0 180 0');
       model.setAttribute('animation-mixer', '');
       model.setAttribute('scale', '2 2 2');

       model.addEventListener('loaded', () => {
           window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
       });

       model.addEventListener('click', markerClicked);

       scene.appendChild(model);
   });
}

var clickMarkerRegistry=function()
{
    AFRAME.registerComponent('clickevent', {
        init: function () {
          this.el.sceneEl.addEventListener('click', markerClicked);
      }});  
}

var markerClicked=function ()
{
    lert("Marker Clicked!");
}
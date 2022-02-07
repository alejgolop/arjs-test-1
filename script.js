
window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
    //clickMarkerRegistry();
    AFRAME.registerComponent('on-mouseenter', {
        init: function () {
          this.el.addEventListener('mouseenter', function () {
            alert("ENTER");
          });
        }
      });
};

function staticLoadPlaces() {
   return [
       {
           name: 'Robot',
           location: {
               lat: 37.76786937417169,
               lng: -3.7873166799545284,
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
       model.setAttribute('rotation', '0 0 0');
       model.setAttribute('animation-mixer', '');
       model.setAttribute('scale', '10 10 10');

       model.addEventListener('loaded', () => {
           window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
       });
       model.addEventListener('mouseenter', function () {
        alert("ENTER");
      });

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
    alert("Marker Clicked!");
}
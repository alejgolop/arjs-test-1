
window.onload = () => {

    AFRAME.registerComponent('clickhandler', {
        init: function() {
            this.el.addEventListener('click', () => {
                alert('Clicked!')
            });
    }});

    let places = staticLoadPlaces();
    renderPlaces(places);
    //clickMarkerRegistry();
    
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

       model.addEventListener('click', clickListener);

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


const clickListener = function (ev) {
    ev.stopPropagation();
    ev.preventDefault();

    const name = ev.target.getAttribute('name');

    const el = ev.detail.intersection && ev.detail.intersection.object.el;

    if (el && el === ev.target) {
       alert("click!");
    }
};
**************** Mapbox installation ****************
1. npm install mapbox-gl --save
In _app.js 
     import "mapbox-gl/dist/mapbox-gl.css"
In index.js 
     import mapboxgl from "!mapbox-gl"

* to make input box u=above the map 
     z-10 absolute


**************** fadout property ****************

const target = document.getElementById("target");

target.addEventListener('click', () => target.style.opacity = '0');

// If you want to remove it from the page after the fadeout
target.addEventListener('transitionend', () => target.remove());


**************** Distance A to B *******************
const newYork = new mapboxgl.LngLat(-74.0060, 40.7128);
const losAngeles = new mapboxgl.LngLat(-118.2437, 34.0522);
newYork.distanceTo(losAngeles); // = 3935751.690893987, "true distance" using a non-spherical approximation is ~3966km

****************************************************************
npm i downshift --save


****************************************************************
https://github.com/mapbox/carmen/blob/master/carmen-geojson.md */
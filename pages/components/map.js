
import tw from 'tailwind-styled-components'
import mapboxgl from '!mapbox-gl';
import React, {useRef, useEffect, useState} from "react"
import Head from "next/head";


mapboxgl.accessToken = 'pk.eyJ1IjoibmFrc2hpdGEtMjg1IiwiYSI6ImNrdjluOThkNzBlenoybnRjbXN4d2oyOGoifQ.e1SywbxgJF9YQvWIQGHigw';
const ACCESS_TOKEN = mapboxgl.accessToken

const map = (props) => {
     <Head>
          <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.min.js"></script>
          <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css" type="text/css"></link>
     </Head>

     useEffect(function(){
          const map = new mapboxgl.Map({
               container:'map',
               style: 'mapbox://styles/mapbox/streets-v11',
               center: [ 77.1025, 28.7041 ],
               zoom: 12
               })

               
               // Add zoom and rotation controls to the map.
               const nav = new mapboxgl.NavigationControl({
               visualizePitch: true
               });
               map.addControl(nav, 'bottom-right');

               if(props.pickUpCoordinates && props.dropOffCoordinates){
                    map.fitBounds([props.pickUpCoordinates, props.dropOffCoordinates], {
                    padding: 100,
                    maxZoom : 15
                    })
               }
          
               
               // distance from pickup to dropoff location
               const pickupLocation = new mapboxgl.LngLat(props.pickUpCoordinates[0], props.pickUpCoordinates[1]);
               const DropoffLocation = new mapboxgl.LngLat(props.dropOffCoordinates[0], props.dropOffCoordinates[1]);
               var distance = distanceFunc(pickupLocation, DropoffLocation);
               distance = (distance/1000);
               distance = Math.round(distance);
               
               var speed=60;
               var time = distance/speed ;
               time = time.toFixed(2)
               console.log("Distance: "+ distance + " km" + " And Time: "+ time +" hrs");
               
               if(props.pickUpCoordinates){
                    addMarker(map, props.pickUpCoordinates);
                    console.log(props.pickUpCoordinates);
                    const popup = new mapboxgl.Popup({ className: "pickup", closeOnCLick: false, offset: [0, -30] })
                         .setLngLat(props.pickUpCoordinates)
                         .setHTML(
                         `<h3 class="uppercase transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                         Live Location</h3>`
                         ).addTo(map);
          
                         
               }

               if(props.dropOffCoordinates){
                    addMarker(map, props.dropOffCoordinates);
                    const popup = new mapboxgl.Popup({ className:"dropoff", closeOnCLick: false, offset: [0, -30] })
                         .setLngLat(props.dropOffCoordinates)
                         .setHTML(
                         `<h3 class="uppercase transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                         ${props.dropoff}</h3>
                         <h2 class="text-sm m-1">Travel Distance: ${distance} km</h2>
                         <h2 class="text-sm m-1">Travel Time: ${time} Hrs</h2>`
                         )
                         .addTo(map);
               }
          
          distanceAndTime(props.pickUpCoordinates, props.dropOffCoordinates)

     }, [props.pickUpCoordinates, props.dropOffCoordinates, props.dropoff])
     

     function addMarker(map, coordinates){
          
          const marker = new mapboxgl.Marker()
               .setLngLat(coordinates)
               .addTo(map);
      }
      


     function distanceFunc(pickupLocation, DropoffLocation){
          return pickupLocation.distanceTo(DropoffLocation);
     }


     function distanceAndTime(pickUpCoordinates, dropOffCoordinates){
          const pickupLong = pickUpCoordinates[0];
          console.log(pickupLong);


     }


     const mapRef = useRef();

     return (

          <MapWrapper id='map'>
               
          </MapWrapper>
     )
}

export default map

const MapWrapper = tw.div`
h-screen
`
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
import tw from 'tailwind-styled-components'
import {useEffect, useState} from "react";
import {useRouter} from 'next/Router'
import Map from './components/map'

mapboxgl.accessToken = 'pk.eyJ1IjoibmFrc2hpdGEtMjg1IiwiYSI6ImNrdjluOThkNzBlenoybnRjbXN4d2oyOGoifQ.e1SywbxgJF9YQvWIQGHigw';



const mapAPI = () => {

     const router = useRouter();

     
     const {dropoff} = router.query;

     const [pickUpCoordinates, setPickUpCoordinates] = useState([0,0]);
     const [dropOffCoordinates, setDropOffCoordinates] = useState([0,0]);

     // 
     function getPickUpCoordinates(){
          navigator.geolocation.getCurrentPosition(successLocation),({
               enableHighAccuracy:true
          })
          function successLocation(position){
               // console.log("Pickup coords: "+ [position.coords.longitude, position.coords.latitude])
               setPickUpCoordinates([position.coords.longitude, position.coords.latitude])
          }
     
     } 

     // 
     function getDropOffCoordinates(dropoff){
          fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?`+
          new URLSearchParams({ 
              access_token : mapboxgl.accessToken,
              limit : 2
          })
          ).then(response => response.json())
          .then(data => {
          //     console.log("Drop Off coords: "+data.features[0].center);
              setDropOffCoordinates(data.features[0].center);
  
          })

     }
     

     useEffect(function(){
          getPickUpCoordinates();
          if(dropoff != ""){
               getDropOffCoordinates(dropoff);
          }
     }, [dropoff])


     return (

          <Map 
               pickUpCoordinates ={pickUpCoordinates}
               dropOffCoordinates ={dropOffCoordinates}
               dropoff={dropoff}
          />
     )

}
export default mapAPI

const MapWrapper = tw.div`
h-screen bg-red-100`
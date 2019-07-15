import {styles_map, default_center} from './variable.js';
$(()=>{
    var map;
    
    map = new google.maps.Map(document.getElementById('map'), {
       center: default_center,
       zoom: 8,
       styles: styles_map
    });
  
    var get_position = ()=>{
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
          console.log(position);
          var {latitude, longitude} = position.coords;

          // var uluru = {lat: -25.344, lng: 131.036};
  
          var marker = new google.maps.Marker(
            {position: {
                lat: latitude, 
                lng: longitude
            },
             map: map
            });
            console.log(marker);

            map.setCenter({lat: latitude, lng: longitude});

            map.setZoom(8);


            console.log(latitude);
            console.log(longitude);

        }, position=>{
          console.error(position);
          // alert("User has denegated the geolocalization");
          $.notify("User has denegated the geolocalization", "error");
        });
      }else{
        alert("This browser don't support geolocalization");
      }
    }

    get_position();

})
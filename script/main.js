import {styles_map, default_center} from './variable.js';
$(()=>{
    var map;
    
    var coords_collec = [];
    var info = "Nyan";
    var info_2='<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
    '<div id="bodyContent">'+
    '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
    'sandstone rock formation in the southern part of the '+
    'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
    'south west of the nearest large town, Alice Springs; 450&#160;km '+
    '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
    'features of the Uluru - Kata Tjuta National Park. Uluru is '+
    'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
    'Aboriginal people of the area. It has many springs, waterholes, '+
    'rock caves and ancient paintings. Uluru is listed as a World '+
    'Heritage Site.</p>'+
    '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
    'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
    '(last visited June 22, 2009).</p>'+
    '</div>'+
    '</div>';
    
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



    var listeners_config = ()=>{
      map.addListener('click', (event)=>{
        $.notify("Se hizo click en el mapa", "success");
        console.log(event.latLng.lat());
        console.log(event.latLng.lng());

        let new_marker = new google.maps.Marker(
          {position: {
              lat: event.latLng.lat(), 
              lng: event.latLng.lng()
          },
           map: map,
           icon: "./../assets/img/temp_2.png"
          });

      let info_marker = new google.maps.InfoWindow({
        content: info,
        maxWidth: 200
      });

      new_marker.addListener('click', ()=>{
        info_marker.open(map, new_marker);
      });

      //     {lat: 37.772, lng: -122.214},
      // {lat: 21.291, lng: -157.821},
      // {lat: -18.142, lng: 178.431},
      // {lat: -27.467, lng: 153.027}

      let objt_cords = {
        lat:event.latLng.lat(),
        lng:event.latLng.lng()
      }
      coords_collec.push(objt_cords);

      var line = new google.maps.Polyline({
        path: coords_collec,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      line.setMap(map);

      });



      // $('#map').click(function (e) { 
      //   e.preventDefault();
      //   $.notify("Se hizo click en el mapa", "success");
      // });
    }

    listeners_config();
  
    

})
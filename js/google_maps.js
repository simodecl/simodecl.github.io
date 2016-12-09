// Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.

      function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom:13,
          center: new google.maps.LatLng(51.048017, 3.727666),
        });
        
        // Try HTML5 geolocation.
        if(Modernizr.geolocation){
               navigator.geolocation.getCurrentPosition(
                   function(position){
                       resolve(position);
                   },
                   function(error){
                       switch(error.code)
                       {
                           case error.PERMISSION_DENIED: console.log("User did not share geolocation data");break;
                           case error.POSITION_UNAVAILABLE: console.log("Could not detect current position");break;
                           case error.TIMEOUT: console.log("Retrieving position timed out");break;
                           default: console.log("Unknown Error");break;
                       }
                       reject(error);
                   },
                   {timeout:10000,enableHighAccuracy:true}
               )
           }
           else{
               reject("HTML5 Geolocation not supported!");
           }
           //
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            
            var selfMarker = new google.maps.Marker({
            position: new google.maps.LatLng(pos.lat,pos.lng),
            title:"My location",
            icon:'resources/images/markers/home.png',
            map: map    
            });// Create a Google Maps Marker  
            selfMarker.setPosition(pos);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }
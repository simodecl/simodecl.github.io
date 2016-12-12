      var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom:13,
          center: new google.maps.LatLng(51.048017, 3.727666),
          mapTypeId: 'terrain'
        });

        // Create a <script> tag and set the USGS URL as the source.
        var script = document.createElement('script');
        // This example uses a local copy of the GeoJSON stored at
        // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
        script.src = 'js/ecoplan.geojson';
        document.getElementsByTagName('head')[0].appendChild(script);


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
        }
      }

      // Loop through the results array and place a marker for each
      // set of coordinates.
      window.ecoplan_callback = function(results) {
        for (var i = 0; i < results.features.length; i++) {
          var coords = results.features[i].geometry.coordinates;
          var latLng = new google.maps.LatLng(coords[1],coords[0]);
          var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            icon:'resources/images/markers/ecoplan.png'
          });
        }
      }
var map;
var radius = 30;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: new google.maps.LatLng(51.048017, 3.727666),
    streetViewControl: false
  });

  var pos = {};
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

var tempStr = '';
      window.ecoplan_callback = function (results) {
        for (var i = 0; i < results.features.length; i++) {
          var coords = results.features[i].geometry.coordinates;
          var latLng = new google.maps.LatLng(coords[1], coords[0]);
          
          var distance = Utils.calculateDistanceBetweenTwoCoordinates(coords[1], coords[0], pos.lat, pos.lng);

          if (distance <= radius) {
            
            tempStr += '<div class="restaurant">';
            tempStr += '<h3 class="restaurant-name">' + results.features[i].properties.NAAM + '</h3>';
            tempStr += '<p class="restaurant-address">' + results.features[i].properties.STRAAT + ' ' + results.features[i].properties.NUMMER + '</p>';
            tempStr += '<p class="distance">' + distance.toFixed(1) + ' km</p>';
            tempStr += '</div>';

            var marker = new google.maps.Marker({
              position: latLng,
              map: map,
              icon: 'resources/images/markers/ecoplan.png'
            });
          };
        }
        document.querySelector('.results').innerHTML = tempStr;
      }


      // Create a <script> tag and set the USGS URL as the source.
      var script = document.createElement('script');
      script.src = 'js/ecoplan.geojson';
      document.getElementsByTagName('head')[0].appendChild(script);

      var selfMarker = new google.maps.Marker({
        position: new google.maps.LatLng(pos.lat, pos.lng),
        title: "My location",
        icon: 'resources/images/markers/home.png',
        map: map
      });
      var cityCircle = new google.maps.Circle({
        strokeColor: '#66CC66',
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: '#66CC66',
        fillOpacity: 0.125,
        map: map,
        center: { lat: pos.lat, lng: pos.lng },
        radius: radius * 1000
      });
      selfMarker.setPosition(pos);
      map.setCenter(pos);
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  }
}
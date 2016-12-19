var map;
var radius = 5;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
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

      Utils.getJSONByPromise('https://datatank.stad.gent/4/milieuennatuur/ecoplan.geojson').then(function (results) {
        for (var i = 0; i < results.features.length; i++) {
          var coords = results.features[i].geometry.coordinates;
          var latLng = new google.maps.LatLng(coords[1], coords[0]);

          var distance = Utils.calculateDistanceBetweenTwoCoordinates(coords[1], coords[0], pos.lat, pos.lng);

          if (distance <= radius) {

            tempStr += '<div class="restaurant">';
            tempStr += '<h3 class="restaurant-name">' + results.features[i].properties.NAAM + '</h3>';
            tempStr += '<p class="restaurant-address">' + results.features[i].properties.STRAAT + ' ' + results.features[i].properties.NUMMER + '</p>';
            tempStr += '<a target="_blank" href="http://' + results.features[i].properties.WEBADRES + '">' + results.features[i].properties.WEBADRES + '</a>';
            tempStr += '<p class="distance">' + distance.toFixed(1) + ' km</p>';
            tempStr += '</div>';

            var marker = new google.maps.Marker({
              properties: results.features[i].properties,
              position: latLng,
              map: map,
              icon: 'resources/images/markers/ecoplan.png'

            });

            var infowindow = new google.maps.InfoWindow({
              content: " "
            });
            google.maps.event.addListener(marker, 'click', function () {
              infowindow.setContent(
                '<h3 class="restaurant-name">' + this.properties.NAAM + '</h3>' +
                '<p class="restaurant-address">' + this.properties.STRAAT + ' ' + this.properties.NUMMER + '</p>' +
                '<a target="_blank" href="http://' + this.properties.WEBADRES + '">' + this.properties.WEBADRES + '</a>' +
                '<p class="distance">' + distance.toFixed(1) + ' km</p>'
              );
              infowindow.open(map, this);
            });

          };
        }
        if (tempStr) {
          document.querySelector('.results').innerHTML = tempStr;
        } else {
          document.querySelector('.results').innerHTML = '<p class="no-results">Sorry, we couldn\'t find anything.</p>';
        }
      });

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
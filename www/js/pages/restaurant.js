var Restaurant = {
  //global variable
  restoAddress: '',
  //use Utils function to fetch data
  getData: Utils.getJSONByPromise('https://datatank.stad.gent/4/milieuennatuur/ecoplan.json?callback=json_callback').then(
    function (results){
      //sort results
      switch(Utils.getQueryVariable('sort')) {
        //sort alphabetically
        case 'az':
          results.sort(Utils.sortAZ('NAAM'));
          break;
        //sort reverse alphabetically
        case 'za':
          results.sort(Utils.sortAZ('-NAAM'));
          break;
        //default sort alphabetically
        default:
          results.sort(Utils.sortAZ('NAAM'));
      }

      for (var i = 0; i < results.length; i++){
        var resto = results[i];
        if (i == Utils.getQueryVariable('id')){
          //declare elements
          var name = document.getElementById('name');
          var address = document.getElementById('address');
          var site = document.getElementById('site');
          var redirect = document.getElementById('redirect');

          //set content of page to data
          name.innerHTML = resto.NAAM;
          address.innerHTML = resto.STRAAT + ' ' + resto.NUMMER;
          site.innerHTML = resto.WEBADRES;
          site.href = "http://" + resto.WEBADRES.replace('http://www','www');

          //set href of google maps directions link
          redirect.href="http://maps.google.com/?q=" + resto.NAAM + " " + resto.STRAAT + " " + resto.NUMMER + " Gent";
          //write address into variable
          Restaurant.restoAddress = resto.STRAAT + " " + resto.NUMMER;

          //initMap with restaurant coordinates
          initMap();
          //break the loop
          return false;
        }
      }
    }
  ),

};
//Google Maps initMap function
function initMap() {
  //set address
  var address = Restaurant.restoAddress + " Gent";
  var geocoder = new google.maps.Geocoder();

  //geocoder to get coordinates from address
  geocoder.geocode({
    'address': address
    },
    function(results, status) {
      //find lat long from address
      if (status == google.maps.GeocoderStatus.OK) {
        var Lat = results[0].geometry.location.lat();
        var Lng = results[0].geometry.location.lng();
        //declare map settings
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: new google.maps.LatLng(Lat, Lng),
          streetViewControl: false
        });
        //set marker
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(Lat, Lng),
          map: map,
          icon: '/images/marker.png'
        });

      }
    },
  );
}

var Exercise = {
  //global variables
  locations: [],
  properties: [],
  //use utils function to get data
  getData:
  Utils.getJSONByPromise('https://datatank.stad.gent/4/cultuursportvrijetijd/sportlocaties.json?callback=json_callback').then(
    function (results){
      var tempStr = '';
      //sort restults alphabetically
      results = results.sort(Utils.sortAZ('title'));
      for (var i = 0; i < results.length; i++) {
        //write results into global variable for use in Google Map and sort function
        Exercise.properties = results;
        //current result as sport
        sport = results[i];
        lat = sport.lat;
        lng = sport.lng;
        //push locations to array for use in Google Maps function
        Exercise.locations.push({lat: parseFloat(lat.replace(",",".")), lng: parseFloat(lng.replace(",","."))});

        tempStr += '<li class="item">';
        tempStr += '<i class="icon" style="background:url(https://lorempixel.com/128/128/sports/' + (i + 1) % 10 + ') center / cover;"></i>';
        tempStr += '<span class="content">';
        tempStr += '<p class="title">' + sport.title + '</p>';

        if (sport.street != '\\N') {
          tempStr += '<p class="light">' + sport.street + ' ' + sport.number + ', ' + sport.city + '</p>';
        }

        tempStr += '</span>';
        tempStr += '<i class="material-icons">arrow_drop_down</i>';
        tempStr += '</li>';
        tempStr += '<section class="panel">';

        if(sport.location != '\\N'){
          tempStr += '<h3>' + sport.location + '</h3></br>';
        }else{
          tempStr += '<h3>' + sport.title + '</h3>';
        }

        tempStr += '<p>' + sport.description + '</p>';
        tempStr += '</section>';
      };
        document.querySelector('.listresults').innerHTML = tempStr;

      //execute accordion code after data injected into page
      Main.accordion();
      //initMap with locations from data
      initMap();
    }
  ),
  sortData: function(){
    var sortby = document.querySelector('[name=order]');
    //when user changes sortby input,
    sortby.addEventListener('change', function(){
      switch(sortby.value) {
        //alphabetical order
        case 'az':
          Exercise.properties.sort(Utils.sortAZ('title'));
          break;
        //reverse alphabetical order
        case 'za':
          Exercise.properties.sort(Utils.sortAZ('-title'));
          break;
        //default alphabetical order
        default:
          Exercise.properties.sort(Utils.sortAZ('title'));
      }
      //refresh sorted results
      var tempStr = '';
      for(var i = 0; i < Exercise.properties.length; i++){
        sport = Exercise.properties[i];
        tempStr += '<li class="item">';
        tempStr += '<i class="icon" style="background:url(https://lorempixel.com/128/128/sports/' + (i + 1) % 10 + ') center / cover;"></i>';
        tempStr += '<span class="content">';
        tempStr += '<p class="title">' + sport.title + '</p>';
        if (sport.street != '\\N') {
          tempStr += '<p class="light">' + sport.street + ' ' + sport.number + ', ' + sport.city + '</p>';
        }
        tempStr += '</span>';
        tempStr += '<i class="material-icons">arrow_drop_down</i>';
        tempStr += '</li>';
        tempStr += '<section class="panel">';
        if(sport.location != '\\N'){
          tempStr += '<h3>' + sport.location + '</h3></br>';
        }else{
          tempStr += '<h3>' + sport.title + '</h3>';
        }
        tempStr += '<p>' + sport.description + '</p>';
        tempStr += '</section>';
      };
        document.querySelector('.listresults').innerHTML = tempStr;
    });
  },
};
Exercise.sortData();

// Google Maps initMap function
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    //centers on Ghent
    center: { lat: 51.048017, lng: 3.727666 }
  });
  //declare markers
  var markers = Exercise.locations.map(function(location, i) {
    var marker = new google.maps.Marker({
      icon: '/images/marker.png',
      position: location,
      properties: Exercise.properties[i]
    });
    //declare infowindow
    var infowindow = new google.maps.InfoWindow({
      content: " "
    });
    //when user clicks marker, show infowindow
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(
        '<h3>' + this.properties.title +  '</h3>' +
        '<p class="light" style="text-align:left; margin-top:8px;">' + this.properties.street + ' ' + this.properties.number + ', ' + this.properties.city + '</p>' +
        '<a target="_blank" href="http://maps.google.com/?q=' + this.properties.street + '+' + this.properties.number + '+' + this.properties.city + '">Route description</a>'
      );
      infowindow.open(map, this);
    });
    return marker;
  });

  // Add a marker clusterer to manage the markers.
  var markerCluster = new MarkerClusterer(map, markers, {
    styles: [{
      url: "/images/markers/m.png",
      width: 50,
      height: 45,
      textSize: 14,
      textColor: "white",
    }]
  });
}

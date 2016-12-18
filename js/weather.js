var html = '';
var tempStr = '';
$(document).ready(function () {
  $.simpleWeather({
    location: 'Ghent, Oost-Vlaanderen',
    woeid: '',
    unit: 'C',
    success: function (weather) {
      html += '<h2><i class="icon-' + weather.code + '"></i> ' + weather.temp + '&deg;' + weather.units.temp + '</h2>';
      html += '<ul><li><h1>' + weather.city + ', ' + weather.region + '</h1></li>';
      html += '<li class="currently">' + weather.currently + '</li>';
      html += '<li><i class="fa fa-compass" aria-hidden="true"></i> ' + weather.wind.direction + ' ' + weather.wind.speed + ' ' + weather.units.speed + '</li></ul>';

      $("#weather").html(html);
    },
    error: function (error) {
      $("#weather").html('<p>' + error + '</p>');
    }
  });

  Utils.getJSONByPromise('https://datatank.stad.gent/4/mobiliteit/bluebikedeelfietsensintpieters.json').then(function (results) {

    tempStr += '<h3> Blue Bike Ghent St-Pieters</h3>' +
      '<p class="distance"><span class="bold">Total amount of bikes:</span> ' + results.properties.attributes[0].value + '</p>' +
      '<p class="distance"><span class="bold">In use:</span> ' + results.properties.attributes[1].value + '</p>' +
      '<p class="distance"><span class="bold">Available:</span> ' + results.properties.attributes[2].value + '</p>' +
      '<p class="distance"><span class="bold">Under maintenance:</span> ' + results.properties.attributes[3].value + '</p>' +
      '<p class="distance"><span class="bold">Price for 24 hours:</span> &euro; ' + results.properties.attributes[4].value + '</p>';
  });

  Utils.getJSONByPromise('https://datatank.stad.gent/4/mobiliteit/bluebikedeelfietsendampoort.json').then(function (results) {

    tempStr += '<h3> Blue Bike Ghent Dampoort</h3>' +
      '<p class="distance"><span class="bold">Total amount of bikes:</span> ' + results.properties.attributes[0].value + '</p>' +
      '<p class="distance"><span class="bold">In use:</span> ' + results.properties.attributes[1].value + '</p>' +
      '<p class="distance"><span class="bold">Available:</span> ' + results.properties.attributes[2].value + '</p>' +
      '<p class="distance"><span class="bold">Under maintenance:</span> ' + results.properties.attributes[3].value + '</p>' +
      '<p class="distance"><span class="bold">Price for 24 hours:</span> &euro; ' + results.properties.attributes[4].value + '</p>';
    
    $('.blue-bikes').html(tempStr);
  
});



});

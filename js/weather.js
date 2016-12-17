var html = '';

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
      console.log(html);
    },
    error: function (error) {
      $("#weather").html('<p>' + error + '</p>');
    }
  });
});

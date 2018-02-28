var Home = {
  //set user information
  injectData: function(){
    Utils.getDistanceWalked('distance', 'totalBurnt');
    Utils.getWeather('temperature');
    Utils.getCityFromLatLong('location');
  },
  //set featured restaurant
  getData: Utils.getJSONByPromise('https://datatank.stad.gent/4/milieuennatuur/ecoplan.json?callback=json_callback').then(function (results){
      var i = Math.floor((Math.random() * results.length));
      var resto = results[i];
      var tempStr=  '';
      tempStr += '<img id="featured_img" src="https://lorempixel.com/700/310/food">';
      tempStr += '<div id="content">';
      tempStr += '<h1>' + resto.NAAM +'</h1>';
      tempStr += '<p>' + resto.STRAAT + ' ' + resto.NUMMER + '</p>';
      tempStr += '<div class="buttons">';
      tempStr += '<a href="/restaurant/?name=' + Utils.removeSpaces(resto.NAAM).toLowerCase() + '">More info</a>';
      tempStr += '<a href="/restaurants/">All restaurants</a>';
      tempStr += '</div>';
      tempStr += '</div>';
      document.querySelector('#featured').innerHTML = tempStr;
  }),
};

Home.injectData();

// chart code
google.charts.load('current', {'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var calories = parseFloat(document.querySelector('#totalBurnt').innerHTML);
  var totalCalories = 500;
  calories = calories < totalCalories? calories : calories = totalCalories;
  var data = google.visualization.arrayToDataTable([
    ['Calories', 'Amount'],
    ['burnt', calories],
    ['To go', totalCalories - calories]
  ]);
  var options = {
    title: 'Your statistics',
    pieHole: 0.95,
    titlePosition: 'none',
    pieSliceText: 'none',
    pieSliceBorderColor: 'none',
    legend: 'none',
    backgroundColor: {
      fill: '#607D8B'
    },
    chartArea: {
      height: '100%'
    },
    slices: {
      0: {color: '#86E8D2'},
      1: {color: '#78909C'}
    },
    animation: {
      duration: 1000,
      easing: 'out',
    },
  };

  var chart = new google.visualization.PieChart(document.getElementById('graph'));
  chart.draw(data, options);
}
//refresh chart on interval
setInterval(drawChart,10002);

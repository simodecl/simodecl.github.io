var Restaurants = {
  //global variable
  data: [],
  //use utils function to fetch data
  getData: Utils.getJSONByPromise('https://datatank.stad.gent/4/milieuennatuur/ecoplan.json?callback=json_callback').then(function (results){
    var tempStr = '';
    var sort = 'az';
    //sort array of objects by NAAM
    results = results.sort(Utils.sortAZ('NAAM'));
    Restaurants.data = results;
    for (var i = 0; i < results.length; i++) {
      resto = results[i];
      tempStr += '<li class="item">';
      tempStr += '<i class="icon" style="background:url(http://lorempixel.com/128/128/food/' + (i + 1) % 10 + ') center / cover;"></i>';
      tempStr += '<span class="content">';
      tempStr += '<p class="title">' + Utils.capitalizeFirstLetter(resto.NAAM) + '</p>';
      tempStr += '<p class="light">' + resto.STRAAT + ' ' + resto.NUMMER + '</p>';
      tempStr += '</span>';
      tempStr += '<a class="action" href="/restaurant/?id=' + i + '&sort=' + sort + '" >';
      tempStr += '<i class="material-icons">keyboard_arrow_right</i>';
      tempStr += '</a>';
      tempStr += '</li>';
    };
    document.querySelector('.listresults').innerHTML = tempStr;
  }),

  sortData: function(){
    var sortby = document.querySelector('[name=order]');
    sortby.addEventListener('change', function(){
      switch(sortby.value) {
        //sort alphabetically
        case 'az':
          Restaurants.data.sort(Utils.sortAZ('NAAM'));
          sort = 'az';
          break;
        //sort reverse alphabetically
        case 'za':
          Restaurants.data.sort(Utils.sortAZ('-NAAM'));
          sort = 'za';
          break;
        //default sort alphabetically
        default:
          Restaurants.data.sort(Utils.sortAZ('NAAM'));
          sort = 'az';
      }
      //inject data into page
      var tempStr = '';
      for(var i = 0; i < Restaurants.data.length; i++){
        restaurant = Restaurants.data[i];
        tempStr += '<li class="item">';
        tempStr += '<i class="icon" style="background:url(http://lorempixel.com/128/128/food/' + (i + 1) % 10 + ') center / cover;"></i>';
        tempStr += '<span class="content">';
        tempStr += '<p class="title">' + Utils.capitalizeFirstLetter(restaurant.NAAM) + '</p>';
        tempStr += '<p class="light">' + restaurant.STRAAT + ' ' + restaurant.NUMMER + '</p>';
        tempStr += '</span>';
        tempStr += '<a class="action" href="/restaurant/?id=' + i + '&sort=' + sort + '" >';
        tempStr += '<i class="material-icons">keyboard_arrow_right</i>';
        tempStr += '</a>';
        tempStr += '</li>';
      };
      document.querySelector('.listresults').innerHTML = tempStr;
    });
  },

};
Restaurants.sortData();

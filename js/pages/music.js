var Music = {
  //global variables
  txtSearchElement: document.querySelector('#music_search'),
  formSearchElement: document.querySelector('.inline_form'),

  getData: function(){
    //add eventlistener to search input
    this.formSearchElement.addEventListener('keypress', function(e) {
      //Check if user pressed 'Enter'
      if(e.keyCode == 13){
        //prevent default form action
        e.preventDefault();
        //add loader to page
        document.querySelector('.listresults').innerHTML = '<div class="showbox"><div class="loader"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div></div>';
        //Remove focus from search input
        document.activeElement.blur();
        //Load the data
        Music.loadData(Music.txtSearchElement.value);
      }
    }, false);
  },

  loadData: function(value){
    var apiUrl = 'https://itunes.apple.com/search?term=' + value + '&entity=album&callback=json_callback';
    //use utils to fetch data
    Utils.getJSONPByPromise(apiUrl).then(function (data){
      var tempStr = '';
      for(var i = 0; i < data.results.length; i++) {
        var album = data.results[i];
        tempStr += '<li class="item">';
        tempStr += '<i class="icon" style="background: url(' + album.artworkUrl60 + ') center / cover;"></i>';
        tempStr += '<span class="content">';
        tempStr += '<p class="title">' + album.collectionName + '</p>';
        tempStr += '<p class="light">' + album.artistName + '</p>';
        tempStr += '</span>';
        tempStr += '<a target="_blank" class="action" href="https://www.youtube.com/results?search_query=' + album.artistName + '+' + '-+' + album.collectionName + '"><i class="material-icons">play_arrow</i></a>';
        tempStr += '</li>';
      };
      //inject data into the page
      document.querySelector('.listresults').innerHTML = tempStr;
    })
  },
};

Music.getData();

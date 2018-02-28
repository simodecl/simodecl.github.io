var Social = {
  //function gets users and writes them on page
  getUsers: function(){
    var tempStr = '';
    //get all users
    var users = localStorage.getData('Vigor').users;
    //sort alphabetically
    users = users.sort(Utils.sortAZ('username'));
    //loop through users
    for(var i = 0; i < users.length; i++){
      user = users[i];
      //write all users besides currentUser on page
      if(user.username != localStorage.getData('Vigor').currentUser){
        tempStr += '<li class="item">';
        tempStr += '<i class="icon" style="background:url(/images/avatars/' + user.username.charAt(0).toLowerCase() + '.png) center / cover;"></i>';
        tempStr += '<span class="content">';
        tempStr += '<p class="title">' + user.username + '</p>';
        tempStr += '</span>';
        tempStr += '<a class="action" href="/messages/?user=' + user.username + '" >';
        tempStr += '<i class="material-icons">message</i>';
        tempStr += '</a>';
        tempStr += '</li>';
      }
    }
    document.querySelector('.listresults').innerHTML = tempStr;
  },
  //function searches through all users
  searchFriend: function(){
    //select searchinput element
    var searchUser = document.getElementById('add_friends');
    //add eventlistenener
    searchUser.addEventListener('input', function(){
      //select all users
      usersList = document.getElementsByClassName('item');
      //loop through userslist
      for (var i = 0; i < usersList.length; i++){
        //if input content matches user, hide all users besides this one
        if(usersList[i].innerHTML.indexOf(searchUser.value) != -1){
          usersList[i].style.display = 'flex';
        }else{
          usersList[i].style.display = 'none';
        }
      }

    });
  },

};

Social.getUsers();
Social.searchFriend();

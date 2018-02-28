if(localStorage.length == 0){
  window.location.replace('/login/');
}

var Main = {
  getUser: function(){
    var user = localStorage.getData('Vigor').currentUser;
    if(user == ''){
      window.location.replace('/login/');
    }
    else{
      document.querySelector('p.username').innerHTML = user;
    }
  },
  logout: function(){
    var logoutBtn = document.querySelector('a#logout');
    logoutBtn.onclick = function(){
      var Vigor = localStorage.getData('Vigor');
      Vigor.currentUser = '';
      localStorage.setData('Vigor', Vigor);
      window.location.replace('/login/');
    }
  },
  menu: function(){
    var burger = document.querySelector('#burger');
    var sidebar = document.querySelector('#sidebar');

    if (burger != null) {
      burger.onclick = function() {
        sidebar.classList.toggle('active');
      };
    }
  },

  scrollTop: function(){
    //define button
    var btnTop = document.getElementById("btn-top");
    //distance from top
    var dist = 256;

    //if btn exists, add eventlistener, onclick -> scroll to top
    if(btnTop != null){
      btnTop.addEventListener('click', function(e){
        e.preventDefault();
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0; // For IE and Firefox
      });
    }

    //show button when scrolling
    window.onscroll = function() {
      scrollFunction()
    };

    //show / hide button
    function scrollFunction() {
      if(btnTop != null){
        if (document.body.scrollTop > dist || document.documentElement.scrollTop > dist){
          btnTop.style.opacity = 1;
        } else {
          btnTop.style.opacity = 0;
        }
      }
    }
  },

  accordion: function(){
    //declare list-item
    var acc = document.getElementsByClassName("item");
    //for every item,
    for (var i = 0; i < acc.length; i++) {
      //add eventlistener
      acc[i].onclick = function() {
        var panel = this.nextElementSibling;
        //see if accordion is extended.
        //If it is, shrink accordion.
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
          this.lastElementChild.innerHTML = "arrow_drop_down";
          //If not, extend accordion.
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
          this.lastElementChild.innerHTML = "arrow_drop_up";
        }
      }
    }
  },

}

Main.getUser();
Main.logout();
Main.menu();
Main.scrollTop();

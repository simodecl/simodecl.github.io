//if localStorage isn't set, set template
if(localStorage.length == 0){
  localStorage.setData("Vigor", {
    currentUser: "",
    users : [
      {username: "manaus_t", password:"test123"},
      {username: "simon_d", password:"test123"},
      {username: "thomas_s", password:"test123"},
      {username: "arno_v", password:"test123"},
      {username: "olivier_p", password:"test123"},
      {username: "kristof_r", password:"test123"},
      {username: "dieter_d", password:"test123"},
      {username: "philippe_d", password:"test123"},
    ],
    messages: [
      {
        correspondents: ['manaus_t', 'simon_d'],
        content: ['manaus_tHello', 'manaus_tHow are you?', 'simon_dI\'m fine, how do you do']
      },
    ],

  });
}

var Login = {
  //global variables
  username: document.querySelector('input[placeholder=Username]'),
  password: document.querySelector('input[placeholder=Password]'),
  button: document.querySelector('button'),
  error: document.querySelector('.error'),

  login: function(){
    //fetch userarray from localStorage
    var users = localStorage.getData('Vigor').users;
    //add eventlistener to login button
    this.button.onclick = function(e){
      //prevent default button action
      e.preventDefault();

      var userExists = false;
      var passwordValid = false;
      var username = Login.username.value;
      var password = Login.password.value;

      //loop through users array to see if username matches existing user
      for(var i=0; i<users.length; i++){
        if (username == users[i].username){
          userExists = true;
          if(password == users[i].password){
            passwordValid = true;
          }
        }
      }

      if(!passwordValid){
        Login.error.innerHTML = "Password is incorrect.";
      }
      if(!userExists){
        Login.error.innerHTML = "User doesn't exist.";
      }
      //if credentials are correct, update localstorage and redirect to homepage
      if(userExists && passwordValid){
        Login.error.innerHTML = "";
        var Vigor = localStorage.getData('Vigor');
        Vigor.currentUser = username;
        localStorage.setData('Vigor', Vigor);
        window.location.replace('/');
      }
    };

  },

};
Login.login();

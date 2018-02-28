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

var Registration = {
  //global variables
  username: document.querySelector('input[placeholder=Username]'),
  password: document.querySelector('input[placeholder=Password]'),
  passwordTwo: document.querySelector('input[placeholder="Re-type password"]'),
  button: document.querySelector('button'),
  error: document.querySelector('.error'),

  register: function(){
    var users = localStorage.getData('Vigor').users;

    //add eventlistener to register button
    this.button.onclick = function(e){
      //prevent default action
      e.preventDefault();
      var userExists = false;
      var passwordValid = false;
      var username = Registration.username.value;
      var password = Registration.password.value;
      var passwordTwo = Registration.passwordTwo.value;
      //loop through user array
      for(var i=0; i<users.length; i++){
        if (username == users[i].username){
          Registration.error.innerHTML = 'User already exists.';
          userExists = true;
        }
      }
      //see if passwords match
      if (password !== passwordTwo) {
        Registration.error.innerHTML = "The two passwords don't match.";
        passwordValid = false;
      }else{
        passwordValid = true;
      }
      //if user exists and passwords match, register user
      if(!userExists && passwordValid){
        Registration.error.innerHTML = "";
        var Vigor = localStorage.getData('Vigor');
        Vigor.users.push({"username":username,"password":password});
        Vigor.currentUser = username;
        localStorage.setData('Vigor', Vigor);
        //redirect user to homepage
        window.location.replace('/');
      }
    };

  },
};
Registration.register();

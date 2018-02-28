var Settings = {
  //global variables
  username: document.querySelector('input[placeholder=Username]'),
  oldPassword: document.querySelector('input[placeholder="Old password"]'),
  newPassword: document.querySelector('input[placeholder="New password"]'),
  newPasswordTwo: document.querySelector('input[placeholder="Re-type password"]'),
  button: document.querySelector('button'),
  error: document.querySelector('.error'),
  success: document.querySelector('.success'),

  updateSettings: function(){
    this.button.onclick = function(e){
      //prevent default action of button and validate data
      e.preventDefault();
      Settings.validate();
    }
  },
  validate: function(){
    var Vigor = localStorage.getData('Vigor');
    var users = Vigor.users;
    var currentUser = Vigor.currentUser;

    var userId = 0;
    var userExists = false;
    var passwordValid = true;
    var username = Settings.username.value;
    var oldPassword = Settings.oldPassword.value;
    var newPassword = Settings.newPassword.value;
    var newPasswordTwo = Settings.newPasswordTwo.value;

    //loop through users array
    for(var i = 0; i<users.length;i++){
      //check if username already exists.
      if (username == users[i].username){
        userExists = true;
        //Set errormessage and clear success message
        Settings.error.innerHTML = 'User already exists.';
        Settings.success.innerHTML = '';
      }
      //Set userId
      if(currentUser == users[i].username && !userExists){
        userId = i;
        //if username input isn't empty and new passwords match, update username
        if(username != '' && newPassword == newPasswordTwo && passwordValid) {
          //update username
          Vigor.users[userId].username = username;
          Vigor.currentUser = username;
          localStorage.setData('Vigor', Vigor);
          //show success message and clear errormessage
          Settings.success.innerHTML = "Updated username!";
          Settings.error.innerHTML = "";
          //clear username input
          Settings.username.value = '';
        }
        //if password isn't empty but incorrect, return error
        if(oldPassword != '' && oldPassword !== users[userId].password) {
          //show errormessage and clear success message
          Settings.success.innerHTML = "";
          Settings.error.innerHTML = "Incorrect password";

          passwordValid = false;
        }
        //if new passwords don't match, return error
        if(newPassword !== newPasswordTwo) {
          //show errormessage and clear success message
          Settings.success.innerHTML = "";
          Settings.error.innerHTML = "The two new passwords don't match.";

          passwordValid = false;
        }
        //if passwords are filled in and are valid, update password
        if(oldPassword != '' && newPassword != '' && passwordValid){
          //update password
          Vigor.users[userId].password = newPassword;
          localStorage.setData('Vigor', Vigor);
          //show success message and clear errormessage
          Settings.success.innerHTML = "Updated password!";
          Settings.error.innerHTML = "";
          //clear inputs
          Settings.oldPassword.value = '';
          Settings.newPassword.value = '';
          Settings.newPasswordTwo.value = '';

        }
      }

      //end the loop
      return false;
    }
  },
};

Settings.updateSettings();

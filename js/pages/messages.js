var Messages = {
  correspondent: Utils.getQueryVariable('user'),
  currentUser: localStorage.getData('Vigor').currentUser,
  getMessages: function(){
    //if no user is set, redirect back to social page
    if(!Utils.getQueryVariable('user')){
      window.location.replace('/social/');
    }
    //declare image and name element
    var correspondent = document.getElementById('correspondent');
    var correspondentImg = document.getElementById('correspondent-img');
    //set content according to url variable
    correspondent.innerHTML = Messages.correspondent;
    correspondentImg.src = '/images/avatars/' + Messages.correspondent.charAt(0).toLowerCase() + '.png';

    //fetch messages from localstorage
    var messages = localStorage.getData('Vigor').messages;

    for(var i = 0; i < messages.length; i++){
      //if correspondents are both in array, display messages
      if(messages[i].correspondents.includes(Messages.currentUser) && messages[i].correspondents.includes(Messages.correspondent)){
        var content = messages[i].content;
        for(var j = 0; j < content.length;j++){
          //see if username is in content, if so, display content without username
          if(content[j].indexOf(Messages.currentUser) == 0){
            document.querySelector('.messages').innerHTML += '<div class="message"><div class="sent-message">' + content[j].substring(Messages.currentUser.length) + '</div></div>';
          }else{
            document.querySelector('.messages').innerHTML += '<div class="message"><div class="received-message">' + content[j].substring(Messages.correspondent.length) + '</div></div>';
          }
        }
      }
    }


  },
  //color coded message bubbles, depending on avatar
  colorMessages: function() {
    var color;
    switch (Messages.correspondent.charAt(0).toLowerCase()) {
      case 'a':
        color = '#1abc9c';
        break;
      case 'b':
        color = '#16a085';
        break;
      case 'c':
        color = '#f1c40f';
        break;
      case 'd':
        color = '#f39c12';
        break;
      case 'e':
        color = '#2ecc71';
        break;
      case 'f':
        color = '#27ae60';
        break;
      case 'g':
        color = '#7f058c';
        break;
      case 'h':
        color = '#d35400';
        break;
      case 'i':
        color = '#3498db';
        break;
      case 'j':
        color = '#2980b9';
        break;
      case 'k':
        color = '#e74c3c';
        break;
      case 'l':
        color = '#c0392b';
        break;
      case 'm':
        color = '#9b59b6';
        break;
      case 'n':
        color = '#8e44ad';
        break;
      case 'o':
        color = '#bdc3c7';
        break;
      case 'p':
        color = '#34495e';
        break;
      case 'q':
        color = '#2c3e50';
        break;
      case 'r':
        color = '#95a5a6';
        break;
      case 's':
        color = '#7f8c8d';
        break;
      case 't':
        color = '#ec87bf';
        break;
      case 'u':
        color = '#d870ad';
        break;
      case 'v':
        color = '#f69785';
        break;
      case 'w':
        color = '#9ba37e';
        break;
      case 'x':
        color = '#b49255';
        break;
      case 'y':
        color = '#b49255';
        break;
      case 'z':
        color = '#a94136';
        break;
      default:
        color = '#009688';
    }
    var messages = document.getElementsByClassName('received-message');
    for(var i = 0; i < messages.length; i++){
      //set textbubble backgroundcolor
      messages[i].style.backgroundColor = color;
    }
  },

  sendMessage: function(){
    //send when user presses send
    document.querySelector('#send-button').onclick = function(){
      if(document.getElementById('send_message').value != ''){
        send();
        document.activeElement.blur();
      }
    }
    //send when user presses enter on form
    document.querySelector('.inline_form').addEventListener('keypress', function(e) {
      if(e.keyCode == 13){
        e.preventDefault();
        if(document.getElementById('send_message').value != '')
        send();
      }
    })
    //send function
    var send = function(){
      if(document.querySelector('.new-message')){
        //remove new-message class from old messages (required for animation)
        document.querySelector('.new-message').classList.remove('new-message');
      }
      //append new message to DOM
      var msg = document.getElementById('send_message');
      document.querySelector('.messages').innerHTML += '<div class="message"><div class="sent-message new-message">' + msg.value + '</div></div>';
      //loop through message to see if previous message exists
      var messages = localStorage.getData('Vigor').messages;
      //if there is no record of conversation, make new one and push message to that one
      if(messages.indexOf([Messages.currentUser, Messages.correspondent]) == -1 && messages.indexOf([Messages.correspondent, Messages.currentUser]) == -1){
        //get object from localStorage
        var Vigor = localStorage.getData('Vigor');
        //push data to object
        Vigor.messages.push({correspondents: [Messages.currentUser,Messages.correspondent],content: [Messages.currentUser + msg.value]});
        //push object to localStorage
        localStorage.setData('Vigor', Vigor);
        //clear input
        msg.value = '';
      }else{
        //if there is record of conversation, push new message to existing conversation
        for(var i = 0; i < localStorage.getData('Vigor').messages.length; i++){
          if(messages[i].correspondents.includes(Messages.currentUser) && messages[i].correspondents.includes(Messages.correspondent)){
            //write conversation to localStorage
            var Vigor = localStorage.getData('Vigor');
            Vigor.messages[i].content.push(Messages.currentUser + msg.value);
            localStorage.setData('Vigor', Vigor);
            //clear input
            msg.value = '';
            document.activeElement.blur();
          }
        }
      }
      //clear input
      msg.value = '';
      document.activeElement.blur();
    }
  },


};
Messages.getMessages();
Messages.colorMessages();
Messages.sendMessage();

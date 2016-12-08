$(document).ready(function(){
    var form = $('.login-form');
    
    var login = function(user, pass){
            if(user === 'root' && pass === 'root'){
                return true;
            }else{
                return false;
            }
        }

    $('.warning').hide();

    $(".login-btn").click(function(e){
        e.preventDefault();
        var username = $('#login-username').val();
        var password = $('#login-password').val();
        console.log(username, password);

        if(login(username, password)) {
            window.location += 'home.html';
            console.log('false');
        } else {
            $('.warning').show();
            console.log('true');
        }
                    
        return false;
    });

    

});

        
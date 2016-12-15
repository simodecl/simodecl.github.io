function GebruikerRegistreren() {
	event.preventDefault();
	// registreer formulier ingevulde data in variabelen steken.
	var firstname = document.getElementById('signup-firstname').value;
	var lastname = document.getElementById('signup-lastname').value;
	var username = document.getElementById('signup-username').value;
	var password = document.getElementById('signup-password').value;

if (localStorage.getItem("users") !== null) {
    var users = [];
	users = JSON.parse( localStorage.getItem( 'users' ));
	users.push({"naam":firstname, "voornaam":lastname, "gebruikersnaam":username, "wachtwoord":password, });

	console.log( users ); // console log van users (mag verwijderd worden)!
	localStorage.setItem( 'users', JSON.stringify(users) );
	console.log( JSON.parse( localStorage.getItem( 'users' ) ) ); // console log van users (mag verwijderd worden)!
}else{
	var users = [{"naam":"lastname", "voornaam":"firstname", "gebruikersnaam":"username", "wachtwoord":"password" }];
	localStorage.setItem( 'users', JSON.stringify(users) );

	users = JSON.parse( localStorage.getItem( 'users' ));
	users.push({"naam":firstname, "voornaam":lastname, "gebruikersnaam":username, "wachtwoord":password, });

	console.log( users ); // console log van users (mag verwijderd worden)!
	localStorage.setItem( 'users', JSON.stringify(users) );
	console.log( JSON.parse( localStorage.getItem( 'users' ) ) ); // console log van users (mag verwijderd worden)!
};

}

function GebruikerInloggen(){
	event.preventDefault();
	var loginUsername = document.getElementById('login-username').value;
	var loginPassword = document.getElementById('login-password').value;


	var test = JSON.parse(localStorage.getItem('users'));
	console.log(test);

	var naamBestaat = "";

	//Dit checked of de naam bestaat in de database
    for( var i = 1; i < test.length; i++){
    	if(JSON.parse(localStorage.getItem('users'))[i].gebruikersnaam == loginUsername ){
    		var naamBestaat = JSON.parse(localStorage.getItem('users'))[i].gebruikersnaam;
    	}else{
    		
    	}
    };


    if(naamBestaat !== ""){
    	console.log(naamBestaat);
    	for( var i = 1; i < test.length; i++){

    		if(JSON.parse(localStorage.getItem('users'))[i].gebruikersnaam == naamBestaat && JSON.parse(localStorage.getItem('users'))[i].wachtwoord == loginPassword){
    			console.log("Gebruikersnaam en Wachtwoord zijn juist!");
                window.location += 'home.html';
    		}else{
                $('.warning').show('40ms');
                console.log('warning');    			
    		}
    	};
    }else{
    	console.log("Gebruikersnaam bestaat niet!");
    }

};

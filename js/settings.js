$(document).ready(function(){
    document.getElementById("slider").oninput = function() {
        myFunction();
    };

    function myFunction() {
        var val = document.getElementById("slider").value; 
        document.getElementById('distance').innerHTML = val + " km";
    }

});
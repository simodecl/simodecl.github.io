$(document).ready(function(){
    loadSettings();

    $('.container').on('click', '.edit-span' ,function () {
        var input = $('<input />', {'type': 'text', 'class': 'edit-input', 'name': 'aname', 'value': $(this).html()});
        $(this).parent().append(input);
        $(this).remove();
        input.focus();
    });
    
    $('.container').on('blur', '.edit-input', function () {
        $(this).parent().append($('<span />', {'class': 'edit-span'}).html($(this).val()));
        $(this).remove();
    });

    document.getElementById("slider").oninput = function() {
        myFunction();
    };
    function myFunction(){
        var sliderValue = document.getElementById("slider").value; 
        document.getElementById('distance').innerHTML = sliderValue + " km";
    }
    $('.settings-btn').click(saveSettings);

}); 


function loadSettings() {
    if(localStorage.getItem("slider") != null) {$('#distance').html(localStorage.getItem("slider") + " km")};
    if(localStorage.getItem("slider") != null) {$('#slider').val(localStorage.getItem("slider"))};
    if(localStorage.getItem("name") != null) {$('#name > span').html(localStorage.getItem("name"))};
    if(localStorage.getItem("email") != null) {$('#email > span').html(localStorage.getItem("email"))};
    if(localStorage.getItem("locationstreet") != null) {$("#location-street > span").html(localStorage.getItem("locationstreet"))};
    if(localStorage.getItem("locationcity") != null) {$("#location-city > span").html(localStorage.getItem("locationcity"))};
}

function saveSettings() {
    localStorage.setItem("slider", $('#slider').val());
    localStorage.setItem("name", $('#name > span').html());
    localStorage.setItem("email", $('#email > span').html());
    localStorage.setItem("locationstreet", $('#location-street > span').html());
    localStorage.setItem("locationcity", $('#location-city > span').html());
}
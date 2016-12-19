; (function () {

    if ($('#back-to-top').length) {
        var scrollTrigger = 75, // px
            backToTop = function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('#back-to-top').addClass('show');
                } else {
                    $('#back-to-top').removeClass('show');
                }
            };
        backToTop();
        $(window).on('scroll', function () {
            backToTop();
        });
        $('#back-to-top').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 333);
        });
    }

    var bikecoords;
    var bikelatLng;
    var bikemarker;
    var bikeinfowindow;
    Utils.getJSONByPromise('https://datatank.stad.gent/4/mobiliteit/bluebikedeelfietsensintpieters.json').then(function (fromResolve) {
        bikecoords = fromResolve.geometry.coordinates;//foute coordinaten, dus heb locatie opgezocht en manueel coords gezocht
        bikelatLng = new google.maps.LatLng(51.034926, 3.709651);
        bikemarker = new google.maps.Marker({
            properties: fromResolve.properties,
            position: bikelatLng,
            map: map,
            icon: 'resources/images/markers/blue_bike.png',
            zIndex: 5000000
        });
        bikeinfowindow = new google.maps.InfoWindow({
            content: " "
        });
        google.maps.event.addListener(bikemarker, 'click', function () {
            bikeinfowindow.setContent(
                '<h3 class="restaurant-name"> Blue Bike Gent St-Pieters</h3>' +
                '<p class="distance">Totaal aantal fietsen: ' + this.properties.attributes[0].value + '</p>' +
                '<p class="distance">In gebruik: ' + this.properties.attributes[1].value + '</p>' +
                '<p class="distance">Beschikbaar: ' + this.properties.attributes[2].value + '</p>' +
                '<p class="distance">In onderhoud: ' + this.properties.attributes[3].value + '</p>' +
                '</br>' +
                '<p class="distance">Prijs per 24 uur: ' + this.properties.attributes[4].value + ' euro</p>' +
                '<a target="_blank" href="http://www.blue-bike.be/en">www.blue-bike.be/en</a>'
            );
            bikeinfowindow.open(map, this);
        });
    });

    Utils.getJSONByPromise('https://datatank.stad.gent/4/mobiliteit/bluebikedeelfietsendampoort.json').then(function (fromResolve) {
        bikecoords = fromResolve.geometry.coordinates;
        bikelatLng = new google.maps.LatLng(bikecoords[1], bikecoords[0]);
        bikemarker = new google.maps.Marker({
            properties: fromResolve.properties,
            position: bikelatLng,
            map: map,
            icon: 'resources/images/markers/blue_bike.png'
        });
        bikeinfowindow = new google.maps.InfoWindow({
            content: " "
        });
        google.maps.event.addListener(bikemarker, 'click', function () {
            bikeinfowindow.setContent(
                '<h3 class="restaurant-name"> Blue Bike Gent Dampoort</h3>' +
                '<p class="distance">Totaal aantal fietsen: ' + this.properties.attributes[0].value + '</p>' +
                '<p class="distance">In gebruik: ' + this.properties.attributes[1].value + '</p>' +
                '<p class="distance">Beschikbaar: ' + this.properties.attributes[2].value + '</p>' +
                '<p class="distance">In onderhoud: ' + this.properties.attributes[3].value + '</p>' +
                '</br>' +
                '<p class="distance">Prijs per 24 uur: ' + this.properties.attributes[4].value + ' euro</p>' +
                '<a target="_blank" href="http://www.blue-bike.be/en">www.blue-bike.be/en</a>'
            );
            bikeinfowindow.open(map, this);
        });
    });
})();
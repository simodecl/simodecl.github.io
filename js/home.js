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

    Utils.getJSONByPromise('https://datatank.stad.gent/4/mobiliteit/bluebikedeelfietsensintpieters.json').then(function (fromResolve) {
        bikecoords = fromResolve.geometry.coordinates;
        bikelatLng = new google.maps.LatLng(bikecoords[1], bikecoords[0]);
        bikemarker = new google.maps.Marker({
            position: bikelatLng,
            map: map,
            icon: 'resources/images/markers/blue_bike.png'
        });
    });

    Utils.getJSONByPromise('https://datatank.stad.gent/4/mobiliteit/bluebikedeelfietsendampoort.json').then(function (fromResolve) {
        bikecoords = fromResolve.geometry.coordinates;
        bikelatLng = new google.maps.LatLng(bikecoords[1], bikecoords[0]);
        bikemarker = new google.maps.Marker({
            position: bikelatLng,
            map: map,
            icon: 'resources/images/markers/blue_bike.png'
        });
    });
})();
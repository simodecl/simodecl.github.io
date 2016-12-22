; (function () {
    loadSettings();
    var app = new Search();
    app.init();

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

    function loadSettings() {
        if (localStorage.getItem("name") != null) { $('#name').html(localStorage.getItem("name")) };
        if (localStorage.getItem("locationstreet") != null) { $("#location-street").html(localStorage.getItem("locationstreet")) };
        if (localStorage.getItem("locationcity") != null) { $("#location-city").html(localStorage.getItem("locationcity")) };
    }


    function Search() {
        this.API_URL = 'https://datatank.stad.gent/4/milieuennatuur/ecoplan.json?callback=json_callback';
        this._Results;

        // Initialize App
        this.init = function () {
            console.log('1. Initialize the app');
            // Call the function loadData
            this.loadData();
        }

        // Load the data from Ghent Data API
        this.loadData = function () {
            // Hack --> Closure
            var that = this;
            console.log('2. Load the Data');

            var xhr = new XMLHttpRequest();
            xhr.open('get', this.API_URL, true);
            xhr.responseType = 'json';
            xhr.onload = function () {
                if (xhr.status == 200) {
                    var data = (!xhr.responseType) ? JSON.parse(xhr.response) : xhr.response;
                    that._Results = data;
                    that.updateUI();
                } else {
                    console.log(xhr.status);
                }
            }
            xhr.onerror = function () {
                console.log(Error('Network Error!'));
            }
            xhr.send();

        };

        // Update the User Interface (UI)
        this.updateUI = function () {
            console.log('3. Update UI');

            //function to sort by name
            function compare(a, b) {
                if (a.NAAM.toUpperCase() < b.NAAM.toUpperCase())
                    return -1;
                if (a.NAAM.toUpperCase() > b.NAAM.toUpperCase())
                    return 1;
                return 0;
            }
            this._Results.sort(compare);

            // Call function generateSearchUI
            this.generateSearchUI();
        };

        // Generate the results
        this.generateSearchUI = function () {
            console.log('4. Generate UI with div-element');
            var tempStr = '';
            for (var i = 0; i < Math.floor(Math.random() * 20) + 5; i++) {
                var resto = this._Results[Math.floor(Math.random() * this._Results.length)];
                tempStr += '<div class="favourite">';
                tempStr += '<i class="fa fa-star" aria-hidden="true"></i>';
                tempStr += '<h3 class="restaurant-name">' + resto.NAAM + '</h3>';
                tempStr += '<p>' + resto.STRAAT + ' ' + resto.NUMMER + '</p>';
                tempStr += '</div>';
            };
            document.querySelector('.results').innerHTML = tempStr;

            $('.fa-star').on('click', function () {
                $(this).toggleClass('fa-star-o');
                $(this).parent().delay(200).hide('400ms', 'linear');

            });

        };
    }
})();
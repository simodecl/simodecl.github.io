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

    function Search() {

        // URL of the Search API
        this.API_URL = 'https://datatank.stad.gent/4/milieuennatuur/ecoplan.json?callback=json_callback';
        // The results within the JSON-object
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
            for (var i = 0; i < this._Results.length; i++) {
                var resto = this._Results[i];
                tempStr += '<div class="search-result">';
                tempStr += '<i class="fa fa-star fa-star-o" aria-hidden="true"></i>';
                tempStr += '<h3 class="restaurant-name">' + resto.NAAM + '</h3>';
                tempStr += '<p>' + resto.STRAAT + ' ' + resto.NUMMER + '</p>';
                tempStr += '<a target="_blank" href="http://' + resto.WEBADRES + '">' + resto.WEBADRES + '</a>';
                tempStr += '<p class="category"> ' + resto.CATEGORIE + ' / ' + resto.LABEL + '</p>';
                tempStr += '</div>';
            };
            document.querySelector('.results').innerHTML = tempStr;

            $('.search-input').bind('input', function () {
                var search = $('#search-content').val();
                var category = $('#search-category').val();
                $('.search-result').hide();
                $('.results').find('.search-result:contains(' + search + '):contains(' + category + ')').show();
            });


            $('.fa-star').on('click', function () {
                $(this).toggleClass('fa-star-o');
            });



        };



    }
    // Make an instance of the Search
    var app = new Search();
    // Initialize the app
    app.init();



})();
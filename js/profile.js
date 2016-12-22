; (function () {
    $('.fa-star').on('click', function(){
        $(this).toggleClass('fa-star-o');
        //$(this).addClass('unfavourite');
        $(this).parent().delay(200).hide('400ms', 'linear');

    });

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
})();
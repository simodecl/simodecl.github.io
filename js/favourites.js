$('.fa-star').on('click', function(){
    $(this).addClass('unfavourite');
    $(this).parent().delay(200).hide('400ms', 'linear');
})
// rating logic

$('.ui.rating').rating();

$('.ui.rating.index').rating('disable');

$('#newRating').rating('setting', 'onRate', function (value) {
    $("#ratingInput").val($('#newRating').rating("get rating"))
});

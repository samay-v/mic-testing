// rating logic
$('.ui.rating').rating();

$('#newRating').rating('setting', 'onRate', function (value) {
    $("#ratingInput").val($('#newRating').rating("get rating"))
});

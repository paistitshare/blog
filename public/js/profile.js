$(document).ready(function(){
    $("span.menu").click(function () {
        $(".head-nav ul").slideToggle(300, function () {
        });
    });
    $("#templates-toggle").click(function(){
        $("#templates").slideDown(700);
        event.stopPropagation();
        $('html, body').animate({
            scrollTop: $("#templates").offset().top
        }, 700);
    });
});
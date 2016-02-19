$(document).ready(function(){
    $("#templates-toggle").click(function(){
        $("#templates").slideDown("slow");
        event.stopPropagation();
    });
});
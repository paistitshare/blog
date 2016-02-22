function toHtml() {
    var converter = new showdown.Converter();
    html = converter.makeHtml($('#content').text());
    $('#content').replaceWith(html);
}

$(document).ready(function(){
    setTimeout(toHtml , 300);
});
var postApp = angular.module('postApp', ['youtube-embed']);

//postApp.directive('markdown', function($window) {
//    var converter = new $window.Showdown.converter();
//    return {
//        restrict: 'E',
//        link: function(scope, element, attrs) {
//            var htmlText = converter.makeHtml(element.text());
//            element.html(htmlText);
//        }
//    }
//});
(function () {
    'use strict';

    postApp.controller('PostCtrl', function ($scope, $http, $window) {
        angular.element(document).ready(function() {
        });

        $scope.param = $window.location.href.substr($window.location.href.lastIndexOf('/') + 1);
        $http.get('/getPost/'+ $scope.param).then(function(post){
            $scope.post = post.data;
            //var content = $scope.post.content;
            //content = $sce.trustAsHtml(markdown.toHTML(content));
            //$scope.post.content = content;

        }, httpError);

        function httpError(error) {
            if (error) throw(error);
        }
    });

    postApp.controller('Ctrl', function ($scope, $http, $window) {
        angular.element(document).ready(function() {
            //$('<li class="col-xs-6 pull-right end-markdown">').append( e.parseContent() ).prependTo('.posts');
        });

        $scope.param = $window.location.href.substr($window.location.href.lastIndexOf('/') + 1);
        $http.get('/getPost/'+ $scope.param).then(function(post){
            $scope.post = post.data;
            //var content = $scope.post.content;
            //content = $sce.trustAsHtml(markdown.toHTML(content));
            //$scope.post.content = content;

        }, httpError);

        function httpError(error) {
            if (error) throw(error);
        }
    });

})();
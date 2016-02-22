(function () {
    'use strict';

    postApp.controller('PostCtrl', function ($scope, $http, $window) {
        angular.element(document).ready(function() {
        });
        $scope.param = $window.location.href.substr($window.location.href.lastIndexOf('/') + 1);
        $http.get('/getPost/' + $scope.param).then(function(post){
            $scope.post = post.data;
            $scope.video = $scope.post.video;
        }, httpError);

        function httpError(error) {
            if (error) throw(error);
        }
    });

})();
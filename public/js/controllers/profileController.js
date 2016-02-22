(function () {
    'use strict';

    var postsApp = angular.module('profileApp', []);
    postsApp.controller('ProfileCtrl', function ($scope, $http) {
        $http.get('/getPublications/' + $('#username').text()).then(function(posts){
            $scope.posts = posts.data;
        }, httpError);

        function httpError(error) {
            if (error) throw(error);
        }
    });

})();
(function () {
    'use strict';

    var postsApp = angular.module('postsApp', []);
    postsApp.controller('PostsCtrl', function ($scope, $http, $window) {
        $http.get('/getPosts').then(function(posts){
            $scope.posts = posts.data;
            if(Object.keys(posts.data).length == 0) $scope.message = 'No publications found';
        }, httpError);

        function httpError(error) {
            if (error) throw(error);
        }
    });

})();
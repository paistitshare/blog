(function () {
    'use strict';

    angular.module('postsApp').controller('PostsCtrl', function ($scope, $http, $window) {
        $http.get('/getPosts').then(function(data){
            alert(JSON.stringify(data));
            $scope.posts = posts.data;
        }, httpError);

        function httpError(error) {
            if (error) throw(error);
        }
    });

})();
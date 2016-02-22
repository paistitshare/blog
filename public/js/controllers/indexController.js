var app = angular.module('indexApp', ['angular-jqcloud']);
app.controller('IndexCtrl', function($scope, $http) {
    $http.get('/getTags').then(function(tags){
        $scope.words = tags.data;
    }, function(err){
        if (err) throw err;
    });
    $scope.colors = ["#800026", "#bd0026", "#e31a1c", "#fc4e2a", "#fd8d3c", "#feb24c", "#fed976"];

    $scope.update = function() {
        $scope.words.splice(-5);
    };
});
app.controller('PostsCtrl', function ($scope, $http, $window) {
    $http.get('/getPosts').then(function(posts){
        $scope.posts = posts.data;
        if(Object.keys(posts.data).length == 0) $scope.message = 'No publications found';
    }, httpError);

    function httpError(error) {
        if (error) throw(error);
    }
});

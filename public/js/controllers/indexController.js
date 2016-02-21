var app = angular.module('tagCloudApp', ['angular-jqcloud']);
app.controller('tagCloudController', function($scope, $http) {
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

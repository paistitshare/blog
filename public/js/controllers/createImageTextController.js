(function () {
    'use strict';

    var createImageTextApp = angular.module('createImageTextApp', ['ngTagsInput']);

    createImageTextApp.controller('CreateImageTextCtrl', function ($scope, $http, $window, $q) {
        angular.element(document).ready(function() {
            $('#refresh').bind("DOMSubtreeModified",function() {
                $scope.image = $('#refresh').find('img').attr('src');
            });

        });

        $http.get('/getTags').then(function(tags){
            $scope.tags = tags.data;
        }, httpError);

        $scope.loadTags = function(query) {
            var deferred = $q.defer();
            deferred.resolve($scope.tags);
            return deferred.promise;
        };

        $scope.savePost = function(){
            $scope.post.username = $('#username').text();
            $scope.post.tagsBulk = $scope.post.tags.map(function(tag) { return {name: tag.text}});
            $scope.post.image = $scope.image;
            $scope.post.template = 'image-text';
            $http.post('/createImageTextPost', this.post).then(function(data, status) {
                if (data) $window.location.href = '/posts';
            }, httpError);
        };

        function httpError(error) {
            if (error) throw(error);
        }
    });
})();
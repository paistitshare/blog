(function () {
    'use strict';

    var editVideoTextApp = angular.module('editVideoTextApp', ['ngTagsInput']);

    editVideoTextApp.controller('EditVideoTextCtrl', function ($scope, $http, $window, $q) {
        angular.element(document).ready(function() {
            $('#refresh').bind("DOMSubtreeModified",function() {
                $scope.image = $('#refresh').find('img').attr('src');
            });
        });

        $scope.param = $window.location.href.substr($window.location.href.lastIndexOf('/') + 1);
        $http.get('/getPost/' + $scope.param).then(function(tags){
            $scope.post = tags.data;
        }, httpError);

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
            $scope.post.video = $scope.video;
            $scope.post.template = 'video-text';
            $http.post('/editVideoTextPost/' + $scope.param, this.post).then(function(data, status) {
                if (data) $window.location.href = '/posts';
            }, httpError);
        };
        function httpError(error) {
            if (error) throw(error);
        }
    });
})();
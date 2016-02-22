(function () {
    'use strict';

    postApp.controller('CommentsCtrl', function ($scope, $http, $window) {

        $http.get('/getComments/' + $scope.param).then(function (comments) {
            $scope.comments = comments.data;
        }, httpError);

        $scope.saveComment = function () {
            $scope.comment.username = $('#username').text();
            $scope.comment.PostId = $window.location.href.substr($window.location.href.lastIndexOf('/') + 1);
            $http.post('/createComment', this.comment).then(function (data, status) {
                if (data) $window.location.href = '/posts';
            }, httpError);
        };

        function httpError(error) {
            if (error) throw(error);
        }
    });
})();
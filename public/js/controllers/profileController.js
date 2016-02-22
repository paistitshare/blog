(function () {
    'use strict';

    var postsApp = angular.module('profileApp', ['infinite-scroll']);
    postsApp.controller('ProfileCtrl', function ($scope, $http) {
        $scope.counter = 0;
        $http({
            method: 'POST',
            data: {username: $('#username').text()},
            url: '/getPublications'
        }).then(function(posts) {
            $scope.posts = posts.data;
        }, httpError);

        function deletePost(postid) {
            if (postid) $http.delete('/deletePost/' + postid).then(function(){

            });
        }

        //$scope.data = this.posts.slice(0, 1);
        $scope.loadMore = function () {
            //this.data = this.posts.slice(0, this.data.length + 1);
            //$http({
            //    method: 'POST',
            //    data: {username: $('#username').text()},
            //    url: '/getPublications/' + $scope.counter
            //}).then(function(posts){
            //    $scope.posts.push(posts[0].data);
            //}, httpError);
        };

        function httpError(error) {
            if (error) throw(error);
        }
    });

    //    postsApp.factory('ItrBlog', function($http) {
    //        var ItrBlog = function() {
    //            this.posts = [];
    //            this.busy = false;
    //            this.after = '';
    //        };
    //
    //    ItrBlog.prototype.nextPage = function() {
    //        if (this.busy) return;
    //        this.busy = true;
    //        $http.get('/getPublications/' + $('#username').text()).then(function(posts) {
    //            var posts = posts.data;
    //            for (var i = 0; i < posts.length; i++) {
    //                this.posts.push(posts[i].data);
    //            }
    //            this.after = "t3_" + this.items[this.items.length - 1].id;
    //            this.busy = false;
    //        }.bind(this));
    //    };
    //    return ItrBlog();
    //});

})();
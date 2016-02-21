(function () {
    'use strict';

    $(".status-box").markdown({
        savable:true,
        onSave: function(e) {
            $('<li class="col-xs-6 pull-left raw-markdown">').append( e.getContent() ).prependTo('.posts');
            $('<li class="col-xs-6 pull-right end-markdown">').append( e.parseContent() ).prependTo('.posts');
        }
    });

    var createImageTextApp = angular.module('createImageTextApp', ['ngTagsInput']);

    app.controller('CreateImageTextCtrl', function ($scope, $http, $window) {
        angular.element(document).ready(function() {
            $('#refresh').bind("DOMSubtreeModified",function() {
                $scope.image = $('#refresh').find('img').attr('src');
            });
            $scope.tags = [
                { text: 'just' },
                { text: 'some' },
                { text: 'cool' },
                { text: 'tags' }
            ];
        });

        $scope.loadTags = function(query) {
            //return $http.get('/getTags?query=' + query);
        };
        //app.directive("markdownEditor", function () {
        //    return {
        //        restrict: "A",
        //        require:  'ngModel',
        //        link:     function (scope, element, attrs, ngModel) {
        //            $(element).markdown({
        //                savable:false,
        //                onChange: function(e){
        //                    ngModel.$setViewValue(e.getContent());
        //                }
        //            });
        //        }
        //    }
        //});
        $scope.savePost = function(){
            $scope.post.username = $('#username').text();
            $scope.post.tagsBulk = $scope.post.tags.map(function(tag) { return {name: tag.text}});
            $scope.post.image = $scope.image;
            $http.post('/saveImageTextPost', this.post).then(function(data, status) {
                if (data) $window.location.href = '/posts';
            }, httpError);
        };
        function httpError(error) {
            if (error) throw(error);
        }
    });
})();
(function () {
  'use strict';

var settingsApp = angular.module('settingsApp', []);

settingsApp.controller('SettingsCtrl', function ($scope, $http, $window) {
    angular.element(document).ready(function() {
        $('#refresh').bind("DOMSubtreeModified", function() {
            $scope.info.avatar = $('#refresh').children('img')[0].src;
        });
    });
     $http.get('/getSettings').then(function(data){
         $scope.info = data;
     }, httpError);

    $scope.saveSettings = function(){
        $http.post('/saveSettings', this.info).then(function(data, status) {
            if (data) $window.location.href = '/posts';
        }, httpError);
    };
        function httpError(error) {
            if (error) throw(error);
    }
});
})();
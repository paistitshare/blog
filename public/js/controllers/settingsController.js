(function () {
  'use strict';

var settingsApp = angular.module('settingsApp', []);

settingsApp.controller('SettingsCtrl', function ($scope, $http, $sce) {

  $http.defaults.xsrfHeaderName = 'X-CSRFToken';
  $http.defaults.xsrfCookieName = 'csrftoken';

     $http.get('/userinfo').then(set_userinfo, http_error);

      function set_userinfo(data, status, headers, config) {
        $scope.info=data.data;
        $scope.info.date_of_birth= new Date(data.data.date_of_birth);
      }

      function http_error(data, status, headers, config) {
        $scope.content=$sce.trustAsHtml(data.data);
      }

    $scope.log = function(){
        $http.put('/userinfo', this.info).then(saved, http_error);
    }

    function saved(data, status, headers, config) {
        alert("done0");
      }

});
})();
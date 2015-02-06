'use strict';

angular.module('journalink')
  .controller('MainCtrl', function ($scope, $http, $resource) {
    $scope.entries = [];
    $scope.newEntry = {};

    $scope.getEntries = function () {
      $http.get('/api/entries').success(function (entries) {
        $scope.entries = entries;
      });
    }

    $scope.getEntries();

    $scope.addEntry = function () {
      if (_.isEmpty($scope.newEntry)) {
        return;
      }

      $http.post('/api/entries', $scope.newEntry)
        .success(function () {
          $scope.newEntry = {};
          $scope.getEntries()
        });
    };

    $scope.deleteEntry = function (entry) {
      $http.delete('/api/entries/' + entry._id);
    };
  });

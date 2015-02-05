'use strict';

angular.module('journalink')
  .controller('MainCtrl', function ($scope, $http, $resource) {
    $scope.entries = [];

    $http.get('/api/entries').success(function (entries) {
      console.log( "entries:", entries );
      $scope.entries = entries;
    });

    $scope.addEntry = function () {
      if ($scope.newEntry === '') {
        return;
      }
      $http.post('/api/entries', {
        name: $scope.newEntry
      });
      $scope.newEntry = '';
    };

    $scope.deleteEntry = function (entrie) {
      $http.delete('/api/entries/' + entrie._id);
    };
  });

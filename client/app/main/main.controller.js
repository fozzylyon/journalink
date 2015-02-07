'use strict';

angular.module('journalink')
  .controller('MainCtrl', function ($scope, $http, $resource, Modal) {
    $scope.entries = [];

    $scope.getEntries = function () {
      $scope.selectedEntry = {};
      $http.get('/api/entries').success(function (entries) {
        $scope.entries = entries;
      });
    };

    $scope.getEntries();

    $scope.showTips = function () {
      $http.get('/assets/md/tips.md').success(function (response) {
        Modal.info({
          title: 'Tips',
          md: response
        });
      });
    };


    $scope.saveEntry = function (entry) {
      if (_.isEmpty(entry.body)) {
        return;
      }
      if (entry._id) {
        $http.put('/api/entries/' + entry._id, entry)
          .success($scope.getEntries);
      } else {
        $http.post('/api/entries', entry)
          .success($scope.getEntries);
      }
    };

    $scope.deleteEntry = function (entry) {
      $http.delete('/api/entries/' + entry._id)
        .success($scope.getEntries);
    };

    $scope.editEntry = function (entry) {
      $scope.selectedEntry = entry;
    };
  });

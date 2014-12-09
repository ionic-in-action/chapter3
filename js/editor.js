angular.module('App')
.controller('EditorController', function ($scope, $http) {
  $scope.editing = true;

  $http.get('/notes').success(function (data) {
    $scope.notes = data;
  }).error(function (err) {
    $scope.error = 'Could not load notes';
  });

});

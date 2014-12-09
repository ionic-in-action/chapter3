angular.module('App')
.controller('EditorCtrl', function ($scope, $http) {
  $scope.editing = true;

  $scope.view = function (index) {
    $scope.editing = false;
    $scope.content = $scope.notes[index];
  };

  $scope.create = function () {
    $scope.editing = true;
    $scope.content = {
      title: '',
      content: ''
    };
  };

  $scope.save = function () {
    $scope.content.date = new Date();

    if ($scope.content.id) {
      $http.post('/notes/' + $scope.content.id, $scope.content).success(function (data) {
        $scope.editing = false;
      }).error(function (err) {
        $scope.error = 'Could not upate note';
      });
    } else {
      $scope.content.id = Date.now();
      $http.put('/notes', $scope.content).success(function (data) {
        $scope.notes.push($scope.content);
        $scope.editing = false;
      }).error(function (err) {
        $scope.error = 'Could not create note';
      });
    }
  };

  $http.get('/notes').success(function (data) {
    $scope.notes = data;
  }).error(function (err) {
    $scope.error = 'Could not load notes';
  });

});

/**
 * Created by admin on 30/03/2017.
 */
Abuy.controller('HomeCtrl', function($scope, $state, $localStorage, Restangular, Alert, $q) {

  $scope.$on("$ionicView.enter", function (p1, p2) {

    $scope.search = {};

    var Agent = Restangular.one('users', $localStorage.user.userId);
    console.log("Enter p1 : ", p1);
    console.log("Enter p2 : ", p2);
    var resources = [Agent.all('refills').getList({'filter[limit]': 10}), Agent.all('withdrawalsAgent').getList({'filter[limit]': 10})];
    $q.all(resources)
      .then(function(res) {
        $scope.operations = [];
        var queries = [];
        var increment = 0;
        for (var i = 0; i < res.length; i++){
          for (var j = 0; j < res[i].length; j++){
            $scope.operations.push(res[i][j]);
            queries[increment] = Restangular.one('accounts/' + res[i][j].accountId + '/user').get();
            increment  = increment + 1;
          }
        }
        $q.all(queries)
          .then(function(responses) {
            for (var i = 0; i < responses.length; i++){
              $scope.operations[i].phone = responses[i].phone;
            }
            console.log("Refills : ", $scope.operations);
          });
      }, function (errs) {
        console.log("Errors : ", errs)
      });
    /*Agent.all('refills').getList({'filter[limit]': 10}).then(function (data) {
      console.log("data : ", data);
      $scope.refills = data;
      var queries = [];
      for (var i = 0; i < data.length; i++){
        queries[i] = Restangular.one('accounts/' + data[i].accountId + '/user').get();
      }
      $q.all(queries)
        .then(function(responses) {
          for (var i = 0; i < responses.length; i++){
            $scope.refills[i].phone = responses[i].phone;
          }
          console.log("Refills : ", $scope.refills);
        });
    }, function (err) {
      console.log("Err : ", err);
    });*/
    /*Agent.all('withdrawalsAgent').getList({'filter[limit]': 10}).then(function (data) {
      console.log("data : ", data);
      $scope.refills = data;
      var queries = [];
      for (var i = 0; i < data.length; i++){
        queries[i] = Restangular.one('accounts/' + data[i].accountId + '/user').get();
      }
      $q.all(queries)
        .then(function(responses) {
          for (var i = 0; i < responses.length; i++){
            $scope.refills[i].phone = responses[i].phone;
          }
          console.log("Refills : ", $scope.refills);
        });
    }, function (err) {
      console.log("Err : ", err);
    });*/

  });

  $scope.reset = function () {
    if($scope.search.phone == null){
      $scope.search.phone = undefined;
    }
  };

  $scope.disconnect = function () {
    var Agent = Restangular.one('users/logout');
    Agent.post().then(function (data) {
      console.log("Data received : ", data);
      $localStorage.$reset();
      $state.go('signin');
    }, function (err) {
      console.log("Error : ", err);
      Alert.error("Erreur", err);
    });

  };

});

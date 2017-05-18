/**
 * Created by admin on 30/03/2017.
 */
Abuy.controller('SigninCtrl', function ($scope, $state, Restangular, Alert, $localStorage) {

  console.log('Signin controller');
  $scope.data = {};

  $scope.connect = function () {
    var Agent = Restangular.one('users/login');
    if($scope.data.email && $scope.data.password){
      Agent.email = $scope.data.email;
      Agent.password = $scope.data.password;
      Agent.post().then(function (data) {
        console.log("Data received : ", data);
        if(data.id){
          $localStorage.token = data.id;
          $localStorage.user = data;
          $state.go('tab.home');
        }
        else{
          Alert.error("Erreur", data);
        }
      }, function (err) {
          console.log("Error : ", err);
          Alert.error("Erreur", err);
      });
    }
  };

});

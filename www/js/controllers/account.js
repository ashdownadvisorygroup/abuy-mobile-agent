/**
 * Created by admin on 30/03/2017.
 */
Abuy.controller('AccountCtrl', function($scope, Restangular, $localStorage, Alert) {
  $scope.settings = {
    enableFriends: true
  };

  $scope.$on("$ionicView.enter", function (p1, p2) {
    $scope.edit = false;
    var Agent = Restangular.one('users', $localStorage.user.userId);
    Agent.get().then(function (data) {
      $scope.agent = data;
    }, function (err) {
      Alert.error("Error", err.msg);
      console.log("Err : ", err);
    });

  });

  $scope.edition = function () {
    if($scope.edit){
      if($scope.agent.username && $scope.agent.email && $scope.agent.password && $scope.agent.confirm){
        if($scope.agent.password == $scope.agent.confirm){
          var Agent = Restangular.one('users', $localStorage.user.userId);
          Agent.username = $scope.agent.username;
          Agent.email = $scope.agent.email;
          Agent.phone = $scope.agent.phone;
          Agent.password = $scope.agent.password;
          Agent.confirm = $scope.agent.confirm;
          Agent.put().then(function (data) {
            $scope.agent = data;
            $scope.edit = false;
          }, function (err) {
            Alert.error("Error", err.msg);
            console.log("Err : ", err);
          });
        }
        else{
          Alert.error("Error", "Passwords must coincide");
        }
      }
      else{
        Alert.error("Error", "Fill all parameters");
      }
    }
    else{
      $scope.edit = true;
    }
  }

});

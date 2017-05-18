/**
 * Created by admin on 30/03/2017.
 */
Abuy.controller('RetraitCtrl', function($scope, Restangular, $localStorage, Alert) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});


  console.log('Retrait controller');
  $scope.data = {};

  $scope.callbackMethod = function (query, isInitializing) {
    //return [query];
    console.log("Query : ", query);
    var Providers = Restangular.all("providers");
    if(query != ""){
      return Providers.getList({
        'filter[where][name][regexp]': '/' + query + '/',
        'filter[limit]': 10
      });
    }
    else{
      return Providers.getList({
        'filter[limit]': 10
      });
    }

  };

  $scope.withdrawal = function () {
    console.log("Datas : ", $scope.data);
    if($scope.data.amount && $scope.data.phone && $scope.data.provider){
      var User = Restangular.one('users');
      User.get({'filter[where][phone]': $scope.data.phone}).then(function (user) {
        if(user.length == 0){
          Alert.error("Error", "User not found");
        }
        else{
          console.log('user : ', user);
          $scope.data.provider.all('accounts').getList({'filter[where][userId]': user[0].id}).then(function (account) {

            if(account.length == 0){
              Alert.error("Error", $scope.data.provider.name + " account not found");
            }
            else{
              console.log(account);
              var Retrait = Restangular.one('withdrawals');
              Retrait.amount = $scope.data.amount;
              Retrait.clientId = user[0].id;
              Retrait.state = "pending";
              Retrait.agentId = $localStorage.user.userId;
              Retrait.accountId = account[0].id;
              Retrait.createdAt = new Date();
              Retrait.modified = new Date();
              Retrait.post().then(function (withdrawal) {
                console.log(' withdrawal ', withdrawal);
                Alert.error("Success", "Withdrawal of " + withdrawal.amount + " to " + user[0].phone + " pending...");
              }, function (err) {
                Alert.error("Error", err.msg);
              })
            }
          }, function (err) {
            Alert.error("Error", err.msg);
          });
        }
      }, function (err) {
        Alert.error("Error", err.msg);
      });
    }
    else{
      Alert.error("Error", "Fill correctly the form!");
    }

  };

});

/**
 * Created by admin on 31/03/2017.
 */
Abuy.controller('RechargeCtrl', function ($scope, Restangular, $localStorage, Alert) {

  console.log('Recharge controller');
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

  $scope.refill = function () {
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
              var Refill = Restangular.one('refills');
              Refill.amount = $scope.data.amount;
              Refill.maker = "agent";
              Refill.state = "pending";
              Refill.userId = $localStorage.user.userId;
              Refill.accountId = account[0].id;
              Refill.createdAt = new Date();
              Refill.post().then(function (refill) {
                console.log(' refill ', refill);
                Alert.error("Success", "Refill of " + refill.data.amount + " to " + user[0].phone + " successfully done");
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

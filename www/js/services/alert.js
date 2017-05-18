/**
 * Created by admin on 13/04/2017.
 */
Abuy.factory('Alert', function ($ionicPopup) {

  return {
    error: function (title, message, cb) {
      var myTitle = title || "Error";
      var myMessage = message || "An error occured";
      var alertPopup = $ionicPopup.alert({
        title: myTitle,
        template: myMessage
      });

      alertPopup.then(function(result) {
        if(cb){
          if (typeof cb == "function") {
            cb(result);
          }
        }
      });
    }
  };

});

/**
 * Created by admin on 22/02/2017.
 */
Abuy.factory('LoadingInterceptor',['$timeout','$injector', '$q',function($timeout, $injector, $q) {

  var requestInitiated;

  function showLoadingText() {
    $injector.get("$ionicLoading").show({
      template: 'Chargement...',
      animation: 'fade-in',
      showBackdrop: true
    });
  }

  function hideLoadingText(){
    $injector.get("$ionicLoading").hide();
  }

  return {
    request : function(config) {
      requestInitiated = true;
      showLoadingText();
      //console.log('Request Initiated with interceptor');
      //console.log(config);
      return config;
    },
    response : function(response) {
      requestInitiated = false;

      // Show delay of 300ms so the popup will not appear for multiple http request
      $timeout(function() {

        if(requestInitiated) return;
        hideLoadingText();
        //console.log('Response received with interceptor');

      },300);

      return response;
    },
    requestError : function (err) {
      hideLoadingText();
      //console.log('Request Error logging via interceptor');
      return err;
    },
    responseError : function (err) {
      hideLoadingText();
      //console.log('Response error via interceptor');
      return $q.reject(err);
    }
  }
}]);

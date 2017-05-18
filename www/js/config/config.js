/**
 * Created by admin on 30/03/2017.
 */
Abuy
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('LoadingInterceptor');
  })
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('InterceptorFactory');
    //$httpProvider.defaults.useXDomain = true;
    //delete  $httpProvider.defaults.headers.common['X-Requested-With'];
  }])
  .config(function ($ionicCloudProvider) {

    $ionicCloudProvider.init({
      "core": {
        "app_id": "8728b145"
      }
    });

  })
  .config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('http://192.168.0.105:3000/api/');



  });

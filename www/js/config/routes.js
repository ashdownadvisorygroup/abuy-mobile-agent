/**
 * Created by admin on 30/03/2017.
 */
Abuy.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


    .state('signin', {
      url: '/signin',
      templateUrl: 'templates/signin.html',
      controller: 'SigninCtrl'
    })
  // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:

    .state('tab.home', {
      url: '/home',
      views: {
        'tab-home': {
          templateUrl: 'templates/tab-home.html',
          controller: 'HomeCtrl'
        }
      }
    })

    .state('tab.retrait', {
      url: '/retrait',
      views: {
        'tab-retrait': {
          templateUrl: 'templates/tab-retrait.html',
          controller: 'RetraitCtrl'
        }
      }
    })

    .state('tab.recharge', {
      url: '/recharge',
      views: {
        'tab-recharge': {
          templateUrl: 'templates/tab-recharge.html',
          controller: 'RechargeCtrl'
        }
      }
    })

    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('signin');

});

import authInterceptor from './auth.interceptor'

function AppConfig($httpProvider, $stateProvider, $locationProvider, $urlRouterProvider, toastrConfig) {
  'ngInject';

  /* $httpProvider.interceptors.push(authInterceptor); */

  /*
    If you don't want hashbang routing, uncomment this line.
    Our tutorial will be using hashbang routing though :)
  */
  // $locationProvider.html5Mode(true);

  $stateProvider
  .state('app', {
    abstract: true,
    templateUrl: 'layout/app-view.html',
    resolve: {
      auth: function (User, JWT, $rootScope) {
        /* console.log("tokennnnn", JWT.decodeToken()); */
        console.log("appconfig 20",User.verifyAuth()); 
        JWT.decodeToken().then(function(data){
          console.log("$data", data);
          $rootScope.user=data;
          $rootScope.yo = "data";
          console.log("$rootScope", $rootScope.user);
        })
        
        
        return User.verifyAuth();
        /* console.log($rootScope.user);*/
      }
    }
  });

  angular.extend(toastrConfig, {
    autoDismiss: false,
    containerId: 'toast-container',
    maxOpened: 0,
    newestOnTop: true,
    positionClass: 'toast-top-right',
    preventDuplicates: false,
    preventOpenDuplicates: false,
    target: 'body'
  });

  $urlRouterProvider.otherwise('/');

}

export default AppConfig;
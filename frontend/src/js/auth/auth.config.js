function AuthConfig($stateProvider, $httpProvider) {
  'ngInject';

  $stateProvider

  .state('app.sociallogin', {
    url: '/sociallogin',
    controller: 'SocialCtrl as $ctrl',
    title: 'social login',
    resolve: {
      auth: function (User) {
        console.log("esta en ", User);
        return User.ensureAuthIs(false);
      }
    }
  })

  .state('app.login', {
    url: '/login',
    controller: 'AuthCtrl as $ctrl',
    templateUrl: 'auth/auth.html',
    title: 'Sign in',
    resolve: {
      auth: function(User) {
        console.log("444")
        return User.ensureAuthIs(false);
      }
    }
  })

  .state('app.register', {
    url: '/register',
    controller: 'AuthCtrl as $ctrl',
    templateUrl: 'auth/auth.html',
    title: 'Sign up',
    resolve: {
      auth: function(User) {
        /* alert("poporegisterpoop"); */
        return User.ensureAuthIs(false);
      }
    }
  })

  ;

};

export default AuthConfig;

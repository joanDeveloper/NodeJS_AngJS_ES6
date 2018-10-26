function StripeConfig($stateProvider) {
    'ngInject';
  
    $stateProvider
    .state('app.stripe', {
      url: '/stripe/:token:price:plan',
      controller: 'Ctrl',
      controllerAs: '$ctrl',
     // templateUrl: 'home/home.html',
      title: 'Stripe',
      resolve: {
        stripe: function (TestService, $state, $stateParams) {
          console.log($stateParams);
          return TestService.stripe($stateParams).then(
            stripe => stripe, 
            err => $state.go("app.home"));
        return { hola: $stateParams, h: "2" };

        }
      }
    })

    .state('app.stripeSuccess', {
        url: '/event_stripe/:stripe',
        controller: 'StripeCtrl as $ctrl',
        title: 'Stripes',
        resolve: {
            stripeBuy: function (TestService, $state, $stateParams) {
              console.log("hi; "+$stateParams);
             
              return { hola: $stateParams, h: "2" };
    
            }
          }
      });
  
  };
  
  export default StripeConfig;
  
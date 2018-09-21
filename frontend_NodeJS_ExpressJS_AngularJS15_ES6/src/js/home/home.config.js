function HomeConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.home', {
    url: '/',
    controller: 'HomeCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'home/home.html',
    title: 'Home',
    resolve: {
      categories: function (TestService, $state, $stateParams) {
        /* TestService.getAll().then(function (response) {
          console.log(response)
        }); */
        return TestService.getAll().then(
          (categories) => categories,
          (err) => $state.go('app.home')
        )
      }
    }
  });

};

export default HomeConfig;

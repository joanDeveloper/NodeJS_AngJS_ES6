function ListDetailsConfig($stateProvider) {
  "ngInject";

  $stateProvider.state("app.listDetails", {
    url: "/listDetails/:slug",
    controller: "ListDetailsCtrl",
    controllerAs: "$ctrl",
    templateUrl: "listDetails/listDetails.html",
    title: "ListDetails",
    resolve: {
      tests: function ($state, $stateParams, TestService) {
        console.log($stateParams.slug);
        /* debugger */
        return TestService.getTestsOfOneCategory($stateParams.slug).then(
          tests => tests, 
          err => $state.go("app.home"));
        return { hola: $stateParams.slug, h: "2" };
      }
      
    }
  });
};

export default ListDetailsConfig;

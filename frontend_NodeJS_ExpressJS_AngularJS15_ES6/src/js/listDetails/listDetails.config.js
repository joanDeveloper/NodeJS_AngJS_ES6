function ListDetailsConfig($stateProvider) {
  "ngInject";

  $stateProvider.state("app.listDetails", {
    url: "/listDetails/:id",
    controller: "ListDetailsCtrl",
    controllerAs: "$ctrl",
    templateUrl: "listDetails/listDetails.html",
    title: "ListDetails",
    resolve: {
      tests: function ($state, $stateParams, TestService) {
        console.log($stateParams.id);
        /* debugger */
        return TestService.getTestsOfOneCategory($stateParams.id).then(
          tests => tests, 
          err => $state.go("app.home"));
        return { hola: $stateParams.id, h: "2" };
      }
    }
  });
};

export default ListDetailsConfig;

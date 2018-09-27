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
        TestService.getTestsOfOneCategory();
        return { hola: $stateParams.id, h: "2" };
      }
    }
  });
};

export default ListDetailsConfig;

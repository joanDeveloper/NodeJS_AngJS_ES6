function ListDetailsConfig($stateProvider) {
  "ngInject";

  $stateProvider.state("app.testDetails", {
    url: "/testDetails/:id",
    controller: "TestDetailsCtrl",
    controllerAs: "$ctrl",
    templateUrl: "testDetails/testDetails.html",
    title: "TestDetails",
    resolve: {
      tests: function($state, $stateParams, TestService) {
        console.log($stateParams.id);
        /* debugger */
        TestService.getTestsOfOneCategory();
        return { hola: $stateParams.id, h: "2" };
      }
    }
  });
};

export default ListDetailsConfig;

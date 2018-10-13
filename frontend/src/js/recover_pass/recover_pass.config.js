function Recover_passConfig($stateProvider) {
  "ngInject";

  $stateProvider.state("app.recover_pass", {
    url: "/recover_pass:id",
    controller: "Recover_passCtrl",
    controllerAs: "$ctrl",
    templateUrl: "recover_pass/recover_pass.html",
    title: "Recover_pass",
    resolve: {
      tipo: function( $state, $stateParams) {
        console.log("parametro rp:   ",$stateParams.id);
        return $stateParams.id;
      }
    }
  });
};

export default Recover_passConfig;

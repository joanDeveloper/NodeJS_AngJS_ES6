class ListDetailsCtrl {
  constructor(AppConstants, $scope, tests, $state) {
    "ngInject";
    //console.log("llega aquiiiii",tests.test)
    this.appName = AppConstants.appName;
    this._$scope = $scope;
    this.u = tests.test;

    $scope.openTest = function(id_) {
      console.log("id_test: "+id_);
      //enviar al backend para comprobar si esta registrado
      
      $state.go("app.listProd", { id: id_ });
    };



  }
}

export default ListDetailsCtrl;

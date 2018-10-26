class ListDetailsCtrl {
  constructor(AppConstants, $scope, tests, $state, TestService, Toaster) {
    "ngInject";
    //console.log("llega aquiiiii",tests.test)
    this.appName = AppConstants.appName;
    this._$scope = $scope;
    this.u = tests.test;
    this._Toaster = Toaster;

    $scope.openTest = function(id_) {
      console.log("id_test: "+id_);
      //enviar al backend para comprobar si esta registrado
      TestService.checkUser().then(function(res){
        console.log("check: ", JSON.stringify(res));
        let stringify = JSON.stringify(res);
        let json = JSON.parse(stringify);
        if (json.type_plan=="Plan Basic" || json.type_plan=="Plan Intermediate" || json.type_plan=="Plan Expert") {
          $state.go("app.listProd", { id: id_ });
        }else{
          Toaster.showToaster(
            "error",
            "Lo sentimos, tienes que tener comprado uno de los planes para poder disfrutar del test"
          );
        }
      })  
     
    };

  }
}

export default ListDetailsCtrl;

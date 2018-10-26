class ListDetailsCtrl {
  constructor(AppConstants, $scope, tests, $state, TestService, Toaster) {
    "ngInject";
    //console.log("llega aquiiiii",tests.test)
    this.appName = AppConstants.appName;
    this._$scope = $scope;
    this.u = tests.test;
    this._Toaster = Toaster;
    console.log("lenght: ", this.u.length);

    $scope.loadTest = [this.u[0],this.u[1]];
    console.log("arr:",$scope.loadTest);
    let cont=0,contG=0,g=7,t=2;
    $scope.getMore = function() {
      cont++;
      if(cont>1){
        g = parseInt(contG + 8);
        t = parseInt(contG + 4);
       
      }
    
      for(var i = t; i <= g; i++) {
        console.log("i:", i);
        contG++;
        console.log(tests.test[i]);
        $scope.loadTest.push(tests.test[i]);

      }
      
    };

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
            "Lo sentimos, tienes estar registrado y que tener comprado uno de los planes"
          );
        }
      })  
     
    };

  }
}

export default ListDetailsCtrl;

class ListDetailsCtrl {
  constructor(AppConstants, $scope, tests) {
    "ngInject";
    console.log("llega aquiiiii",tests)
    this.appName = AppConstants.appName;
    this._$scope = $scope;
    this.u = tests[0];
  }
}

export default ListDetailsCtrl;

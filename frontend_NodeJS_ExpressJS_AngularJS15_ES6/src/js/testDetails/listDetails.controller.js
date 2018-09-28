class TestDetailsCtrl {
  constructor(AppConstants, $scope, test) {
    "ngInject";
    console.log("llega aquiiiii",test)
    this.appName = AppConstants.appName;
    this._$scope = $scope;
  }
}

export default TestDetailsCtrl;

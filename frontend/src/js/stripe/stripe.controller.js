class StripeCtrl {
    constructor(AppConstants, $scope, stripeBuy, Toaster, $state) {
      "ngInject";
      console.log("llega aquiiiii stripe", stripeBuy)
      this.appName = AppConstants.appName;
      this._$scope = $scope;
      this._state = $state;

      Toaster.showToaster(
        "success",
        "Compra realizada correctamente"
      );

      this._state.go("app.home");
    }
  }
  
  export default StripeCtrl;
  
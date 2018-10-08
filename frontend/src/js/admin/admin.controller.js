class AdminCtrl {
  constructor(NgMap, datosUsers, AppConstants, $scope,  $stateParams, $state, auth, JWT) {
    "ngInject";
    this._Users = datosUsers.data.users.users;
    console.log("ctr admin", this._Users);
    
    var vm = this;
    var map;
    NgMap.getMap().then(function (mapi) {
      map = mapi;
    });

    $scope.showDetailsOnMap = function (e, eventItem) {
      console.log("eeeeeee", e);
      console.log("eventItem", eventItem);
      console.log("eventItem", eventItem._id);
      this._info = eventItem;
      $scope.info = eventItem;
      console.log("scope.info", $scope.info);
      /* $scope.selectedService = eventItem.id; */
      map.showInfoWindow("myInfoWindows", this);
    };

    $scope.p = function () {
      console.log("this._info", this._info);
      
    };
    /* $scope.showDetailsOnMap = function (e, eventItem) {
      console.log("eeeeeee", e);
      console.log("eventItem", eventItem);
      
      vm.eventItem = eventItem;
      vm.map.showInfoWindow('myInfoWindows', eventItem.id);
    }; */
    
  }
}

  export default AdminCtrl;

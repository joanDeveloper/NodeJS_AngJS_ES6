class AdminCtrl {
  constructor(NgMap, AppConstants, $scope, categories, $stateParams, $state, auth, JWT) {
    "ngInject";
    
    var vm = this;
    NgMap.getMap().then(function (map) {
      vm.map = map;
    });
  
  }
}

  export default AdminCtrl;

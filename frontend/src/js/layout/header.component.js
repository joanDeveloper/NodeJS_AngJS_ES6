class AppHeaderCtrl {
  constructor(AppConstants, User, $scope, $rootScope, JWT) {
    'ngInject';

    this._JWT = JWT;
    var vm=this;
    $scope.$watch('User.current', (newUser) => {
      console.log("newUser header component", newUser);
      vm.user = newUser;
      if (vm.user != null) {
        if (vm.user.media == "https://robohash.org/") {
          vm.user.media = vm.user.media + vm.user.name;
        }
      }
      
    })
    this.logout = User.logout.bind(User);
  }
  
}

let AppHeader = {
  controller: AppHeaderCtrl,
  templateUrl: 'layout/header.html'
};

export default AppHeader;

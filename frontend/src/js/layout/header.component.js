class AppHeaderCtrl {
  constructor(AppConstants, User, $scope, $rootScope, JWT) {
    'ngInject';

    this._JWT = JWT;
    var vm=this;
    $scope.$watch('User.current', (newUser) => {
      console.log("newUser header component", newUser);
      vm.user = newUser;
      if (vm.user != null) {
        //vm.user.show = false;
        if (vm.user.media === "https://robohash.org/") {
          vm.user.media = vm.user.media + vm.user.name;
        }else{
          vm.user.media = "./images/"+vm.user.media;
        }
        if(vm.user.type==1 || vm.user.type_user==1){
          console.log("el tio es admin");
          //vm.user.show = true;
          vm.user.type = vm.user.type;
          vm.user.type_user = vm.user.type_user;

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

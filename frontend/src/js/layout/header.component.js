class AppHeaderCtrl {
  constructor(AppConstants, User, $scope, $rootScope, JWT) {
    'ngInject';

    /* this.__currentUser = User.current; */
    this._JWT = JWT;
    var vm=this;
    
    /* console.log("this.currentUser", this.__currentUser); */
    $scope.$watch('User.current', (newUser) => {
      console.log("newUser header component", newUser);
      vm.user = newUser;
      if (vm.user != null) {
        if (vm.user.media == "https://robohash.org/") {
          vm.user.media = vm.user.media + vm.user.name;
        }
      }
      /* vm._JWT.decodeToken().then(
        (res) => { 
          vm.currentUser = res;
          vm.user = res;
          console.log("-------user-----", res );
        }) */
    })
    
    this.logout = User.logout.bind(User);

   /*  if (this.currentUser) {
      $scope.avatarUrl = function () {
        if (vm.currentUser.image == "" || vm.currentUser.image == null) {
          return 'http://robohash.org/' + vm.currentUser.username + '?set=set2&bgset=bg2&size=70x70';
        } else {
          return vm.currentUser.image;
        }
      };
    } */
  }
  
}

let AppHeader = {
  controller: AppHeaderCtrl,
  templateUrl: 'layout/header.html'
};

export default AppHeader;

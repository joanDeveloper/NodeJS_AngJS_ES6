class AppHeaderCtrl {
  constructor(AppConstants, User, $scope, $rootScope, JWT) {
    'ngInject';

    this.appName = AppConstants.appName;
    this.currentUser = User.current;
    this.user = $rootScope.user;
    this._JWT = JWT;
    var vm=this;

    $rootScope.p="salami";
    console.log("compon he", this.currentUser);
    console.log("$rootScope.user", $rootScope.user);
    
    $scope.$watch('User.current', (newUser) => {
      vm._JWT.decodeToken().then(
        (res) => { 
          
          vm.currentUser = res;
          vm.user = res;
          console.log("ddddd", res );
        })
    })


    

    var vm = this;


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
  
  leerImagen() {
    console.log("knknknknknknknnnnnnnnnnnnnnnnnnnnnn")
  }
}

let AppHeader = {
  controller: AppHeaderCtrl,
  templateUrl: 'layout/header.html'
};

export default AppHeader;

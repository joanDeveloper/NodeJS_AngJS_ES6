class AppHeaderCtrl {
  constructor(AppConstants, User, $scope, $rootScope) {
    'ngInject';

    this.appName = AppConstants.appName;
    this.currentUser = User.current;
    this.user = $rootScope.user;
    console.log("compon he", this.user);
    $scope.$watch('User.current', (newUser) => {
      this.currentUser = newUser;
    })



    var vm = this;


    this.logout = User.logout.bind(User);

    if (this.currentUser) {
      $scope.avatarUrl = function () {
        if (vm.currentUser.image == "" || vm.currentUser.image == null) {
          return 'http://robohash.org/' + vm.currentUser.username + '?set=set2&bgset=bg2&size=70x70';
        } else {
          return vm.currentUser.image;
        }
      };
    }
  }
}

let AppHeader = {
  controller: AppHeaderCtrl,
  templateUrl: 'layout/header.html'
};

export default AppHeader;

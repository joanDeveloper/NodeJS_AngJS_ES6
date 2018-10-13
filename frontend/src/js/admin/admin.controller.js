class AdminCtrl {
  constructor(NgMap, datosUsers, AppConstants, $scope, $timeout,  $stateParams, $state, auth, JWT) {
    "ngInject";
    /* this._Users = datosUsers.data.users.users; */
    console.log("00000000000000000000000", datosUsers);
    this._Users = datosUsers.data.users.users.map(function(us, key) {
      if (us.media == "https://robohash.org/") {
        us.media = us.media + us.name;
      }
      return us;
    });
    console.log("00000000000000000000000", this._Users);
    
    var vm = this;
    var map;
    NgMap.getMap().then(function (mapi) {
      map = mapi;
    });


    $scope.showDetailsOnMap = function (e, eventItem) {
      this._info = eventItem;
      $scope.info = eventItem;
      map.showInfoWindow("myInfoWindows", this);
    };

    this.hero = {
      bg: {},
      info: {
        title: "Administracion",
        subtitle: "Gestion de Usuarios de forma facil y eficaz",
      }
    };
    this.page_1 = { title: "Lorem ipsum dolor", subtitle: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque eius, officia velit animi veritatis assumenda quasi ipsam, quam ab illo sint obcaecati temporibus repellendus natus amet eaque rerum sequi inventore?" };
    
    $scope.fileUsuarios = this._Users;
    $scope.current_grid = 1;
    $scope.data_limit = 3;
    $scope.filter_data = $scope.fileUsuarios.length;
    $scope.entire_user = $scope.fileUsuarios.length;
    $scope.maxSize = 5;
    $scope.bigTotalItems = 4;

    $scope.page_position = function (page_number) {
      console.log(page_number);
      $scope.current_grid = page_number;
    };
    $scope.currentPage = 4;

    $scope.pageChanged = function () {
      console.log("Page changed to: " + $scope.current_grid);
    };

    $scope.filter = function () {
      $timeout(function () {
        $scope.filter_data = $scope.searched.length;
        console.log($scope.searched);
        console.log($scope.search);
      }, 20);
    };

    $scope.beginning_data2 = function() {
      return function (input, begin) {
        /*console.log(input);
        console.log(begin);*/
        if (input) {
          // console.log("yeeeeee");
          begin = +begin;
          return input.slice(begin);
        }
        return [];
      }
    };

    $scope.sort_with = function (base) {
      $scope.base = base;
      $scope.reverse = !$scope.reverse;
    };
    
  }
}

  export default AdminCtrl;

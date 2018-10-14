class AdminCtrl {
  constructor(NgMap, $uibModal, Admin, datosUsers, AppConstants, $scope, $q, Toaster, $timeout, $stateParams, $state, auth, JWT, $rootScope) {
    "ngInject";
    /* this._Users = datosUsers.data.users.users; */
    /* console.log("00000000000000000000000", datosUsers); */
    $scope.radioModel = 'No';
    this._rootScope = $rootScope;
    this._uibModal = $uibModal;
    this._Admin = Admin;
    $scope.lockUser = function (radioModel, user) {
      let el1 = document.getElementById(`No${user._id}`);
      let el2 = document.getElementById(`Yes${user._id}`);
      let el = document.getElementById(`${radioModel}${user._id}`);
      el2.setAttribute("class", "btn btn-default");
      el1.setAttribute("class", "btn btn-default");
      el.setAttribute("class", "btn btn-primary");
      let lockAd = radioModel;
      if (lockAd=="Yes") {
        lockAd=1;
      }else{
        lockAd = 0;
      }
      
      Admin.lockUser(user.email, lockAd).then(res => {
        Toaster.showToaster(
          "success",
          `Has cambiado el estado del usuario ${user.name}`
        );
      }, err => {
        Toaster.showToaster("error", `Error en el cambio de estado del usuario ${user.name}`);
      });
    }

    this._Users = datosUsers.data.users.users.map(function(us, key) {
      if (us.media == "https://robohash.org/") {
        us.media = us.media + us.name;
      }
      if (us.lock == 1) {
        us.lockClassYes = "btn btn-primary";
        us.lockClassNo = "btn btn-default";
      }else{
        us.lockClassYes = "btn btn-default";
        us.lockClassNo = "btn btn-primary";
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
    
  }/*-------------------END CONSTRUCTOR------------- */
  
  operacion(){
    this._rootScope.swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        swal(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

}

  export default AdminCtrl;

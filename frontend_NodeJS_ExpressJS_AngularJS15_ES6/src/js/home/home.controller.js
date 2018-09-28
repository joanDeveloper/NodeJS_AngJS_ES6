class HomeCtrl {
  constructor(NgMap, AppConstants, $scope, categories, $stateParams, $state) {
    "ngInject";

    this.appName = AppConstants.appName;
    this._$scope = $scope;
    this.categories = categories.category;

    this.css = {
      "background-color": "red"
    };
    this.hero = {
      bg: {
        /* 
        "background": "red", */
      },
      info: {
        title: "algun titulo",
        subtitle: "algun subtitle"
      }
    };
    console.log(this.categories);

    var vm = this;
    NgMap.getMap().then(function(map) {
      vm.map = map;
    });

    $scope.openCategory = function() {
      $state.go("app.listDetails", { id: "5ba257bf2e7034041b5d35e1" });
    };
    // if ("geolocation" in navigator) {
    //   // check if geolocation is supported/enabled on current browser
    //   navigator.geolocation.getCurrentPosition(
    //     function success(position) {
    //       // para cuando obtener la ubicación es un éxito
    //       console.log('latitude', position.coords.latitude,
    //         'longitude', position.coords.longitude);
    //     },

    //     function error(error_message) {
    //       // for when getting location results in an error
    //       console.error('An error has occured while retrieving location', error_message)
    //     }

    //   )
    // };
    // Get list of all tags
    /* Tags
      .getAll()
      .then(
        (tags) => {
          this.tagsLoaded = true;
          this.tags = tags
        }
      );

    // Set current list to either feed or all, depending on auth status.
    this.listConfig = {
      type: User.current ? 'feed' : 'all'
    }; */
  }

  changeList(newList) {
    this._$scope.$broadcast("setListTo", newList);
  }
}

export default HomeCtrl;

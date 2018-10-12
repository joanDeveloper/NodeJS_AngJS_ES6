class HomeCtrl {
  constructor(NgMap, AppConstants, $scope, categories, $stateParams, $state, auth, JWT) {
    "ngInject";
    console.log("hom ctr l4",auth)  
    this.appName = AppConstants.appName;
    this._$scope = $scope;
    this.categories = categories.category;
    console.log("hom ctr l8",this.current)
    this.css = {
      "background-color": "red"
    };

    
   
    this.page_1 = { title: "Lorem ipsum dolor", subtitle: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque eius, officia velit animi veritatis assumenda quasi ipsam, quam ab illo sint obcaecati temporibus repellendus natus amet eaque rerum sequi inventore?" };
    
    this.hero = {
      bg: {
        /* 
        "background": "red", */
      },
      info: {
        title: "Cognitive Brain",
        subtitle: "Le ayudamos a mantenerte la mente sana",
        /*slides : [
          {
            title: "1 title",
            image: 'http://lorempixel.com/560/400/sports/1', 
          },
          {
            title: "2 title",
            image: 'http://lorempixel.com/560/400/sports/2', 
          },
          {
            title: "3 title",
            image: 'http://lorempixel.com/560/400/sports/3', 
          },
          {
            title: "4 title",
            image: 'http://lorempixel.com/560/400/sports/4',
          },
          {
            title: "5 title",
            image: 'http://lorempixel.com/560/400/sports/5', 
          },
        ]*/
      }
    };
    console.log(this.categories);
/* 
    var vm = this;
    NgMap.getMap().then(function(map) {
      vm.map = map;
    }); */

    $scope.openCategory = function() {
      console.log( JWT.decodeToken());
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

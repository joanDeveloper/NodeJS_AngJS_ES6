class HomeCtrl {
  constructor(NgMap, Messages, AppConstants, User, $scope, categories, $stateParams, $state, auth, JWT) {
    "ngInject";

    Messages.user({ id: "support-agent", name: "Support Agent" });
    console.log("Messages", Messages.user);

    this.appName = AppConstants.appName;
    this._$scope = $scope;
    this.categories = categories.category;
    this.css = {
      "background-color": "red"
    };
    console.log(User.current);
    
    this.page_1 = { title: "Lorem ipsum dolor", subtitle: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque eius, officia velit animi veritatis assumenda quasi ipsam, quam ab illo sint obcaecati temporibus repellendus natus amet eaque rerum sequi inventore?" };
    
    this.hero = {
      bg: {
        /* 
        "background": "red", */
      },
      info: {
        title: "Cognitive Brain",
        subtitle: "Le ayudamos a mantenerte la mente sana"
      }
    };
    console.log(this.categories);

    $scope.openCategory = function() {
      console.log( JWT.decodeToken());
    };

  }

  changeList(newList) {
    this._$scope.$broadcast("setListTo", newList);
  }
}

export default HomeCtrl;

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
        subtitle: "Le ayudamos a mantenerte la mente sana"
      }
    };
    console.log(this.categories);

    $scope.openCategory = function() {
      console.log( JWT.decodeToken());
    };

    
    /*************** Stripe *************/
    var handler = StripeCheckout.configure({
      key: 'pk_test_nfZNnLw26rO7n0KpqjlVxlLv',
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: function(token) {
        console.log(token);
        let plan = localStorage.getItem("Plan");
        let price = localStorage.getItem("price");
        $state.go("app.stripe", { 
          token: token.id, 
          price:price, 
          plan: plan
        });
      }
    });
      
      document.getElementById('btnStripe').addEventListener('click', function(e) {
        localStorage.removeItem("Plan");
        localStorage.removeItem("price");
        localStorage.setItem('Plan', 'Plan Basic');
        localStorage.setItem('price', 2000);
        handler.open({
          name: 'Cognitive Brain',
          description: 'Plan Basic',
          currency: 'eur',
          amount: 2000
        });
        e.preventDefault();
      });
      
      // Close Checkout on page navigation:
      window.addEventListener('popstate', function() {
        handler.close();
      });
  }

  changeList(newList) {
    this._$scope.$broadcast("setListTo", newList);
  }
}

export default HomeCtrl;

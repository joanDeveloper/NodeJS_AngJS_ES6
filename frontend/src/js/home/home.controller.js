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
    
    /* Plan Basic */
    document.getElementById('btnStripeBa').addEventListener('click', function(e) {
      console.log("entra en plan basic");
        /*localStorage.removeItem("Plan");
        localStorage.removeItem("price");
        localStorage.setItem('Plan', 'Plan Basic');
        localStorage.setItem('price', 2000);*/
        handler.open({
          name: 'Cognitive Brain',
          description: 'Plan Basic',
          currency: 'eur',
          amount: 2000
        });
        e.preventDefault();
      });
      
      /* Plan Intermediate */
      document.getElementById('btnStripeInt').addEventListener('click', function(e) {
        console.log("entra en plan int");
        /*localStorage.removeItem("Plan");
        localStorage.removeItem("price");
        localStorage.setItem('Plan', 'Plan Intermediate');
        localStorage.setItem('price', 3500);*/
        handler.open({
          name: 'Cognitive Brain',
          description: 'Plan Intermediate',
          currency: 'eur',
          amount: 3500
        });
        e.preventDefault();
      });

      /* Plan Expert */
      document.getElementById('btnStripeEx').addEventListener('click', function(e) {
        console.log("entra en plan expert");
        /*localStorage.removeItem("Plan");
        localStorage.removeItem("price");
        localStorage.setItem('Plan', 'Plan Expert');
        localStorage.setItem('price', 5000);*/
        handler.open({
          name: 'Cognitive Brain',
          description: 'Plan Expert',
          currency: 'eur',
          amount: 5000
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

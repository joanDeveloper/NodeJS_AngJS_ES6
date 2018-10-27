class PlanCtrl {
  constructor($state, $scope) {
    "ngInject";
    this._$state = $state;

    console.log("entra en plan component");
    
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
    
    /* function to handler Stripe */
    function handlerr(handler, name, description, currency, price){
      handler.open({
        name: name,
        description: description,
        currency: currency,
        amount: price
      });
      
    }
    /* Plan Basic */
    document.getElementById('btnStripeBa').addEventListener('click', function(e) {
      console.log("entra en plan basicss");
        localStorage.removeItem("Plan");
        localStorage.removeItem("price");
        localStorage.setItem('Plan', 'Plan Basic');
        localStorage.setItem('price', 2000);
        handlerr(handler,'Cognitive Brain','Plan Basic','eur',2000);
        e.preventDefault();

      });
      
      /* Plan Intermediate */
      document.getElementById('btnStripeInt').addEventListener('click', function(e) {
        console.log("entra en plan int");
        localStorage.removeItem("Plan");
        localStorage.removeItem("price");
        localStorage.setItem('Plan', 'Plan Intermediate');
        localStorage.setItem('price', 3500);
        handlerr(handler,'Cognitive Brain','Plan Intermediate','eur',3500);
        e.preventDefault();
      });

      /* Plan Expert */
      document.getElementById('btnStripeEx').addEventListener('click', function(e) {
        console.log("entra en plan expert");
        localStorage.removeItem("Plan");
        localStorage.removeItem("price");
        localStorage.setItem('Plan', 'Plan Expert');
        localStorage.setItem('price', 5000);
        handlerr(handler,'Cognitive Brain','Plan Expert','eur',5000);
        e.preventDefault();
      });
      // Close Checkout on page navigation:
      window.addEventListener('popstate', function() {
        handler.close();
      });
  }
  
}

let PlanComponent = {
  bindings: {
    info: "="
  },
    controller: PlanCtrl,
  templateUrl: "components/Plan/plan.html"
};

export default PlanComponent;

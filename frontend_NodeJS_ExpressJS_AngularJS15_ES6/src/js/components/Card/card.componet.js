class CardCtrl {
  constructor($state, $scope) {
    "ngInject";
    this._$state = $state;
    
    
  }
    
    prueba () {
        console.log("yeeeeeeeeeeeee");
        /* this._$state.go('app.contact'); */
    }
}

let CardComponent = {
  bindings: {
    info: "="
  },
    controller: CardCtrl,
  templateUrl: "components/Card/card.html"
};

export default CardComponent;

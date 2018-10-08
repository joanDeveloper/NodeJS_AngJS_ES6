class CardCtrl {
  constructor($state, $scope) {
    "ngInject";
    this._$state = $state;
    
    $scope.openCategory = function(info) {
      console.log(info.slug); 
      $state.go("app.listDetails", { slug: info.slug });
    };
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

class CardCtrl {
  constructor($state, $scope) {
    "ngInject";
    this._$state = $state;
    
    $scope.openCategory = function(info) {
      /* console.log(info._id); */
      $state.go("app.listDetails", { id: info._id });
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

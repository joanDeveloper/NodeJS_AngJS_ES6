class CardCtrl {
  constructor($state, $scope) {
    "ngInject";
    this._$state = $state;
    
    
  }
    
    prueba (info) {
        /* console.log(info); */
        this._$state.go('app.contact');/*test/list/idcategoria/numero pagina*/
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

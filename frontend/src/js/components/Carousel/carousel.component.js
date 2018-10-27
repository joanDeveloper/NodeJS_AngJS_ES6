class CarouselCtrl {
  constructor($state, $scope) {
    "ngInject";
    this._$state = $state;
    
    $scope.myInterval = 5000;
    $scope.noWrapSlides = true;
    $scope.active = 0;
    let slides = $scope.slides = [];
    let currIndex = 0;

    $scope.addSlide = function() {
      slides.push({
        image: '../../images/cog'+currIndex+'.jpg',
        text:"Cognitive Brain - entrena su mente y gana vida",
        id: currIndex++
      });

    };

    [0,1,2,3,4].reduce(function(valorAnterior, valorActual, indice, vector){
      $scope.addSlide(indice);
    });

  }
  
}

let CarouselComponent = {
  bindings: {
    info: "="
  },
  controller: CarouselCtrl,
  templateUrl: "components/Carousel/carousel.html"
};

export default CarouselComponent;

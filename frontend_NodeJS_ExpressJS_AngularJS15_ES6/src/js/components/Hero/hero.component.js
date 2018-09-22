class HeroCtrl {
    constructor($state) {
        'ngInject';
        this._$state = $state;
    }
}

let heroComponent = {
    bindings: {
        info: '='
    },
    controller: HeroCtrl,
    templateUrl: 'components/Hero/hero.html'
};

export default heroComponent;

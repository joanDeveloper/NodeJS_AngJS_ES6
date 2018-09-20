function ListProdConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.listProd', {
            url: '/listProd',
            controller: 'ListProdCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'listProd/listProd.html',
            title: 'ListProd'
        });

};

export default ListProdConfig;

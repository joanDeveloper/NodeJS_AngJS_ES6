function ListProdConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.listProd', {
            url: '/listProd/:id',
            controller: 'ListProdCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'listProd/listProd.html',
            title: 'ListProd',
            resolve: {
                test: function ($state, $stateParams, TestService) {
                    console.log("entra");
                    console.log($stateParams.id);
                    /* debugger */
                    return TestService.getTestDetails($stateParams.id).then(
                        test => test, 
                        err => $state.go("app.home"));
                    return { hola: $stateParams.id, h: "2" };
                }
              }
        });

};

export default ListProdConfig;

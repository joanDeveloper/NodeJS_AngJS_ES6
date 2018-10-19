class ListProdCtrl {
    constructor(AppConstants, $scope, test) {
        'ngInject';
        //alert(test);
        let t = JSON.stringify(test);
        this.appName = AppConstants.appName;
        this._$scope = $scope;
       // console.log("detail: " + JSON.stringify(test));
        let g = JSON.parse(t);
        console.log("ee",g.test);
        this.detailTest = g.test;
    }

}

export default ListProdCtrl;

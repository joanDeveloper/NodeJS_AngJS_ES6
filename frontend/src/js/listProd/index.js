import angular from 'angular';

// Create the module where our functionality can attach to
let listProdModule = angular.module('app.listProd', []);

// Include our UI-Router config settings
import ListProdConfig from './listProd.config';
listProdModule.config(ListProdConfig);


// Controllers
import ListProdCtrl from './listProd.controller';
listProdModule.controller('ListProdCtrl', ListProdCtrl);


export default listProdModule;

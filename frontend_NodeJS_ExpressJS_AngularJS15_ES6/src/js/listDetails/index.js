import angular from 'angular';
/* import datepicker from 'angular-ui-bootstrap/src/alert'; */

// Create the module where our functionality can attach to
let listDetailsModule = angular.module("app.listDetails", []);

// Include our UI-Router config settings
import ListDetailsConfig from "./listDetails.config";
listDetailsModule.config(ListDetailsConfig);


// Controllers
import ListDetailsCtrl from "./listDetails.controller";
listDetailsModule.controller("ListDetailsCtrl", ListDetailsCtrl);


export default listDetailsModule;

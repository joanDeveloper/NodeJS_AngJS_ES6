import angular from 'angular';
/* import datepicker from 'angular-ui-bootstrap/src/alert'; */

// Create the module where our functionality can attach to
let testDetailsModule = angular.module("app.testDetails", []);

// Include our UI-Router config settings
import TestDetailsConfig from "./testDetails.config";
testDetailsModule.config(TestDetailsConfig);


// Controllers
import TestDetailsCtrl from "./testDetails.controller";
testDetailsModule.controller("TestDetailsCtrl", TestDetailsCtrl);


export default testDetailsModule;

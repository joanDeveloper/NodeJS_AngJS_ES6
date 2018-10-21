import angular from 'angular';
/* import datepicker from 'angular-ui-bootstrap/src/alert'; */

// Create the module where our functionality can attach to
let StripeModule = angular.module("app.stripe", []);

// Include our UI-Router config settings
import StripeConfig from "./stripe.config";
StripeModule.config(StripeConfig);


// Controllers
import StripeCtrl from "./stripe.controller";
StripeModule.controller("StripeCtrl", StripeCtrl);


export default StripeModule;

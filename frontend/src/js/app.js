/* successRedirect: "http://localhost:8082/#!/sociallogin", */
import angular from 'angular';
/* import swal from 'sweetalert2'; */
// Import our app config files
import constants  from './config/app.constants';
import appConfig  from './config/app.config';
import appRun     from './config/app.run';
/* import 'angular-bootstrap'; */
import 'angular-ui-bootstrap';
/* import 'angular-animate';
import 'angular-aria'; */
import 'angular-material';
/* import { ngMaterial } from "angular-material"; */
/* import ngMaterial from 'angular-material'; */
/* import angularMaterialize from 'materialize-css'; */
/* import "angular-base64"; */
import 'angular-ui-router';
import toastr from 'angular-toastr';
// Import our templates file (generated by Gulp)
import './config/app.templates';
// Import our app functionaity
import './layout';
import './components';
import './home';
import "./admin";
import "./stripe";
import "./recover_pass";;
import "./listDetails";
import './services';
import './contact';
import './listProd';
import 'ngmap';
import './auth';



// Create and bootstrap application
const requires = [
  "ui.router",
  /* "base64", */
  "ui.bootstrap",
  "ngMaterial",
  "templates",
  "app.layout",
  "app.recover_pass",
  "app.components",
  "app.home",
  "app.admin",
  "app.stripe",
  "app.listDetails",
  "app.services",
  "app.auth",
  "app.contact",
  "app.listProd",
  "ngMap",
  toastr
  
];

// Mount on window for testing
window.app = angular.module('app', requires);

angular.module('app').constant('AppConstants', constants);

angular.module('app').config(appConfig);

angular.module('app').run(appRun);

/* angular.module("app").factory("swal", swal); */

angular.bootstrap(document, ['app'], {
  strictDi: true
});




angular.module('app', ['ui.carousel']);
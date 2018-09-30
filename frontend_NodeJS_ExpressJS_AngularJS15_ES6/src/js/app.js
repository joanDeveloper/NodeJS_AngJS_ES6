import angular from 'angular';

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

import 'angular-ui-router';
import toastr from 'angular-toastr';
// Import our templates file (generated by Gulp)
import './config/app.templates';
// Import our app functionaity
import './layout';
import './components';
import './home';
import "./listDetails";
import './services';
import './contact';
import './listProd';
import 'ngmap';
import './auth';



// Create and bootstrap application
const requires = [
  "ui.router",
  "ui.bootstrap",
  "ngMaterial",
  "templates",
  "app.layout",
  "app.components",
  "app.home",
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

angular.bootstrap(document, ['app'], {
  strictDi: true
});

angular.module('app', ['ui.carousel']);

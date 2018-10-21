/* successRedirect: "http://localhost:8082/#!/sociallogin", */
import angular from 'angular';
/* import swal from 'sweetalert2'; */
// Import our app config files
import constants  from './config/app.constants';
import appConfig  from './config/app.config';
import appRun     from './config/app.run';
/* import 'angular-bootstrap'; */
import 'angular-ui-bootstrap';
import "angular-chat";
import "rltm";

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
import "./admin";
import "./stripe";
import "./recover_pass";;
import "./listDetails";
import './services';
import './contact';
import './listProd';
import 'ngmap';
import './auth';
import "./profile_user";
import "./user_chat";
import "./admin_chat";


// Create and bootstrap application
const requires = [
  "chat",
  "ui.router",
  "ui.bootstrap",
  "ngMaterial",
  "templates",
  "app.layout",
  "app.recover_pass",
  "app.components",
  "app.home",
  "app.admin",
<<<<<<< HEAD
  "app.stripe",
=======
  "app.profile_user",
>>>>>>> da1e3b73819ea991c9118a6c284751f898a6c1b8
  "app.listDetails",
  "app.services",
  "app.auth",
  "app.contact",
  "app.listProd",
  "app.user_chat",
  "app.admin_chat",
  "ngMap",
  toastr
];

// Mount on window for testing
window.app = angular.module('app', requires);

angular.module('app').constant('AppConstants', constants);
angular.module("chat").constant('config', {
  /* rltm: {
    service: "pubnub",
    config: {
      "publish-key": "pub-c-a18ba866-281a-4d97-a060-7ac4b0ebcdd6",
      "subscribe-key": "sub-c-dc8424e8-6439-11e8-b753-ce5efc28367f"
    }
  } */
  "pubnub": {
    "publish-key": "pub-c-a18ba866-281a-4d97-a060-7ac4b0ebcdd6",
    "subscribe-key": "sub-c-dc8424e8-6439-11e8-b753-ce5efc28367f"
  }
});

angular.module('app').config(appConfig);

angular.module('app').run(appRun);

/* angular.module("app").factory("swal", swal); */

angular.bootstrap(document, ['app'], {
  strictDi: true
});




angular.module('app', ['ui.carousel']);
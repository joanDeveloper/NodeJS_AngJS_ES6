import angular from 'angular';
/* import datepicker from 'angular-ui-bootstrap/src/alert'; */

// Create the module where our functionality can attach to
let recover_passModule = angular.module("app.recover_pass", []);

// Include our UI-Router config settings
import Recover_passConfig from './recover_pass.config';
recover_passModule.config(Recover_passConfig);


// Controllers
import Recover_passCtrl from './recover_pass.controller';
recover_passModule.controller('Recover_passCtrl', Recover_passCtrl);


export default recover_passModule;

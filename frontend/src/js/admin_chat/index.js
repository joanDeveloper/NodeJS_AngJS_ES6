import angular from 'angular';
/* import datepicker from 'angular-ui-bootstrap/src/alert'; */

// Create the module where our functionality can attach to
let admin_chatModule = angular.module("app.admin_chat", []);

// Include our UI-Router config settings
import Admin_chatConfig from './admin_chat.config';
admin_chatModule.config(Admin_chatConfig);


// Controllers
import Admin_chatCtrl from './admin_chat.controller';
admin_chatModule.controller('Admin_chatCtrl', Admin_chatCtrl);


export default admin_chatModule;

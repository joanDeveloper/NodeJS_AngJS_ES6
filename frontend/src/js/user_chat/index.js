import angular from 'angular';
/* import datepicker from 'angular-ui-bootstrap/src/alert'; */

// Create the module where our functionality can attach to
let user_chatModule = angular.module("app.user_chat", []);

// Include our UI-Router config settings
import User_chatConfig from './user_chat.config';
user_chatModule.config(User_chatConfig);


// Controllers
import User_chatCtrl from './user_chat.controller';
user_chatModule.controller('User_chatCtrl', User_chatCtrl);


export default user_chatModule;

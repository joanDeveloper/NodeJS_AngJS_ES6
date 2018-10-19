import angular from 'angular';
/* import datepicker from 'angular-ui-bootstrap/src/alert'; */

// Create the module where our functionality can attach to
let profile_userModule = angular.module("app.profile_user", []);

// Include our UI-Router config settings
import Profile_userConfig from './profile_user.config';
profile_userModule.config(Profile_userConfig);


// Controllers
import Profile_userCtrl from './profile_user.controller';
profile_userModule.controller('Profile_userCtrl', Profile_userCtrl);


export default profile_userModule;

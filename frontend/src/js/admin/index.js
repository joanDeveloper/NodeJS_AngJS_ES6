import angular from 'angular';
/* import datepicker from 'angular-ui-bootstrap/src/alert'; */

// Create the module where our functionality can attach to
let adminModule = angular.module('app.admin', []);

// Include our UI-Router config settings
import AdminConfig from './admin.config';
adminModule.config(AdminConfig);


// Controllers
import AdminCtrl from './admin.controller';
adminModule.controller('AdminCtrl', AdminCtrl);


adminModule.filter('beginning_data2', function () {
    return function (input, begin) {
        /*console.log(input);
        console.log(begin);*/
        if (input) {
            // console.log("yeeeeee");
            begin = +begin;
            return input.slice(begin);
        }
        return [];
    }
});
export default adminModule;

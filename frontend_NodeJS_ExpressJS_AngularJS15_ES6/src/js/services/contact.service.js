export default class Contact {
    constructor(AppConstants, $http) {
        'ngInject';

        this._AppConstants = AppConstants;
        this._$http = $http;
    }

    sendEmail(message) {
        console.log(`${this._AppConstants.api}/contact`)
        return this._$http({
            url: `${this._AppConstants.api}/contact`,
            method: 'POST',
            data: message
        }).then(success)
            .catch(fail);
        function success() {
            return true;
        }
        function fail() {
            return false;
        }
    } 

}

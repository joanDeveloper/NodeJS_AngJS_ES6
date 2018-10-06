export default class Admin {
    constructor(JWT, AppConstants, $http, $state, $q) {
        'ngInject';

        this._JWT = JWT;
        this._AppConstants = AppConstants;
        this._$http = $http;
        this._$state = $state;
        this._$q = $q;

        this.current = null;

    }

    getUsers() {
        return this._$http({
            url: this._AppConstants.api + "/admin",
            method: "POST",
            data: credentials
        }).then(res => {
            console.log("res us", res);
            if (type === "login") {
                console.log("us l35", res)
                this._JWT.save(res.data.token);
                this.current = res.data.token;
            }
            return res;
        });
    }

}

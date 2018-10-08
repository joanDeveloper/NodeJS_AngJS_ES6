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
        let token = this._JWT.get();
        let deferred = this._$q.defer();
        this._$http({
            url: this._AppConstants.api + '/admin/control-user',
            method: 'GET',
            headers: {
                authorization: token
            }
        }).then(
            (res) => {
                console.log("res ok",res)
                deferred.resolve(res);
            },

            (err) => {
                console.log("conf admin", err);
                deferred.resolve(null);
            }
        )

        return deferred.promise;
        /* let token = this._JWT.get();
        let deferred = this._$q.defer();
        this._$http({
          url: AppConstants.api + "/admin/control-user",
          method: "GET",
          headers: {
            authorization: token
          }
        }).then(res => {
            console.log("conf admin t", res);
            deferred.resolve(res);
          },

          err => {
            console.log("conf admin", err);
            deferred.resolve(null);
          });

        return deferred.promise; */
    }

}

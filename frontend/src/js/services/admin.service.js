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
    }

    checkUserType() {
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
                console.log("sa", res)
                deferred.resolve(res);
            },
            (err) => {
                console.log("sa err ", err);
                deferred.resolve(null);
            }
        )

        return deferred.promise;
    }

    lockUser(email, lock) {
        let token = this._JWT.get();
        let deferred = this._$q.defer();
        this._$http({
          url: this._AppConstants.api + "/admin/lock-user",
          method: "POST",
          headers: {
            authorization: token
          },
          data: {
            email: email,
              lock: lock
          }
        }).then(res => {
            deferred.resolve(res);
          }, err => {
            deferred.resolve(null);
          });

        return deferred.promise;
    }

    deleteUser(email) {
        let token = this._JWT.get();
        let deferred = this._$q.defer();
        console.log(token);
        this._$http({
            url: this._AppConstants.api + "/admin/delete-user/"+email,
            method: "DELETE",
            headers: {
                authorization: token
            }
        }).then(res => {
            deferred.resolve(res);
        }, err => {
            console.log("xxxxxxxxxx", err)
            deferred.resolve(null);
        });

        return deferred.promise;
    }

}

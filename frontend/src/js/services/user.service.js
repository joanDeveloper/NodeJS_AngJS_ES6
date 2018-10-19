export default class User {
  constructor(JWT, AppConstants, $http, $state, $q) {
    'ngInject';

    this._JWT = JWT;
    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$q = $q;
    this._$state = $state;

    this.current = null;

  }


  socialAuth(type) {
    let route = type === "googleplus" ? "/auth/googleplus" : "/auth/github";
    console.log(this._AppConstants.api + "/users" + route);

    return this._$http({
      //url: this._AppConstants.api + "/users" + route,

      url: 'https://localhost:3000/api' + "/users" + route,


      method: "GET",
    });
  }

  attemptAuth(type, credentials) {
    let route = "/" + type;
    console.log("credentials", credentials, this._AppConstants.api + "/users" + type);
    return this._$http({
      url: this._AppConstants.api + "/users" + route,
      method: "POST",
      data: credentials
    }).then(res => {
      console.log("res us", res);
      if (type === "login") {
        console.log("us l35", res)
        this._JWT.save(res.data.token);
        this.current = res.data.token;
        /* this._JWT.decodeToken().then(function(data) {
          console.log("$datassssssssssssssss", data);
          $rootScope.user = data;
          $rootScope.yo = "data";
          console.log("$rootScope", $rootScope.user);
        }); */
      }
      return res;
    });
  }

  update(fields) {
    return this._$http({
      url: this._AppConstants.api + '/user',
      method: 'PUT',
      data: { user: fields }
    }).then(
      (res) => {
        this.current = res.data.user;
        return res.data.user;
      }
    )
  }

  userDetails() {
    let deferred = this._$q.defer();
    this._$http({
      url: this._AppConstants.api + "/profile/",
      method: "GET",
      headers: {
        authorization: this._JWT.get()
      }
    }).then(res => {
        deferred.resolve(res);
      },
      err => {
        deferred.resolve(null);
      });
    return deferred.promise;
  }

  logout() {
    this.current = null;
    this._JWT.destroy();
    this._$state.go(this._$state.$current, null, { reload: true });
  }

  verifyAuth() {
    let deferred = this._$q.defer();

    // check for JWT token
    if (!this._JWT.get()) {
      deferred.resolve(false);
      return deferred.promise;
    }

    if (this.current) {
      deferred.resolve(true);

    } else {
      console.log("us 75", typeof this._JWT.get())
      this._$http({
        url: this._AppConstants.api + '/users/',
        method: 'GET',
        headers: {
          authorization: this._JWT.get()
        }
      }).then(
        (res) => {
          this.current = res.data.user;
          console.log("service user83", this.current);
          deferred.resolve(true);
        },

        (err) => {
          console.log("service user90", err);
          this._JWT.destroy();
          deferred.resolve(false);
        }
      )
    }

    return deferred.promise;
  }

  getCurrent() {
    return this.current;
  }

  ensureAuthIs(bool) {
    let deferred = this._$q.defer();
    console.log("us ensureAuthIs l108", bool);
    this.verifyAuth().then((authValid) => {
      console.log("us ensureAuthIs l108", authValid);
      if (authValid !== bool) {
        this._$state.go('app.home')
        deferred.resolve(false);
      } else {
        deferred.resolve(true);
      }

    });

    return deferred.promise;
  }

  recoverPass(email) {
    let token = this._JWT.get();
    let deferred = this._$q.defer();
    console.log("emailesdssssssssss", email, this._AppConstants.api + '/profile/update-token')
    this._$http({
        url: this._AppConstants.api + '/profile/update-token',
        method: 'PUT',
        data: {
          email: email
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

}

export default class User {
  constructor(JWT, AppConstants, Upload, $http, $state, $q, Toaster) {
    'ngInject';
    this._Toaster = Toaster;
    this._JWT = JWT;
    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$q = $q;
    this._Upload = Upload;
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
      console.log("res chgchgch", type);
      if (type != "register") {
        console.log("us l35", res)
        this._JWT.save(res.data.token);
        this._JWT.decodeToken().then(
        (res) => { 
          this.current = res;
          console.log("this.current-----", res);
        })
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
 
  updateUser(datos) {
    return this._$http({
      url: this._AppConstants.api + "/profile/data-update",
      method: "POST",
      headers: {
        authorization: this._JWT.get()
      },
      data: datos
    }).then(res => {
      return res;
    });
  }

   updatePass(datos) {
     console.log("datos",datos)
     
     return this._$http({
       url: this._AppConstants.api + "/profile/change-passwd",
       method: "POST",
       data: datos
     }).then(res => {
       return res;
     });
   }
  
  upload(file) {
    let deferred = this._$q.defer();
    console.log("file user service",file)
    this._Upload.upload({
      url: this._AppConstants.api + "/profile/upload-avatar",
      method: 'POST',
      headers: {
        authorization: this._JWT.get()
      },
      data: {
        file: file,
      }
    }).then(function (resp) {
      /* console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data); */
      console.log(resp)
      deferred.resolve(resp);
    }, function (resp) {
      console.log('Error status: ' + resp.status);
    }, function (evt) {
      /* var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name); */
      deferred.resolve(null);
    });
    return deferred.promise;
  };

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
    this._Toaster.showToaster("info", "Has cerrado sesion exitosamente");
    this._$state.go("app.home");
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
        url: this._AppConstants.api + '/profile/',
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

  ola(nuevosDatos) {
    var x = document.getElementById("file");
    console.log(98989898989,  x);
    console.log(77777777777777777, x.files[0]);
    this.current = nuevosDatos;
  }

 ensureAuthIs(bool) {
    let deferred = this._$q.defer();
    this.verifyAuth().then((authValid) => {
      console.log("us ensureAuthIs l108", authValid);
      if (authValid !== bool) {
        this._$state.go('app.home')
        deferred.resolve(false);
      } else {
        deferred.resolve(true);
      }

    });
    console.log("Userserv  ensureAuthIs ", deferred.promise);
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
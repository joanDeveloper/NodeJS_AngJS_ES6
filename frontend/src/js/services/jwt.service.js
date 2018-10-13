export default class JWT {
  constructor(AppConstants, $window, $http, $q) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$window = $window;
    this._$http = $http;
    this._$q = $q;
  }

  save(token) {
    this._$window.localStorage[this._AppConstants.jwtKey] = token;
  }

  get() {
    return this._$window.localStorage[this._AppConstants.jwtKey];
  }

  destroy() {
    this._$window.localStorage.removeItem(this._AppConstants.jwtKey);
  }


  decodeToken() {
    let token = this.get();
    let deferred = this._$q.defer();
    this._$http({
      url: this._AppConstants.api + '/users/',
      method: 'GET',
      headers: {
        authorization: token
      }
    }).then(
      (res) => {
        let answ = token.split(".");
        let datos = JSON.parse(atob(answ[1]));
        if (datos.media =="https://robohash.org/"){
          datos.media = datos.media + datos.name;
        }
        let p = { 
          type: datos.type_user, 
          name: datos.name,
          media: datos.media
        }
        console.log("entra en decodetoken", datos);
        deferred.resolve(p); 
      },

      (err) => {
        console.log("service user90", err);
        deferred.resolve(null);
      }
    )
    
    return deferred.promise;

    /* console.log("service token", token);
    if (token) {      
      console.log("service token");
      let res = token.split(".");
      let datos= JSON.parse(atob(res[1]));
      return { type: datos.type_user, name: datos.name };      
    }
    
    return {}; */
  };
}

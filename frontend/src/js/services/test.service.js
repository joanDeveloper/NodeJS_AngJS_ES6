export default class TestService {
    constructor(JWT,AppConstants, $http, $q, Toaster, $state) {
        'ngInject';

        this._JWT = JWT;
        this._AppConstants = AppConstants;
        this._$http = $http;
        this._$q = $q;
        this._Toaster = Toaster;
        this._state = $state;
    }



    getAll() {
        console.log("llega getAll")
        let deferred = this._$q.defer();
        this._$http({
            url: `${this._AppConstants.api}/category`,
            method: 'GET'
        }).then(
            (res) => deferred.resolve(res.data),
            (err) => deferred.reject(err)
        );
        return deferred.promise;
    }

    getTestsOfOneCategory(slug) {
        console.log("getTestsOfOneCategory:  ", slug);

        let deferred = this._$q.defer();
        this._$http({
          url: `${this._AppConstants.api}/test/list/${slug}`,
          method: "GET"
        }).then(
            (res) => deferred.resolve(res.data), 
            (err) => deferred.reject(err)
        );
        return deferred.promise;
    }

    getTestDetails(slug) {
        console.log("getTestDetails:  ", slug);

        let deferred = this._$q.defer();
        this._$http({
          url: `${this._AppConstants.api}/test/detail/${slug}`,
          method: "GET"
        }).then(
            (res) => deferred.resolve(res.data), 
            (err) => deferred.reject(err)
        );
        return deferred.promise;
    }

    stripe(card) {
        console.log("estic en stripe service: ", card);
        return this._$http({
          url: this._AppConstants.api + "/test/card",
          method: "POST",
          headers: {
            authorization: this._JWT.get()
          },
          data: {card:card}
        }).then(
            (res) => {
                console.log("res us", res);
               return this._state.go("app.stripeSuccess");
               // return res;
            },
            (err) => {
                console.log("err midelware: " , JSON.stringify(err));
                let errMidelware = JSON.stringify(err);
                this._Toaster.showToaster(
                    "error",
                    "Tienes que registratrte para poder comprar el plan"
                  );
                deferred.resolve(false);
            });

      }



    

}

export default class TestService {
    constructor(AppConstants, $http, $q) {
        'ngInject';

        this._AppConstants = AppConstants;
        this._$http = $http;
        this._$q = $q;
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

    

}

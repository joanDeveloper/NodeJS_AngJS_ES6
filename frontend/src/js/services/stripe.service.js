export default class StripeService {
    constructor( AppConstants, $http, $state, $q) {
      'ngInject';
  
      this._AppConstants = AppConstants;
      this._$http = $http;
      this._$q = $q;
      this._$state = $state;
  
      this.current = null;
  
    }
  
    stripe(card) {
      console.log("estic en stripe service: ", card);
      return this._$http({
        url: this._AppConstants.api + "/contact",
        method: "POST",
        data: card
      }).then(res => {
        console.log("res us", res);
        return res;
      });
    }
  
  }
  
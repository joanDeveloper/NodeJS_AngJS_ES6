function Profile_userConfig($stateProvider) {
  "ngInject";

  $stateProvider.state("app.profile_user", {
    url: "/profile_user",
    controller: "Profile_userCtrl",
    controllerAs: "$ctrl",
    templateUrl: "profile_user/profile_user.html",
    title: "Profile_user",
    resolve: {
      datos_user: function($state, User, $q, Toaster) {
        let deferred = $q.defer();

        User.userDetails().then(res => {
          console.log("res ok config servie", res);
          if (res==null) {
            Toaster.showToaster("error", "Ha habido un problema con tus datos, por favor intentalo mas tarde");
            $state.go("app.home");
            deferred.resolve(null);  
          }
          deferred.resolve(res);
        },
        
        err => {
          Toaster.showToaster("error", "Ha habido un problema con tus datos, por favor intentalo mas tarde");
          $state.go("app.home");
          console.log("err config servie", err);
          deferred.resolve(null);
          });
        return deferred.promise;
      }
    }
  });
};

export default Profile_userConfig;

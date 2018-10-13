function AdminConfig($stateProvider) {
  'ngInject';

  $stateProvider.state("app.admin", {
    url: "/admin",
    controller: "AdminCtrl",
    controllerAs: "$ctrl",
    templateUrl: "admin/admin.html",
    title: "Admin",
    resolve: {
      datosUsers: function (Admin, $q, Toaster, $state) {
        let deferred = $q.defer();
        Admin.checkUserType().then(res => {
          if (res != null) {
            deferred.resolve(res);
          } else {
            Toaster.showToaster("error", "User no valid. No Admin User");
            $state.go("app.home");
            deferred.resolve(null);
          }
        });
        return deferred.promise;
      }
    }
  });

};

export default AdminConfig;

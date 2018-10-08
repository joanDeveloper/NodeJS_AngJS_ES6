function AdminConfig($stateProvider) {
  'ngInject';

  $stateProvider.state("app.admin", {
    url: "/admin",
    controller: "AdminCtrl",
    controllerAs: "$ctrl",
    templateUrl: "admin/admin.html",
    title: "Admin",
    resolve: {
      datosUsers: function(Admin) {
        return Admin.getUsers();
      }
    }
  });

};

export default AdminConfig;

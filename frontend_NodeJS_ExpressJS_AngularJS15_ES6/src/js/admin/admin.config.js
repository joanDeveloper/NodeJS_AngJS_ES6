function AdminConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.admin', {
    url: '/admin',
    controller: 'AdminCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'admin/admin.html',
    title: 'Admin',
    resolve: {
      datos: function (Admin) {
        console.log("Ddd")
      }
    }
  });

};

export default AdminConfig;

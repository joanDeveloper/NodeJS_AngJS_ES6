function SettingsConfig($stateProvider, JWT, $rootScope) {
  "ngInject";

  $stateProvider.state("app.settings", {
    url: "/settings",
    controller: "SettingsCtrl",
    controllerAs: "$ctrl",
    templateUrl: "settings/settings.html",
    title: "Settings",
    resolve: {
      auth: function(User) {
        console.log("tokennnnn", JWT.decodeToken());
        /* let datos=JWT.decodeToken();
        $rootScope.user={
          type:datos.type_user,
          name: datos.name,
          media: datos.media
        } */
        return User.ensureAuthIs(true);
      }
    }
  });
};

export default SettingsConfig;

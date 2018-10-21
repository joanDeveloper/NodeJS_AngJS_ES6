class AuthCtrl {
  constructor(User, JWT, $state, $scope, Toaster, $rootScope) {
    "ngInject";
    
    $scope.recover_pass = function (id_) {
      console.log("id_test: " + id_);
      $state.go("app.recover_pass", { id: id_ });
    };

    this._User = User;
    this._JWT = JWT;
    $rootScope.user;
    this._$state = $state;
    this.title = $state.current.title;
    this.authType = $state.current.name.replace("app.", "");
    this._Toaster = Toaster;
    this.hero = {
      bg: {},
      info: {
        title: this.title.toUpperCase(),
        subtitle: ""
      }
    };
    this.colError = {
      border: { border: "solid 1px #DC3545 " },
      text: { color: "#DC3545" }
    };
    var iconData = [
      { name: "icon-home", color: "#777" },
      { name: "icon-user-plus", color: "rgb(89, 226, 168)" },
      { name: "icon-google-plus2", color: "#A00" },
      { name: "icon-youtube4", color: "#00A" },
      { name: "icon-settings", color: "#A00", theme: "md-warn md-hue-5" }
    ];
    $scope.fonts = [].concat(iconData);
    // Create a set of sizes...
    $scope.sizes = [
      { size: 48, padding: 10 },
      { size: 36, padding: 6 },
      { size: 24, padding: 2 },
      { size: 12, padding: 0 }
    ];

    console.log("ssssssssssss", this.authType);


    this.submitForm=function() {
      this.errorPassText;
      this.errorPassText = false;
      this.errorDB = false;
      this.errorMessage = "";
      console.log(this.authType);
      console.log(this.formData);
      /* let data=this.formData; */

      if (this.authType === "register") {
        if (!this.formData.user || this.formData.user.length < 3) {
          this.userError = this.colError.border;
          this.errorMessage =
            "El nombre de usuario tiene que tener minimo 3 caracteres";
          return false;
        }
        if (this.formData.password1 !== this.formData.password2) {
          this.errorPass = this.colError.border;
          this.errorMessage =
            "Los password introducidos no son iguales, intentalo nuevamente";
          this.formData.password1 = "";
          this.formData.password2 = "";
          return false;
        }
        if (!this.formData.password1 || !this.formData.password2) {
          this.errorPass = this.colError.border;
          this.errorMessage = "Estos campos son requeridos";
          this.formData.password1 = "";
          this.formData.password2 = "";
          return false;
        }
      }

      this.isSubmitting = true;

      this._User.attemptAuth(this.authType, this.formData).then(
        res => {
          if (this.authType == "login") {
            /* this._JWT.decodeToken().then(function (data) {
              console.log("$datassssssssssssssss", data);
              $rootScope.user = data;
              if (data.media == "https://robohash.org/") {
                $rootScope.user.media = data.media + data.name;
              }
              console.log("$rootScope", $rootScope.user);
            }); */

            this._Toaster.showToaster(
              "success",
              "Has iniciado sesion exitosamente"
            );
            this._$state.go("app.home");
          }
        },
        err => {
          console.log("error");
          console.log(err);
          this.isSubmitting = false;
          this.errorDB = true;
          this.errorMessage = err.data.message;
        }
      );
    }

  } /*end Constructor */

  
  logSocial(tipo) {
    console.log("entra");
    console.log(tipo);
    this._User.socialAuth(tipo);
  }
}

export default AuthCtrl;

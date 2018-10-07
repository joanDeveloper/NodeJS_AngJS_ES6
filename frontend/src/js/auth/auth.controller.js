class AuthCtrl {
  constructor(User, $state, $scope, Toaster) {
    "ngInject";

    this._User = User;
    this._$state = $state;
    this.title = $state.current.title;
    this.authType = $state.current.name.replace("app.", "");
    
    console.log("ssssssssssss",this.authType);
    this.colError = {
      border: { border: "solid 1px #DC3545 " },
      text: { color: "#DC3545" }
    };
    this._Toaster = Toaster;
    var iconData = [
      { name: "icon-home", color: "#777" },
      { name: "icon-user-plus", color: "rgb(89, 226, 168)" },
      { name: "icon-google-plus2", color: "#A00" },
      { name: "icon-youtube4", color: "#00A" },
      // Use theming to color the font-icon
      { name: "icon-settings", color: "#A00", theme: "md-warn md-hue-5" }
    ];

    // Create a set of sizes...
    $scope.sizes = [
      { size: 48, padding: 10 },
      { size: 36, padding: 6 },
      { size: 24, padding: 2 },
      { size: 12, padding: 0 }
    ];

    $scope.fonts = [].concat(iconData);
  }

  submitForm() {
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
        this._Toaster.showToaster("success", "Has iniciado sesion exitosamente");
        this._$state.go('app.home');
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

  logSocial(tipo) {
    console.log("entra");
    console.log(tipo);
    this._User.socialAuth(tipo);
  }
}

export default AuthCtrl;

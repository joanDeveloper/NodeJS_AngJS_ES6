class Recover_passCtrl {
  constructor(NgMap, User, Toaster, AppConstants, $scope, tipo, $stateParams, $state, auth, JWT) {
    "ngInject";
    console.log("ppppppppppppppp", tipo)
    this.formemail = false;
    if (tipo=="email") {
      this.formemail=true;
    }
    this._$state = $state;
    this._Toaster = Toaster;
    this.appName = AppConstants.appName;
    this._User=User;
    this.hero = {
      bg: {
      },
      info: {
        title: "Recover password",
        subtitle: "",
      }
    };
    this.colError = { border: { border: "solid 1px #DC3545 " }, text: { color: "#DC3545" } };
    this.errorDB = false;
    this.formData={};
    this.formDataPas = {};
  }

  submitFormEmail(){
    this.errorDB = false;
    this.errorMessage="";
    console.log(this.formData);
    if (this.formData.email != this.formData.email2) {
      console.log("fallo");
      this.userError = this.colError.border;
      this.errorDB=true;
      this.errorMessage="Los email no son iguales";
      return false;
    }
    console.log("correcto");
    this._User.recoverPass(this.formData.email).then(
            (res) => {
                console.log("res ok",res)
            },

            (err) => {
                console.log("conf admin", err);
            }
        )
  }

  submitFormChangePass() {
    this.errorDB = false;
    this.errorMessage="";
    if (this.formDataPas.password2 != this.formDataPas.password) {
      this.userError = this.colError.border;
      this.errorDB=true;
      this.errorMessage="los password no son iguales";
      return false;
    }
    if (this.formDataPas.password2 === undefined || this.formDataPas.password === undefined) {
      this.userError = this.colError.border;
      this.errorDB = true;
      this.errorMessage = "Rellena los datos de password ";
      return false;
    }
    if (this.formDataPas.name === undefined) {
      this.userNameError = this.colError.border;
      this.errorDB = true;
      this.errorMessageUser = "Este campo tiene que estar relleno";
      return false;
    }
    
    this._User.updatePass({
          email:this.formDataPas.name,
          password: this.formDataPas.password}).then(
      (res) => {
        console.log("res ok", res)
        this._Toaster.showToaster("success", "Su password ha sido cambiado");
        this._$state.go("app.login");
      },

      (err) => {
        console.log("conf admin", err);
      }
    )
  }
}

export default Recover_passCtrl;

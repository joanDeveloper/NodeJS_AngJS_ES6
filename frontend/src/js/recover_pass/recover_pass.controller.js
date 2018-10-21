class Recover_passCtrl {
  constructor(NgMap, User, AppConstants, $scope, tipo, $stateParams, $state, auth, JWT) {
    "ngInject";
    console.log("ppppppppppppppp", tipo)
    this.formemail = false;
    if (tipo=="email") {
      this.formemail=true;
    }

    
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
  }

  submitFormEmail(){
    this.errorDB = false;
    this.errorMessage="";
    console.log(this.formData);
    if (this.formData.email != this.formData.email2) {
      this.userError = this.colError.border;
      this.errorDB=true;
      this.errorMessage="los email no son iguales";
      return false;
    }
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
    console.log(this.formDataPas);
  
  }
}

export default Recover_passCtrl;

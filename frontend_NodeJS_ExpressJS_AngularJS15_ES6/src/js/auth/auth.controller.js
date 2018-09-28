class AuthCtrl {
  constructor(User, $state) {
    'ngInject';

    this._User = User;
    this._$state = $state;
    this.title = $state.current.title;
    this.authType = $state.current.name.replace('app.', '');
    this.colError ={
      border:{ "border": "solid 1px #DC3545 " },
      text: { "color": "#DC3545" }
    }
  }
  
  submitForm() {
    this.errorPassText;
    this.errorPassText = false;
    console.log(this.authType);
    console.log(this.formData);
    /* let data=this.formData; */
    
    if (this.authType === "register" ) {
      if (!this.formData.user || this.formData.user.length<3) {
        this.userError = this.colError.border;
        this.errorMessage="El nombre de usuario tiene que tener minimo 3 caracteres";
        return false;
      }
      if (this.formData.password1 !== this.formData.password2){
        this.errorPass = this.colError.border;
        this.errorMessage = "Los password introducidos no son iguales, intentalo nuevamente";
        this.formData.password1=""; 
        this.formData.password2=""; 
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
      (res) => {
        let msgUser = "User already exist";
        if (res.data.message === msgUser && this.authType === "register") {
          this.userError = this.colError.border;
          this.errorMessage = msgUser;
          this.isSubmitting = false;
        }
        console.log("res");
        console.log(res)
        /* this._$state.go('app.home'); */
      },
      (err) => {
        console.log("error");
        console.log(err);
        this.isSubmitting = false;
        /* this.errors = err.data.errors; */
      }
    )
  }
}

export default AuthCtrl;

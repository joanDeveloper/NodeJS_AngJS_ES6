class AuthCtrl {
  constructor(User, $state) {
    'ngInject';

    this._User = User;
    this._$state = $state;
    this.title = $state.current.title;
    this.authType = $state.current.name.replace('app.', '');
    
  }
  
  submitForm() {
    this.errorPassText;
    this.errorPassText = false;
    if ((this.authType === "register") && (this.formData.password1 !== this.formData.password2)) {
      this.errorPass = { "border":"solid 1px #DC3545 "};
      this.errorPassText = { "color": "#DC3545" };
      this.formData.password1=""; 
      this.formData.password2=""; 
      
      return false;
    }
    this.isSubmitting = true;

    this._User.attemptAuth(this.authType, this.formData).then(
      (res) => {
        console.log(res)
        /* this._$state.go('app.home'); */
      },
      (err) => {
        this.isSubmitting = false;
        this.errors = err.data.errors;
      }
    )
  }
}

export default AuthCtrl;

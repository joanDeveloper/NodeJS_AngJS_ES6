class Profile_userCtrl {
  constructor( datos_user, User, AppConstants, $scope,  $stateParams, $state, auth, JWT) {
    "ngInject";
    console.log("datos_user-------------",datos_user);
    this.datos_usuario = datos_user.data.user;
    console.log("000000000000000-------------", this.datos_usuario);
    this.hero = {
      info: {
        title: "Perfil de Usuario",
        subtitle: ""

      }
    };
  }/*end constructor*/

  Submitprofile(){
    if (this.datos_usuario.user === "" || this.datos_usuario.surname === "" || this.datos_usuario.name === "" || this.datos_usuario.email === ""){
      console.log("error")
      return false;
    }
    console.log("nonononononononononono",this.datos_usuario);
  }

}

export default Profile_userCtrl;

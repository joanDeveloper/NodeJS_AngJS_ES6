class Profile_userCtrl {
  constructor(datos_user,  User, Toaster, AppConstants, $scope,  $stateParams, $state, auth, JWT) {
    "ngInject";

    var vm = this;
    this.__User=User;
    this._Toaster = Toaster;
    this.datos_usuario = datos_user.data.user;
    this.hero = {
      info: {
        title: "Perfil de Usuario",
        subtitle: ""

      }
    };
    console.log("this.datos_usuario", this.datos_usuario);
    /* this._User.getCurrent().then(res => {
      console.log("1111", res);
    }); */
    $scope.$watch('User.current', (newUser) => {
      console.log("newUser",typeof newUser);
      if (!newUser) {
        vm.user = this.datos_usuario;
      } else {
        vm.user = newUser;
      }
      if (vm.user.media == "https://robohash.org/") {
        vm.user.media = vm.user.media + vm.user.name;
      }else{
        vm.user.media = "./images/" + vm.user.media;
      }
    })

    
  }/*end constructor*/

  changeAvatar(file, errFiles) {
    this.datos_usuario.media ="https://robohash.org/eramoncin";
    /* console.log(document.getElementById("file").files) */
    console.log(file)
    this.__User.upload(file).then(res => {
        console.log(res)
        this._Toaster.showToaster('success', 'Imagen cambiada');
        location.reload();
      },
      err => {
        this._Toaster.showToaster("error", "Error al cambiar la imagen");
        console.log(err)
      });
    
    /* this.__User.ola(this.datos_usuario); */
  }

  Submitprofile(){
    this.__User.updateUser(this.datos_usuario).
    then(res=>{
      this._Toaster.showToaster('success', 'Tus datos se han actualizado exitosamente');
    },
      err => {
        this._Toaster.showToaster("error", "No se han podido actualizar los datos correctamente. Intentalo mas tarde");
        console.log(err)
    });

  }

}

export default Profile_userCtrl;
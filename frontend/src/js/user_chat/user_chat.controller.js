class User_chatCtrl {
  constructor(Toaster, User, Messages, AppConstants, $scope) {
    "ngInject";
    this.hero = {
      info: {
        title: "Chat with us",
        subtitle: ""
      }
    };
    this._User = User.current;
    console.log("this._User", this._User);
    /* this._$state = $state;
    if (this._User==null) {
      this._$state.go("app.home");
    } */

    $scope.messages = [];
    Messages.user({ id: this._User._id, name: this._User.name });
    console.log("Messages.user", this._User.name)
    Messages.receive(function (message, isPrivate) {
      $scope.messages.push(message);
    });

    $scope.send = function () {
      let message = {
        to: 'support-agent',
        data: $scope.textbox,
        user: Messages.user()
      };
      $scope.textbox = "";
      Messages.send(message);
      $scope.messages.push(message);
    };
  }/*end constructor*/
}

export default User_chatCtrl;

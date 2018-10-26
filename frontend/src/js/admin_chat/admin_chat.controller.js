    
class User_chatCtrl {
  constructor(Toaster, User, Messages, AppConstants, $scope) {
    "ngInject";
    this.hero = {
      info: {
        title: "Administration Chat",
        subtitle: ""
      }
    };
    
    $scope.chats = {};
    Messages.user({ id: "support-agent", name: "Support Agent" });
    Messages.receive(function (message, isPrivate) {
      if (!$scope.chats[message.user.id]) {
        $scope.chats[message.user.id] = {
          user: message.user,
          messages: []
        };
      }
      /* console.log("1", $scope.chats[message.user.id].messages.push(message)) */
      $scope.chats[message.user.id].messages.push(message);
    });

    $scope.send = function (to, text) {
      var message = {
        to: to,
        data: text,
        user: Messages.user()
      };
      text = "";
      $scope.textbox = "";
      Messages.send(message);
      $scope.chats[to].messages.push(message);
    };
  }/*end constructor*/
}

    
export default User_chatCtrl;

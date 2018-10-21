
function User_chatConfig($stateProvider) {
  "ngInject";

  $stateProvider.state("app.user_chat", {
    url: "/user_chat",
    controller: "User_chatCtrl",
    controllerAs: "$ctrl",
    templateUrl: "user_chat/user_chat.html",
    title: "User_chat",
    resolve: {
      usuario: function($state, User, $q, Toaster) {
        if (User.current != null) {
          console.log("User.current!=null");
          return User.current;
        }
        $state.go("app.home");
      }
    }
  });
};

export default User_chatConfig;


function Admin_chatConfig($stateProvider) {
  "ngInject";

  $stateProvider.state("app.admin_chat", {
    url: "/admin_chat",
    controller: "Admin_chatCtrl",
    controllerAs: "$ctrl",
    templateUrl: "admin_chat/admin_chat.html",
    title: "Profile_user",
  });
};

export default Admin_chatConfig;

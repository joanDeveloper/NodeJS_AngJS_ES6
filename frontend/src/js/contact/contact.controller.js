class ContactCtrl {
    constructor(AppConstants, $scope, Contact, Toaster, $rootScope/*, $state , Toaster */) {
        'ngInject';

        this.appName = AppConstants.appName;
        this._$scope = $scope;
        this.hero = {
            info: {
              title: "Contact",
              subtitle: ""
              
            }
          };
        this.datosUser = $rootScope.user;
        $scope.contact = {
            inputName: "",
            inputEmail: "",
            inputSubject: "",
            inputMessage: ""
        };

        setTimeout(function () {
            let footer = document.getElementById('footer');
            footer.style.width = "100%";
        }, 0);

        $scope.SubmitContact = function () {
            console.log("Entra en la funcion");
            var data = {
                name: $scope.vm.inputName,
                from: 'gmc.yanez@gmail.com',
                to: $scope.vm.inputEmail,
                subject: $scope.vm.inputSubject,
                text: $scope.vm.inputMessage,
                type: 'admin'
            };
            console.log(data);
            Contact.sendEmail(data).then(function (response) {
                console.log(response)
                if (response) {
                    console.log('Email sent correctly!');
                     Toaster.showToaster('success', 'Email sent correctly!');
                    /*setTimeout(function () {
                        $state.go('app.home');
                    }, 2000); */
                } else {
                    /* Toaster.showToaster('error', 'Problem sending your email, please try again later!'); */
                    console.log('Problem sending your email, please try again later!');
                }
            });
        };


       

    }
}

export default ContactCtrl;

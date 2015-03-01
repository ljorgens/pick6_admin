'use strict';

angular.module('pick6Admin')
.controller('SignInCtrl', function ($state, AuthenticationService) {

  var vm = this;

  vm.user = {
    email: '',
    password: ''
  }

  vm.signUserIn = function(user){
    AuthenticationService.signUserIn(user).then(function(data){
      if(data.password.isTemporaryPassword){
        AuthenticationService.storeUserForReset(user);
        $state.go('change-password');
      } else {
        $state.go('team.dashboard');
      }
    },function(error){
      vm.errorMessage = error.message;
    });
  }

  vm.resetPassword = function(email){
    if(!email) {
      return;
    }
    AuthenticationService.resetPassword(email).then(function(data){
      vm.resetPasswordMessage = 'Password reset email sent successfully!';
    },function(error){
      vm.resetPasswordMessage = error.message;
    })
  }
});

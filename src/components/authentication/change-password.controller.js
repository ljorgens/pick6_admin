'use strict';

angular.module('pick6Admin')
.controller('ChangePasswordCtrl', function ($state, AuthenticationService) {

  var vm = this;

  vm.changePassword = function(password1,password2){
    if(password1 !== password2){
      return;
    }
    AuthenticationService.changePassword(password1).then(function(){
      vm.message = 'Password changed successfully!';
    },function(error){
      vm.message = error.message;
    });
  }
});

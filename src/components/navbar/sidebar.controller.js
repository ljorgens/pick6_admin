'use strict';

angular.module('pick6Admin')
.controller('SidebarCtrl', function (AuthenticationService) {

  this.signUserOut = AuthenticationService.signUserOut;
});

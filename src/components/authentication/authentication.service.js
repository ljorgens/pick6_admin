'use strict';

angular.module('pick6Admin')
.factory('AuthenticationService', function ($firebaseAuth, $q, $state, $rootScope) {

  var ref         = new Firebase('https://amber-heat-7.firebaseio.com/'),
      authObj     = $firebaseAuth(ref),
      _isLoggedIn = false,
      _user       = {};

  var service = {
    ref: ref,
    isLoggedIn: isLoggedIn,
    signUserIn: signUserIn,
    // currentUserEmail: currentUserEmail,
    signUserOut: signUserOut,
    resetPassword: resetPassword,
    storeUserForReset: storeUserForReset,
    changePassword: changePassword
  };
  return service;

  function signUserIn(user) {
    if(user){
      var deferred = $q.defer();
      authObj.$authWithPassword({
        email: user.email,
        password: user.password
      }).then(function(authData) {
        _isLoggedIn = true;
        // set user email for top navigation bar
        $rootScope.userEmail = authData.password.email;
        deferred.resolve(authData);
        // console.log("Logged in as:", authData);
      }).catch(function(error) {
        deferred.reject(error);
        // console.error("Authentication failed:", error);
      });
      return deferred.promise;
    }
  }

  function resetPassword(email){
    var deferred = $q.defer();
    authObj.$resetPassword({
      email: email
    }).then(function(data) {
      // console.log(data);
      deferred.resolve(true);
      // console.log("Password reset email sent successfully!");
    }).catch(function(error) {
      // console.error("Error: ", error);
      deferred.reject(error);
    });
    return deferred.promise;
  }

  function changePassword(newPassword){
    var deferred = $q.defer();
    authObj.$changePassword({
      email: _user.email,
      oldPassword: _user.password,
      newPassword: newPassword
    }).then(function() {
      // once reset password is successful clear temp _user
      clearUserForReset();
      deferred.resolve(true);
    }).catch(function(error) {
      // console.error("Error: ", error);
      deferred.reject(error);
    });
    return deferred.promise;
  }

  function signUserOut() {
    ref.unauth();
    _isLoggedIn = false;
    $state.go('home');
  }

  function storeUserForReset(user){
    _user = user;
  }

  function clearUserForReset(){
    _user = null;
  }

  function isLoggedIn(){
    return _isLoggedIn;
  }
});

'use strict';

angular.module('pick6Admin')
.factory("Auth", ["$firebaseAuth", 'FBURL', function($firebaseAuth, FBURL) {
    var ref = new Firebase(FBURL);
    return $firebaseAuth(ref);
  }
])
.factory('AuthenticationService', function ($firebaseAuth, $q, $state, $rootScope, FBURL) {

  var ref         = new Firebase(FBURL),
      authObj     = $firebaseAuth(ref),
      _isLoggedIn = false,
      _user       = {};

  var formatEmailForFirebase =  function(email){
    var key = email.replace('@', '^');
    if(key.indexOf('.') !== -1){
      return key.split('.').join('*');
    }
    return key;
  };

  var addNewUserToFB = function(newUser){
    // var key = formatEmailForFirebase(newUser.email);
    ref.child('users').child(newUser.uid).set(newUser);
  };

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
        password: user.password,
        remember: 'default'
        //ok
      }).then(function(authData) {
        addNewUserToFB({
              email: user.email,
              uid: authData.uid,
              token: authData.token,
              admin: true
            });
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

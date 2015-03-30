'use strict';

angular.module('pick6Admin')
.controller('EditPointsCtrl', ["$firebaseObject", 'FBURL', function($firebaseObject, FBURL) {
    var ref = new Firebase(FBURL + '/pointRules');

     var obj = $firebaseObject(ref);

     // // to take an action after the data loads, use the $loaded() promise
     // obj.$loaded().then(function() {
     //    console.log("loaded record:", obj.$id, obj.someOtherKeyInData);

     //   // To iterate the key/value pairs of the object, use angular.forEach()
     //   angular.forEach(obj, function(value, key) {
     //      console.log(key, value);
     //   });
     // });

     // To make the data available in the DOM, assign it to $scope
    this.data = obj;

    this.savePoints = function(data){
      data.$save();
      this.alert = true;
    }

     // For three-way data bindings, bind it to the scope instead
     // obj.$bindTo($scope, "data");
}]);
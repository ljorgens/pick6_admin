'use strict';

angular.module('pick6Admin')
.controller('AddBadgeCtrl', ['$firebaseArray', '$modalInstance', 'FBURL', function ($firebaseArray, $modalInstance, FBURL) {

  var list = $firebaseArray(new Firebase(FBURL + '/badges'));
  var vm = this;

  vm.submitForm = function(valid, coupon){
    if(!valid){
      return;
    }
    list.$add(coupon);
    $modalInstance.close()
  }

  vm.formData = {};

  vm.dismiss = function(){
    $modalInstance.dismiss()
  }

  vm.formFields = [
      {
        key: 'name',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'Name',
          placeholder: 'Name',
          required: true
        }
      },
      {
        key: 'points',
        type: 'input',
        templateOptions: {
          type: 'number',
          label: 'Points',
          required: true
        }
      },
      {
        key: 'secretCode',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'Secret Code',
          required: true
        }
      }
    ];

}]);

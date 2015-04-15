'use strict';

angular.module('pick6Admin')
.controller('AddCouponCtrl', ['$firebaseArray', '$modalInstance', 'FBURL', function ($firebaseArray, $modalInstance, FBURL) {

  var list = $firebaseArray(new Firebase(FBURL + '/coupons'));
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
        key: 'availableCount',
        type: 'input',
        templateOptions: {
          type: 'number',
          label: 'Available',
          required: true
        }
      }
    ];

}]);

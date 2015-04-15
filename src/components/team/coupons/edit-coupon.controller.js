'use strict';

angular.module('pick6Admin')
.controller('EditCouponCtrl', ['$firebaseObject', '$modalInstance', 'FBURL', 'couponToEdit', function ($firebaseObject, $modalInstance, FBURL, couponToEdit) {

  var vm = this,
      id = couponToEdit.$id,
      coupon = $firebaseObject(new Firebase(FBURL + '/coupons/' + id));

  coupon.$loaded().then(function(){
    vm.formData = coupon;
  })

  vm.submitForm = function(valid, coupon){
    if(!valid){
      return;
    }
    coupon.$save();
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

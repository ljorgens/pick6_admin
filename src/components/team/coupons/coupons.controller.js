'use strict';

angular.module('pick6Admin')
.controller('CouponsCtrl', ['$firebaseArray', '$modal', 'FBURL', function ($firebaseArray, $modal, FBURL) {

  var list = $firebaseArray(new Firebase(FBURL + '/coupons'));
  // list.$add({name: 'one', points: 45, availableCount: 20})

  var vm = this;

  var couponList = [
    {name: 'one', points: 45, availableCount: 20},
    {name: 'two', points: 30, availableCount: 20},
    {name: 'three', points: 44, availableCount: 15},
    {name: 'four', points: 22, availableCount: 14},
    {name: 'five', points: 25, availableCount: 12},
    {name: 'six', points: 28, availableCount: 22},
    {name: 'seven', points: 30, availableCount: 16}
  ];

  for(var i = 0; i < couponList.length; i++){
    // list.$add(couponList[i]);
  }

  vm.removeCoupon = function(index){
    var item = list[index];
    list.$remove(item).then(function(ref) {
      ref.key() === item.$id; // true
    });
  }

  vm.couponList = list;

  vm.openAddCoupon = function(){
    $modal.open({
      templateUrl: 'components/team/coupons/create-coupon.html',
      controller: 'AddCouponCtrl',
      controllerAs: 'coupon'
    })
  }

  vm.editCoupon = function(coupon){
    $modal.open({
      templateUrl: 'components/team/coupons/create-coupon.html',
      controller: 'EditCouponCtrl',
      controllerAs: 'coupon',
      resolve: {
        couponToEdit: function() {
          return coupon;
        }
      }
    })
  }

}]);

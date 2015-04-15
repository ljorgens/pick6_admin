'use strict';

angular.module('pick6Admin')
.controller('BadgesCtrl', ['$firebaseArray', '$modal', 'FBURL', function ($firebaseArray, $modal, FBURL) {

  var vm = this,
      list = $firebaseArray(new Firebase(FBURL + '/badges'));

  vm.removeCoupon = function(index){
    var item = list[index];
    list.$remove(item).then(function(ref) {
      ref.key() === item.$id; // true
    });
  }

  vm.badgeList = list;

  vm.openAddBadge = function(){
    $modal.open({
      templateUrl: 'components/team/badges/create-badge.html',
      controller: 'AddBadgeCtrl',
      controllerAs: 'badge'
    })
  }

  vm.editCoupon = function(badge){
    $modal.open({
      templateUrl: 'components/team/badges/create-badge.html',
      controller: 'EditBadgeCtrl',
      controllerAs: 'badge',
      resolve: {
        badgeToEdit: function() {
          return badge;
        }
      }
    })
  }

}]);

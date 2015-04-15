'use strict';

angular.module('pick6Admin')
.controller('EditBadgeCtrl', ['$firebaseObject', '$modalInstance', 'FBURL', 'badgeToEdit', function ($firebaseObject, $modalInstance, FBURL, badgeToEdit) {

  var vm = this,
      id = badgeToEdit.$id,
      badge = $firebaseObject(new Firebase(FBURL + '/badges/' + id));

  badge.$loaded().then(function(){
    vm.formData = badge;
  })

  vm.submitForm = function(valid, badge){
    if(!valid){
      return;
    }
    badge.$save();
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

'use strict';

angular.module('pick6Admin')
.controller('CreateGameCtrl', ["$firebaseArray", 'FBURL', function($firebaseArray, FBURL) {
    var ref = new Firebase(FBURL + '/games');
    var vm = this;

    var obj = $firebaseArray(ref);

    vm.formData = {};

    vm.saveGame = function(valid){
      if(!valid){
        return;
      }
      var newGameData = angular.copy(vm.formData);
      newGameData.date = vm.formData.date.getTime();
      console.log(newGameData)
      obj.$add(newGameData);
      vm.gameAdded = true;
    }

    vm.formFields = [
      {
        key: 'opponent',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'Opponent',
          placeholder: 'Opponent',
          required: true
        }
      },
      {
        key: 'date',
        type: 'input',
        templateOptions: {
          type: 'date',
          label: 'Game Date',
          required: true
        }
      },
      {
        key: 'date',
        type: 'input',
        templateOptions: {
          type: 'time',
          label: 'Game Time',
          required: true
        }
      },
      {
        key: 'address',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'Address',
          placeholder: 'Address',
          required: true
        }
      }
    ];
}]);

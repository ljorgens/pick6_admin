'use strict';

angular.module('pick6Admin')
.controller('EditGameController', ['$firebaseObject', '$modal', '$modalInstance', 'FBURL', 'gameToEdit', function ($firebaseObject, $modal, $modalInstance, FBURL, gameToEdit) {

  var vm = this,
      id = gameToEdit.$id,
      game = $firebaseObject(new Firebase(FBURL + '/games/' + id));

  game.$loaded().then(function(){
    var gameCopy = angular.copy(game);
    gameCopy.date = new Date(gameCopy.date);
    vm.formData = gameCopy;
  })

  vm.updateGame = function(valid){
    var updatedGame = $firebaseObject(new Firebase(FBURL + '/games/' + id));
    updatedGame.date = vm.formData.date.getTime();
    updatedGame.opponent = vm.formData.opponent;
    updatedGame.address = vm.formData.address;
    updatedGame.$save();
    var gameCopy = angular.copy(updatedGame);
    gameCopy.date = new Date(gameCopy.date);
    vm.formData = gameCopy;
    vm.dismiss();
  }

  vm.dismiss = function(){
    $modalInstance.dismiss();
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

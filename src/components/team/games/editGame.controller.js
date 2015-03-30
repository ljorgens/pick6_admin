'use strict';

angular.module('pick6Admin')
.controller('EditGameController', ['$firebaseObject', '$modal', 'FBURL', 'gameToEdit', function ($firebaseObject, $modal, FBURL, gameToEdit) {

  // console.log(gameToEdit)
  var id = gameToEdit.$id;
  var game = $firebaseObject(new Firebase(FBURL + '/games/' + id));
  console.log(game)
  var vm = this;

  vm.formData = game;

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

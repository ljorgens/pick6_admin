'use strict';

angular.module('pick6Admin')
.controller('CreateGameCtrl', ['$firebaseArray', '$firebaseObject', '$state', 'FBURL', 'uploadImage', function($firebaseArray, $firebaseObject, $state, FBURL, uploadImage) {
    var ref = new Firebase(FBURL + '/games'),
        currentGame = $firebaseObject(new Firebase(FBURL + '/currentGame'));
    var vm = this;

    var obj = $firebaseArray(ref);

    vm.formData = {};

    vm.saveGame = function(valid){
      if(!valid){
        return;
      }
      uploadImage.uploadToS3(vm.files,'games').then(function(data){
        
        var newGameData = angular.copy(vm.formData);
        newGameData.date = vm.formData.date.getTime();
        newGameData.url = data.savedUrl;
        obj.$add(newGameData);
        setCurrentGame(newGameData);
        vm.gameAdded = true;
        $state.go('team.current-game');
      },function(err){
        // console.log('error',err);
      });
    }

    function setCurrentGame(game){
      currentGame.date = game.date;
      currentGame.url = game.url;
      currentGame.opponent = game.opponent;
      currentGame.address = game.address;
      currentGame.currentPlayers = [];
      currentGame.$save();
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

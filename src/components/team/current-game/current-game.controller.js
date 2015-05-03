'use strict';

angular.module('pick6Admin')
.controller('CurrentGameCtrl', ['$firebaseObject', '$firebaseArray', '$modal', 'FBURL', function ($firebaseObject, $firebaseArray, $modal, FBURL) {

  var vm = this,
      game = $firebaseObject(new Firebase(FBURL + '/currentGame')),
      players = $firebaseArray(new Firebase(FBURL + '/players'));

  vm.playerList = players;
  vm.game = game;

  vm.removePlayer = function(player){
    for(var i = 0; i < game.currentPlayers.length; i++){
      if(game.currentPlayers[i].number === player.number){
        game.currentPlayers.splice(i,1);
        game.$save()
        return;
      }
    }
  }

  vm.addPlayer = function(player){
    game.currentPlayers = game.currentPlayers || [];
    for(var i = 0; i < game.currentPlayers.length; i++){
      if(game.currentPlayers[i].number === player.number){
        return;
      }
    }
    game.currentPlayers.push(player)
    game.$save()
  }

}]);

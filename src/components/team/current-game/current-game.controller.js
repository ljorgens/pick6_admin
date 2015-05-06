'use strict';

angular.module('pick6Admin')
.controller('CurrentGameCtrl', ['$firebaseObject', '$firebaseArray', '$modal', 'FBURL', function ($firebaseObject, $firebaseArray, $modal, FBURL) {

  var vm = this,
      game = $firebaseObject(new Firebase(FBURL + '/currentGame')),
      players = $firebaseArray(new Firebase(FBURL + '/players')),
      badges = $firebaseArray(new Firebase(FBURL + '/badges'));

  vm.playerList = players;
  vm.game = game;
  vm.badges = badges;

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

  vm.addTwitterSnippet = function(snippet){
    game.twitterSnippets = game.twitterSnippets || [];
    for(var i = 0; i < game.twitterSnippets.length; i++){
      if(game.twitterSnippets[i] === snippet){
        return;
      }
    }
    game.twitterSnippets.push(snippet)
    vm.twitterSnippet = '';
    game.$save();
  }

  vm.removeSnippet = function(index){
    game.twitterSnippets.splice(index,1);
    game.$save();
  }

  vm.addCurrentBadge = function(badge){
    game.currentBadges = game.currentBadges || [];
    for(var i = 0; i < game.currentBadges.length; i++){
      if(game.currentBadges[i].name === badge.name){
        return;
      }
    }
    game.currentBadges.push(badge);
    game.$save();
  }

  vm.removeBadge = function(badge){
    for(var i = 0; i < game.currentBadges.length; i++){
      if(game.currentBadges[i].name === badge.name){
        game.currentBadges.splice(i,1);
        game.$save();
        return;
      }
    }
  }

}]);

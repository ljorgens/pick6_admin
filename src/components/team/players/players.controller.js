'use strict';

angular.module('pick6Admin')
.controller('PlayersCtrl', ['$firebaseArray', '$modal', 'FBURL', function ($firebaseArray, $modal, FBURL) {

  var vm = this,
      players = $firebaseArray(new Firebase(FBURL + '/players'));

  vm.playerList = players;

  vm.removeGame = function(index){
    var item = games[index];
    games.$remove(item).then(function(ref) {
      ref.key() === item.$id; // true
    });
  }



  vm.openAddPlayer = function(){
    $modal.open({
      templateUrl: 'components/team/players/create-player.html',
      controller: 'AddPlayerCtrl',
      controllerAs: 'player'
    })
  }
}]);

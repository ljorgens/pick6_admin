'use strict';

angular.module('pick6Admin')
.controller('GamesCtrl', ['$firebaseArray', '$modal', 'FBURL', function ($firebaseArray, $modal, FBURL) {

  var games = $firebaseArray(new Firebase(FBURL + '/games'));
  var vm = this;

  vm.gamesList = games;

  vm.removeGame = function(index){
    var item = games[index];
    games.$remove(item).then(function(ref) {
      ref.key() === item.$id; // true
    });
  }

  vm.editGame = function(game){
    console.log(game);
    $modal.open({
      templateUrl: 'components/team/games/editGameTemplate.html',
      controller: 'EditGameController',
      controllerAs: 'editGame',
      resolve: {
        gameToEdit: function() {
          return game;
        }
      }
    })
  }

}]);

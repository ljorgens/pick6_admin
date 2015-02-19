'use strict';

angular.module('pick6Admin', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/splash.html',
        controller: 'SplashCtrl'
      })
      .state('team', {
        // url: '/team',
        templateUrl: 'components/team/team.html',
        controller: 'TeamCtrl'
      })
      .state('team.dashboard', {
        url: '^/dashboard',
        templateUrl: 'components/team/dashboard/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .state('team.editPoints', {
        url: '^/edit',
        templateUrl: 'components/team/edit-points/edit-points.html',
        controller: 'EditPointsCtrl'
      })
      .state('team.players', {
        url: '^/players',
        templateUrl: 'components/team/players/players.html',
        controller: 'PlayersCtrl'
      })
      .state('team.createGame', {
        url: '^/create-game',
        templateUrl: 'components/team/create-game/create-game.html',
        controller: 'CreateGameCtrl'
      })
      .state('team.games', {
        url: '^/games',
        templateUrl: 'components/team/games/games.html',
        controller: 'GamesCtrl'
      })
      .state('team.badges', {
        url: '^/badges',
        templateUrl: 'components/team/badges/badges.html',
        controller: 'BadgesCtrl'
      })
      .state('team.coupons', {
        url: '^/coupons',
        templateUrl: 'components/team/coupons/coupons.html',
        controller: 'CouponsCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
;

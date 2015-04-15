'use strict';

angular.module('pick6Admin', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'googlechart', 'firebase', 'smart-table', 'formly', 'formlyBootstrap'])
  .constant('FBURL', 'https://torid-torch-2199.firebaseio.com/')
  .config(function ($stateProvider, $urlRouterProvider) {
    var authenticateResolve = {
      "currentAuth": ["Auth", function(Auth) {
        return Auth.$requireAuth();
      }]
    };
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/splash.html',
        controller: 'SplashCtrl'
      })
      .state('sign-in', {
        url: '/sign-in',
        templateUrl: 'components/authentication/sign-in.html',
        controller: 'SignInCtrl',
        controllerAs: 'signIn'
      })
      .state('change-password', {
        url: '/change-password',
        templateUrl: 'components/authentication/change-password.html',
        controller: 'ChangePasswordCtrl',
        controllerAs: 'changePassword'
      })
      .state('team', {
        // url: '/team',
        templateUrl: 'components/team/team.html',
        controller: 'TeamCtrl',
        resolve: authenticateResolve
      })
      .state('team.dashboard', {
        url: '^/dashboard',
        templateUrl: 'components/team/dashboard/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard',
        resolve: authenticateResolve
      })
      .state('team.editPoints', {
        url: '^/edit',
        templateUrl: 'components/team/edit-points/edit-points.html',
        controller: 'EditPointsCtrl',
        controllerAs: 'EditPoints',
        resolve: authenticateResolve
      })
      .state('team.players', {
        url: '^/players',
        templateUrl: 'components/team/players/players.html',
        controller: 'PlayersCtrl',
        resolve: authenticateResolve
      })
      .state('team.createGame', {
        url: '^/create-game',
        templateUrl: 'components/team/games/create-game.html',
        controller: 'CreateGameCtrl',
        controllerAs: 'addGame',
        resolve: authenticateResolve
      })
      .state('team.editGame', {
        url: '^/edit-game/:gameId',
        templateUrl: 'components/team/games/create-game.html',
        controller: 'EditGameCtrl',
        controllerAs: 'addGame',
        resolve: authenticateResolve
      })
      .state('team.games', {
        url: '^/games',
        templateUrl: 'components/team/games/games.html',
        controller: 'GamesCtrl',
        controllerAs: 'games',
        resolve: authenticateResolve
      })
      .state('team.badges', {
        url: '^/badges',
        templateUrl: 'components/team/badges/badges.html',
        controller: 'BadgesCtrl',
        controllerAs: 'badges',
        resolve: authenticateResolve
      })
      .state('team.coupons', {
        url: '^/coupons',
        templateUrl: 'components/team/coupons/coupons.html',
        controller: 'CouponsCtrl',
        controllerAs: 'coupons',
        resolve: authenticateResolve
      });

    $urlRouterProvider.otherwise('/');
  })

.run(['$rootScope', '$location', function($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
  // We can catch the error thrown when the $requireAuth promise is rejected
  // and redirect the user back to the home page
  if (error === 'AUTH_REQUIRED') {
    $location.path('/');
  }
});

  // $rootScope.isLoggedIn = AuthenticationService.isLoggedIn;
}]);


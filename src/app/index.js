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
        url: '/team',
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
      });

    $urlRouterProvider.otherwise('/');
  })
;

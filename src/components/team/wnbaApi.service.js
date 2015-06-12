'use strict';

angular.module('pick6Admin')
.factory('wnbaApiService',['$http', function($http){
  var service = {
    getScheduleFeed: function(){
      // $http.get('https://data.wnba.com/data/10s/v2015/json/mobile_teams/wnba/2015/teams/storm_schedule_01.json').success(function(data){
      // $http.jsonp('http://data.wnba.com/data/10s/v2015/json/mobile_teams/wnba/2015/teams/storm_schedule_01.json?callback=JSON_CALLBACK').then(function(data){
        console.log('data');
      // })
    }
  };
  return service;
}])
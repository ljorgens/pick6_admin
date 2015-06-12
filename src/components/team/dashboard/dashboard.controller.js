'use strict';

angular.module('pick6Admin')
.controller('DashboardCtrl', function (wnbaApiService) {

  var vm = this;

  vm.fanAttendance = {
    data: [
        ['Date', 'Attendace'],
        ['01-18-2015', 50],
        ['01-19-2015', 45],
        ['01-21-2015', 52],
        ['01-22-2015', 70],
        ['01-24-2015', 90],
        ['01-25-2015', 145],
        ['01-26-2015', 165],
        ['01-27-2015', 163],
        ['01-28-2015', 183],
        ['01-29-2015', 173]
        ],
    type: 'ColumnChart',
    options: {
      title: 'Fan Attendace (Last 10 Games)',
      width: 800,
      height: 240,
      legend: 'none',
      vAxis: {
        viewWindowMode:'explicit',
        textStyle: {
          color: '#58585a',
          fontName: 'AvenirLight'
        }
      },
      hAxis: {
        textStyle: {
          color: '#58585a',
          fontName: 'AvenirHeavy'
        }
      },
      titleTextStyle: {
        color: '#58585a',
        fontSize: 14,
        fontName: 'AvenirHeavy'
      },
      annotations: {
        textStyle: {
          fontSize: 18,
          fontName: 'AvenirLight',
          bold: true,
        },
      }
    }
  };

  vm.getSchedule = function(){
    wnbaApiService.getScheduleFeed();
  }

});

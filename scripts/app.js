'use strict';

/**
 * @ngdoc overview
 * @name etechSlotApp
 * @description
 * # etechSlotApp
 *
 * Main module of the application.
 */
var app = angular
  .module('etechSlotApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngAudio',
    'ngTouch',
    'ngMaterial',
    'ngCookies'
  ])

   app.run(['$rootScope', function($rootScope) {
      $rootScope.spinsSinceLastWin = 0;
      $rootScope.currentPrize = 0;
      $rootScope.reel1 = 0;
      $rootScope.reel2 = 1;
      $rootScope.reel3 = 2;

   }]).config(function ($routeProvider) {
    $routeProvider
      .when('/slotMachine', {
        templateUrl: 'views/main.html',
        controller: 'slotMachineController',
        controllerAs: 'slotMachineCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

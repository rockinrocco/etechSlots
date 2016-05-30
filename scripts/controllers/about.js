'use strict';

/**
 * @ngdoc function
 * @name etechSlotApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the etechSlotApp
 */
angular.module('etechSlotApp')
  .controller('AboutCtrl',["$scope","ngAudio",'$cookies', function ($scope,ngAudio,$cookies) {


   $scope.lists = $cookies.get('nameList').split("||");



  }]);

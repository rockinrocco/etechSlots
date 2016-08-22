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



   $scope.lists = $cookies.get('nameList')


$(document).ready(function () {

    function exportTableToCSV(csv, filename) {
         // Data URI
        var csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);
        //alert(csv);
        $(".export")
            .attr({
                'download': filename,
                'href': csvData,
                'target': '_blank'
        });
    }

    // This must be a hyperlink
    $(".export").on('click', function (event) {
        // CSV
        var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

today = mm+'-'+dd+'-'+yyyy;;
        exportTableToCSV.apply($(".export"), [$scope.lists, 'EtechConferenceNames - ' + today +'.csv']);
        
        // IF CSV, don't do event.preventDefault() or return false
        // We actually need this to be a typical hyperlink
    });
});


  }]);

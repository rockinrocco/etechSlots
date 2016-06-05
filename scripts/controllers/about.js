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


$(document).ready(function () {

    function exportTableToCSV(csv, filename) {
         // Data URI
        var csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);
        //alert(csv);
        $("#export")
            .attr({
                'download': filename,
                'href': csvData,
                'target': '_blank'
        });
    }

    // This must be a hyperlink
    $("#export").on('click', function (event) {
        // CSV
        var csv="1,2,3,4";
        exportTableToCSV.apply($(".export"), [csv, 'EtechConferenceNames - ' + new Date("DD-MM-YYYY") +'.csv']);
        
        // IF CSV, don't do event.preventDefault() or return false
        // We actually need this to be a typical hyperlink
    });
});


  }]);

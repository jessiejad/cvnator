/**
 * Created by Jessie Jadas & Quentin Lecornu on 30/06/2016.
 */
'use strict';

angular.module('myResumeApp')
    .controller('newResumeCtrl', function($scope, $http,$mdToast,$stateParams) {
        
    });
	
$scope.genres = ('MADAME MONSIEUR').split(' ').map(function(genre) {
        return {abbrev: genre};
      });
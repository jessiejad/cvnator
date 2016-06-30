'use strict';

angular.module('myResumeApp')
    .controller('handshakeDialog', function(person, $mdDialog, $scope){
        $scope.person = person;

        $scope.cancel = function(){
            $mdDialog.cancel();
        };

        $scope.valid = function(){
            $mdDialog.hide($scope.message);
        }
    });
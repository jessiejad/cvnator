'use strict';

angular.module('myResumeApp')
    .controller('userResumeCtrl', function($scope, $http,$mdToast,$stateParams){

        // ---- Call API to get users resume
        $http.get('http://localhost:3000/myResume').then(function(result){
            console.log(result);
            if(result == null) {
                // User n'a pas encore de resume
            }
            $scope.resume = result.data;
        }, function(reason){
            console.log(reason);
            $mdToast.simpleToast("Erreur lors de la récupération du cv")
        });

        

    });
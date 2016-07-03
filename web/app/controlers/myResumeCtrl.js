'use strict';

angular.module('myResumeApp')
    .controller('myResumeCtrl', function($scope, $http,$mdToast,$stateParams){

        console.log("myResumeCtrl");

        // ---- Call API to get Current Resume
        $http.get('http://localhost:3000/resumes/'+$stateParams.resumeId).then(function(resume){
            $scope.resume = resume.data;

            // ---- Send new information to the layout
            $scope.updateLayout($scope.resume);

        }, function(reason){
            console.log(reason);
            $mdToast.simpleToast("Erreur lors du chargement du CV")
        });

    });
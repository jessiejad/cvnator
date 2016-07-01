'use strict';

angular.module('myResumeApp')
    .controller('template2Ctrl', function($scope, $http,$mdToast,$stateParams){
        console.log("ctrl");

        // ---- Call API to get Current Resume
        $http.get('http://localhost:3000/resumes/'+$stateParams.resumeId).then(function(resume){
            $scope.resume = resume.data;
            console.log(resume.data);

            // ---- Send new information to the layout
            $scope.updateTemplate2($scope.resume);

        }, function(reason){
            console.log(reason);
            $mdToast.simpleToast("Erreur lors du chargement du CV")
        });

    });
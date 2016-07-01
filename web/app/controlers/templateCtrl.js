'use strict';

angular.module('myResumeApp')
    .controller('templateCtrl', function($scope, $http,$mdToast,$stateParams){
        console.log("ctrl");

        // ---- Call API to get Current Resume
        $http.get('http://0.0.0.0:3000/resumes/'+$stateParams.resumeId).then(function(resume){
            $scope.resume = resume.data;
            console.log(resume.data);

            // ---- Send new information to the layout
            $scope.updateTemplate($scope.resume);

        }, function(reason){
            console.log(reason);
            $mdToast.simpleToast("Erreur lors du chargement du CV")
        });

    });
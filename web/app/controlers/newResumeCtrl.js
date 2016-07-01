
'use strict';

angular.module('myResumeApp')
    .controller('newResumeCtrl', function($scope, $http, $mdToast, $stateParams) {

        $scope.addPerson=function(person) {
            $http.post('http://localhost:3000/person', person).then(function (result) {
                console.log(result);
            }, function (reason) {
                console.log(reason);
                $mdToast.simpleToast("Erreur lors de la création d'une personne")
            });
        }
        $scope.addEduc=function(resume) {
            $http.post('http://localhost:3000/resumes', resume).then(function (result) {
                console.log(result);
            }, function (reason) {
                console.log(reason);
                $mdToast.simpleToast("Erreur lors de la création du cv")
            });
        }
    });
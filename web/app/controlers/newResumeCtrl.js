
'use strict';

angular.module('myResumeApp')
    .controller('newResumeCtrl', function($scope, $http, $mdToast, $stateParams) {
        var idPerson;
        $scope.addPerson=function(person) {
            $http.post('http://localhost:3000/person', person).then(function (result) {
                console.log(result);
            }, function (reason) {
                console.log(reason);
                $mdToast.simpleToast("Erreur lors de la création d'une personne")
            });
        };
        var resume = {
            "title" : "Création d'un cv via le web",
            "person" : idPerson,
            "defaultTemplate" : "temp1"
        }
        $scope.addEduc=function(resume) {
            $http.post('http://localhost:3000/resumes', resume).then(function (result) {
                console.log(result);
            }, function (reason) {
                console.log(reason);
                $mdToast.simpleToast("Erreur lors de la création du cv")
            });
        }
        $scope.addExp=function(resume) {}
        $scope.addComp=function(resume) {}
        $scope.addHobb=function(resume) {}


    });
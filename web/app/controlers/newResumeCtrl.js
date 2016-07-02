/**
 * Created by Jessie Jadas & Quentin Lecornu on 30/06/2016.
 */
'use strict';

angular.module('myResumeApp')
    .controller('newResumeCtrl', function ($scope, $http, $mdToast, $stateParams, $mdDialog) {
        var idPerson;


        $scope.max = 4;
        $scope.selectedIndex = 0;
        $scope.nextTab = function() {
            var index = ($scope.selectedIndex == $scope.max) ? 0 : $scope.selectedIndex + 1;
            $scope.selectedIndex = index;

        };
        $scope.PrevTab = function() {
            var index = ($scope.selectedIndex == $scope.max) ? 0 : $scope.selectedIndex - 1;
            $scope.selectedIndex = index;

        };

        $scope.showAlert = function(ev) {
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Information')
                    .textContent('Votre Cv a été créé avec succés')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                    .targetEvent(ev)
            );
        };
        $scope.addPerson = function (person,title) {
            console.log(title);
            var nom=document.getElementById("nom").value;
            person.name+=" "+nom;
            $http.post('http://localhost:3000/person', person).then(function (result) {
                console.log(result);
                idPerson = result.data;
            }, function (reason) {
                console.log(reason);
                $mdToast.simpleToast("Erreur lors de la création d'une personne")
            })
        };



        $scope.addResume = function (resume) {
            resume.person=idPerson;
            console.log(resume);
            $http.post('http://localhost:3000/resumes', resume).then(function (result) {
                console.log(result);
            }, function (reason) {
                console.log(reason);
                $mdToast.simpleToast("Erreur lors de la création du cv")

            });
        }
    });

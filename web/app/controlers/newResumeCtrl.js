/**
 * Created by Jessie Jadas & Quentin Lecornu on 30/06/2016.
 */
'use strict';

angular.module('myResumeApp')
    .controller('newResumeCtrl', function ($scope, $http, $mdToast, $stateParams) {
        var idPerson;
        var educ;
        var exp;
        var comp;
        var hobb;
        $scope.max = 5;
        $scope.selectedIndex = 0;
        $scope.nextTab = function() {
            var index = ($scope.selectedIndex == $scope.max) ? 0 : $scope.selectedIndex + 1;
            $scope.selectedIndex = index;

        };
        $scope.addPerson = function (person,title) {
            console.log(title);
            var nom=document.getElementById("nom").value;
            person.name+=" "+nom;
            $http.post('http://localhost:3000/person', person).then(function (result) {
                idPerson = result.data;
                console.log(result);
            }, function (reason) {
                console.log(reason);
                $mdToast.simpleToast("Erreur lors de la création d'une personne")
            })
        };

        $scope.addEduc = function (education) {
            educ = education;
            console.log(educ);

        };
        $scope.addExp = function (experience) {

            exp = experience;
            console.log(exp);

        };
        $scope.addHobb = function (hobbie) {
            hobb = hobbie;
            console.log(hobb);

        };

        $scope.addComp = function (competence) {
            competence.person=idPerson;
            comp = competence;
            console.log(comp);
           var resume = {
                "title": "Création d'un cv via le web",
                "person": "57757fc2b550095c0910d889"


            }
            $http.post('http://localhost:3000/resumes', competence).then(function (result) {
                console.log(result);
            }, function (reason) {
                console.log(reason);
                $mdToast.simpleToast("Erreur lors de la création du cv")

            });
        }
    });

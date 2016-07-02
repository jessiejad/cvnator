/**
 * Created by Jessie Jadas on 30/06/2016.
 */
'use strict';

angular.module('myResumeApp')
    .controller('testApiCtrl', function($scope, $http, $mdToast, $stateParams) {

        /*
        var idPerson;
        var person = {
            "name" : "Je suis une personne",
            "birthdate" : "01/07/2016"
        }
        console.log(person);

        // ---- Call API to create a person
        $http.post('http://localhost:3000/person', person).then(function(result){
            console.log(result);
            idPerson = result._id;
        }, function(reason){
            console.log(reason);
            $mdToast.simpleToast("Erreur lors de la création d'une personne")
        });
        */
        /*
        // ---- Call API to get users resume
        $http.get('http://localhost:3000/myResume').then(function(result){
            console.log(result);
            if(result.data == null) {
                // User n'a pas encore de resume
            }
        }, function(reason){
            console.log(reason);
            $mdToast.simpleToast("Erreur lors de la récupération du cv")
        });
        */
        // A remplacer ( resume to $scope.resume surement si ng-model )
        var resume = {
            "title" : "Création d'un cv via le web",
            "person" : "5774d098958f6ea818d3f3fc",
            //"defaultTemplate" : "template1"
        }
        console.log(resume);

        // ---- Call API to create a resume
        $http.post('http://localhost:3000/resumes', resume).then(function(result){
            console.log(result);
        }, function(reason){
            console.log(reason);
            $mdToast.simpleToast("Erreur lors de la création du cv")
        });
        

        /*
        var resume = {
            "title" : "Modification d'un cv via le web sans save"
        }
        // ---- Call API to update a resume
        $http.put('http://localhost:3000/resumes/' + $stateParams.resumeId, resume).then(function(result){
            console.log(result);
            var updatedResumeId = result.data;
        }, function(reason){
            console.log(reason);
            $mdToast.simpleToast("Erreur lors de la modification du cv")
        });

        // ---- Call API to delete a resume
        $http.delete('http://localhost:3000/resumes/' + $stateParams.resumeId).then(function(result){
            console.log(result);
            var deletedResumeId = result.data;
        }, function(reason){
            console.log(reason);
            $mdToast.simpleToast("Erreur lors de la suppression du cv")
        });
        

        /*
        // ---- Call API to get users favorite resumes
        $http.get('http://localhost:3000/favorites').then(function(favorites){
            console.log(favorites);
            $scope.favorites = favorites.data;

            // ---- Send new information to the layout
            $scope.updateLayout($scope.favorites);

        }, function(reason){
            console.log(reason);
            $mdToast.simpleToast("Erreur lors du chargement des favoris")
        });

        // ---- Call API to add a resume to users favorites
        $http.post('http://localhost:3000/favorites/' + $stateParams.resumeId).then(function(result){
            console.log(result);
            var addedFavoriteId = result.data;
        }, function(reason){
            console.log(reason);
            $mdToast.simpleToast("Erreur lors de l'ajout aux favoris")
        });


        // ---- Call API to delete a resume from users favorites
        $http.delete('http://localhost:3000/favorites/' + $stateParams.resumeId).then(function(result){
            console.log(result);
            var deletedFavoriteId = result.data;
        }, function(reason){
            console.log(reason);
            $mdToast.simpleToast("Erreur lors de la suppression du favoris")
        });
        */


    });
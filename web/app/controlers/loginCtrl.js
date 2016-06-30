'use strict';

angular.module('myResumeApp')
    .controller('loginCtrl', function($scope, $http, SecurityContext,$state){


        $scope.login = function(user){

            $http.post('http://localhost:3000/login', user).then(function(response){

                // --- SAVE TOKEN
                SecurityContext.setToken(response.data.token);

                // --- GO TO THE HOME
                $state.transitionTo('home');

            },function(reason){
                $scope.error = "Utilisateur / Mot de passe incorrect";
            })


        }



    });
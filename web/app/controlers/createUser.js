'use strict';

angular.module('myResumeApp')
    .controller('createUserCtrl', function($scope, $http,SecurityContext, $state){


        $scope.signup = function(user){
            // ---- Ask API to create an USER
            $http.post('http://localhost:3000/users', user).then(function(response){

                // --- SAVE TOKEN
                SecurityContext.setToken(response.data.token);

                // --- GO TO THE HOME
                $state.transitionTo('home');

            }, function(reason){
                $scope.error = reason;
            });
        }
    });
'use strict';

angular.module('myResumeApp')
    .controller('handshakeCtrl', function($scope, $http,$mdToast,$stateParams){

        // ---- Call API to get Current Resume
        $http.get('http://localhost:3000/resumes/'+$stateParams.resumeId+'/handshakes').then(function(response){
            $scope.handshakes = response.data;
        }, function(reason){
            console.log(reason);
            $mdToast.showSimple("Erreur lors du chargement des messages")
        });


    });
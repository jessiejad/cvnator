'use strict';

angular.module('myResumeApp')
    .controller('layoutCtrl', function($scope, $http,$mdSidenav,$mdDialog,$mdToast,$state){

        /**
         * Load all CV from the database
         */
        $http.get('http://0.0.0.0:3000/resumes/').then(function(response){
            $scope.resumes = response.data;
        },function(reason){
            console.log(reason);
        });

        /**
         * Action to open a Resume
         * @param resume
         */
        $scope.displayResume = function(resume){
            $scope.current_resume = resume;
            // --- Transition to go to resume
            $state.transitionTo('resume', {resumeId : resume._id });

            $scope.toggleList();
        };

        /**
         * Method to update the current layout
         * @param resume
         */
        $scope.updateLayout = function(resume){
            $scope.current_resume   = resume;
            $scope.title            = resume.title;
            $scope.person           = resume.person;
            $scope.resume_selected  = true;
        };

        $scope.getPerson = function(){
            return $scope.person;
        }

        /**
         * Default Toolbar title
         * @type {string}
         */
        $scope.title = "Choisir un CV";

        // ---- MANAGE SIDENAV
        $scope.toggleList = function(){
            $mdSidenav('left').toggle();
        };

        // ------------------------------ MANAGE FAB MENU
        $scope.fabIsOpen = false;
        $scope.selectedMode = 'md-fling';


        // --

        /**
         * Open a dialog box to take a contact
         * @param event
         */
        $scope.openContact = function(event){
            $mdDialog.show({
                controller : 'handshakeDialog',
                templateUrl : 'app/views/dialogs/handshake.html',
                locals : {
                    person : $scope.person
                },
                targetEvent : event
            }).then(function(message){

                // --- Send message to API for record information
                $http.post('http://0.0.0.0:3000/resumes/'+$scope.current_resume._id+'/handshakes', { message : message}).then(function(){
                    $mdToast.showSimple('Message envoyé!');
                },function(reason){
                    // --- Case ERROR
                    console.log(reason);
                    $mdToast.showSimple('Erreur!');
                });

            })
        };

        /**
         * Display list of contact
         */
        $scope.listContact = function(){
            // --- Transition to go to resume
            $state.transitionTo('handshake', {resumeId : $scope.current_resume._id, person : $scope.person });
        }
    });
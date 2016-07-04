'use strict';

angular.module('myResumeApp')
    .config(function ($stateProvider,$urlRouterProvider) {
        $stateProvider

            .state('home', {
                url         : '/',
                templateUrl : 'app/views/layout.html',
                controller  : 'layoutCtrl'
            })

            .state('resume',{
                url         : 'resume/:resumeId',
                template    : '<resume cv="resume" style="overflow: auto"></resume>',
                controller  : 'myResumeCtrl',
                parent      : 'home'
            })

             
            .state('handshake',{
                url         : 'resume/:resumeId/handshakes',
                templateUrl : 'app/views/handshake.html',
                controller  : 'handshakeCtrl',
                parent      : 'home'
            })

            .state('login',{
                url         : '/login',
                templateUrl : 'app/views/login.html',
                controller  : 'loginCtrl'
            })

            .state('newResume',{
                url         : '/newResume',
                templateUrl : 'app/views/newResume.html',
                controller  : 'newResumeCtrl'
            })

            .state('createUser', {
                url : '/create-user',
                templateUrl : 'app/views/create-user.html',
                controller : 'createUserCtrl'
            })

            .state('accueilCv',{
                url         : '/accueilCv',
                templateUrl : 'app/views/accueilCV.html',
                controller  : 'accueilCvCtrl'
            })

            .state('userResume',{
                url         : '/userResume',
                templateUrl : 'app/views/userResume.html',
                controller  : 'userResumeCtrl'
            })
            .state('updateResume',{
                url         : '/updateResume',
                templateUrl : 'app/views/updateResume.html',
                controller  : 'updateResumeCtrl'
            })

            // Provisoire
            .state('testApi', {
                url : '/testapi',
                templateUrl : 'app/views/newResume.html',
                controller : 'testApiCtrl'
            })

        ;

        $urlRouterProvider.otherwise('/');

    });
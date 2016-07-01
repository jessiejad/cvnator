'use strict';

angular.module('myResumeApp')
    .directive('addExperience', function(){
        return {
            restrict : 'E',
            templateUrl : 'app/views/directives/add-experience.html',
            scope : {
                experience : '='
            },
            link : function(scope){

            }
        }
    });
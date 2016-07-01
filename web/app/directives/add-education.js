'use strict';

angular.module('myResumeApp')
    .directive('addEducation', function(){
        return {
            restrict : 'E',
            templateUrl : 'app/views/directives/add-education.html',
            scope : {
                education : '='
            },
            link : function(scope){

            }
        }
    });
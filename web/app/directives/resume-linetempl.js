'use strict';

angular.module('myResumeApp')
    .directive('resumeLinetempl', function(){
        return{
            restrict : 'E',
            templateUrl : 'app/views/directives/resume-linetempl.html',
            scope : {
                title       : '=?',
                start       : '=?',
                end         : '=?',
                place       : '=?',
                location    : '=?',
                description : '=?'
            },
            link : function(scope){

            }
        }
    });
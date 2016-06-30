'use strict';

angular.module('myResumeApp')
    .directive('resumeLine', function(){
        return{
            restrict : 'E',
            templateUrl : 'app/views/directives/resume-line.html',
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
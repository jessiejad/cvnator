'use strict';

angular.module('myResumeApp')
    .directive('addHobbie', function(){
        return {
            restrict : 'E',
            templateUrl : 'app/views/directives/add-hobbie.html',
            scope : {
                hobbie : '='
            },
            link : function(scope){

            }
        }
    });
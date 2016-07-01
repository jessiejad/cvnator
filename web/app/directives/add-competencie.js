'use strict';

angular.module('myResumeApp')
    .directive('addCompetencie', function(){
        return {
            restrict : 'E',
            templateUrl : 'app/views/directives/add-competencie.html',
            scope : {
                competencie : '='
            },
            link : function(scope){

            }
        }
    });
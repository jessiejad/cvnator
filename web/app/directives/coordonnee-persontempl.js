'use strict';

angular.module('myResumeApp')
    .directive('coordonneePersontempl', function(){
        return {
            restrict : 'E',
            templateUrl : 'app/views/directives/coordonnee-persontempl.html',
            scope : {
                coordonnee : '='
            },
            link : function(scope){

            }
        }
    });
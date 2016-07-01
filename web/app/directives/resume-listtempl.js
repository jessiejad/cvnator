'use strict';

angular.module('myResumeApp')
    .directive('resumeListtempl', function(){
        return{
            restrict : 'E',
            templateUrl : 'app/views/directives/resume-listtempl.html',
            scope : {
                title       : '=?',
                content     : '=?',
                attribute   : '=?'
            },
            link : function(scope){

                scope.getAttribute = function(element){
                    return element[scope.attribute]
                };

                /**
                 * Fonction d'ordonnancement
                 * @param element
                 * @returns {*}
                 */
                scope.orderFn = function(element){
                    return scope.getAttribute(element);
                };

            }
        }
    });
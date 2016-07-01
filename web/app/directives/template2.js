'use strict';

angular.module('myResumeApp')
    .directive('template2', function(){
        return{
            restrict : 'E',
            templateUrl : 'app/views/template2.html',
            scope : {
                resume : '=cv'
            },
            link : function(scope){

                /**
                 * Check if new resume arrive
                 */
                scope.$watch('resume', function(resume){

                    if(resume){
                        // ---- Active to display the current resume
                        scope.toDisplay = true;
                    }
                });

                /**
                 * Fonction d'ordonnancement
                 * @param element
                 * @returns {*}
                 */
                scope.orderFn = function(element){
                    return moment(new Date(element.start)).valueOf();
                };

            }
        }
    });
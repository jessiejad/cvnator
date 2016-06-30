'use strict';

angular.module('myResumeApp')
    .factory('SecurityContext', function(localStorageService){
        return new function () {
            // ---- Default token
            this.token = null;
            // ---- Check if in local storage
            var current_token  =   localStorageService.get('myResumeAppToken');
            if(current_token){
                this.token = current_token;
            }
            /**
             * Save the current token
             * @param token
             */
            this.setToken = function(token){
                this.token = token;
                localStorageService.set('myResumeAppToken', token);
            };
            /**
             * Return current Token
             * @returns {*}
             */
            this.getToken = function(){
                return this.token
            };

            /**
             * Check if a token is here
             * @returns {boolean}
             */
            this.hasToken = function(){
                return this.token !== null;
            };

            /**
             * Reset token
             * Exemple sign out
             */
            this.reset = function(){
                this.token = null;
                localStorageService.set('myResumeAppToken', null);
            }

        };
    });
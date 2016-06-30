'use strict';

angular.module('myResumeApp')
    .config(function ($httpProvider, $injector) {
        $httpProvider.interceptors.push(function ($q,$injector) {
            return {
                'request': function(config) {

                    var SecurityContext = $injector.get('SecurityContext');

                    if(SecurityContext.hasToken()) {
                        config.headers = config.headers || {};
                        config.headers.Authorization = SecurityContext.getToken();
                    }

                    return config || $q.when(config);
                },
                'responseError': function(response) {

                    if (response.status == 401) {
                        $injector.get('$state').transitionTo('login');
                    }

                    return $q.reject(response);
                }
            };
        });
    });
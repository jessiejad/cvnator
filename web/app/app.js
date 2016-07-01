'use strict';

angular.module('myResumeApp',[
    /**
     * Here declaration all external dependencies or
     */
    'ui.router',
    'ngMaterial',
    'LocalStorageModule',
	'ngMessages'
])
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('pink')
            .accentPalette('orange');

        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('pink')
            .dark();
    });
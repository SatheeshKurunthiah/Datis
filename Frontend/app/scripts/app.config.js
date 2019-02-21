'use strict';

angular.module('datis').config(function ($urlRouterProvider, $stateProvider, $httpProvider, API_URL) {

    $urlRouterProvider.otherwise('/');
})

    .constant('API_URL', 'http://localhost:8001/')

    .run(function ($window) {
        var params = $window.location.search.substring(1);

        if (params && $window.opener && $window.opener.location.origin === $window.location.origin) {
            var pair = params.split('=');
            var code = decodeURIComponent(pair[1]);

            $window.opener.postMessage(code, $window.location.origin);
        }
    });

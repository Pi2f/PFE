myApp.config(function ($httpProvider) {
        $httpProvider.interceptors.push([
            '$injector',
            function ($injector) {
                return $injector.get('AuthInterceptor');
            }
        ]);
    })

    .factory('AuthInterceptor', function () {
        return {
            request: function (config) {
                const token = localStorage.getItem('melanomeToken');
                if (token) {
                    config.headers.authorization = token;
                }
                return config;
            },
        };
    })
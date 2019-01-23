var myApp = angular.module('Melanome', ['ui.router', 'ngFileUpload', 'webcam']);

myApp.config(function ($stateProvider, $urlRouterProvider) {

        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }

        var homeState = {
            name: 'default',
            url: '/',
            templateUrl: './Connection.html',
            controller: 'connectionCtrl'
        }

        var registerState = {
            name: 'register',
            url: '/register',
            templateUrl: './Register.html',
            controller: 'registerCtrl'
        }

        var galerieState = {
            name: 'galerie',
            url: '/galerie',
            templateUrl: './Galerie.html'
        }

        var mdpOublieState = {
            name: 'mdpOublie',
            url: '/mdpOublie',
            templateUrl: './MdpOublie.html',
            controller: 'mdpOublieCtrl'
        }

        var mdpReinitState = {
            name: 'mdpReinit',
            url: '/mdpReinit',
            templateUrl: './MdpReinit.html',
            controller: 'mdpReinitCtrl'
        }

        var appPhotoState = {
            name: 'appPhoto',
            url: '/appPhoto',
            templateUrl: './AppareilPhoto.html',
            controller: 'appPhotoCtrl'
        }

        $stateProvider.state(homeState);
        $stateProvider.state(registerState);
        $stateProvider.state(galerieState);
        $stateProvider.state(mdpOublieState);
        $stateProvider.state(mdpReinitState);
        $stateProvider.state(appPhotoState);

        $urlRouterProvider.otherwise('/');


    })
    .run(function ($transitions, connectionService, sessionService, $rootScope) {

        var match = {
            to: function (state) {
                return state.name != "default" && state.name != "register" && state!='mdpOublie' && state != 'mdpReinit';
            }
        }

        $transitions.onBefore(match, function (transition) {
            const stateService = transition.router.stateService;
            return connectionService.isAuthenticated().then(function (user) {
                if (!user) {
                    $rootScope.user = null;
                    return stateService.target('default');
                } else {
                    sessionService.user = user;
                    $rootScope.user = user;
                    return true;
                }
            });
        });
    })
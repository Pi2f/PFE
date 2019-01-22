var myApp = angular.module('Melanome',['ui.router', 'ngFileUpload', 'webcam']);

myApp.config(function($stateProvider) {

    var homeState = {
        name: 'default',
        url:'',
        templateUrl: './Connection.html',
        controller: 'connectionCtrl'
    }

    var registerState = {
        name: 'register',
        url:'/register',
        templateUrl: './Register.html',
        controller: 'registerCtrl'
    }

    var galerieState = {
        name: 'galerie',
        url:'/galerie',
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


});


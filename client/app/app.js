// Defining Angular app model with all other dependent modules
var app = angular.module('app', ['ngRoute', "ngMaterial", "ngSanitize", 'lfNgMdFileInput', 'vjs.video']);

var appConfig = {
    "basePath": "/",
    "templatePath": "components/views/",
    "baseUrl": "http://localhost:5001",
    "videosPath": "http://localhost:5001/uploads/videos/",
    "token": function () {
        return window.localStorage.getItem("access_token") || ""
    }
};



app.filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}])

app.config(function ($routeProvider, $httpProvider, $sceProvider) {
    $sceProvider.enabled(false);
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
    if (window.localStorage.getItem("access_token")) {

        $routeProvider.when('/upload', {
            controller: 'UploadController',
            controllerAs: "uploadCtrl",
            templateUrl: 'components/views/uploadView.html'
        }).when('/videos', {
            controller: 'VideosController',
            controllerAs: "videosCtrl",
            templateUrl: 'components/views/videosView.html'
        }).when('/video/:videoid', {
            controller: 'VideoController',
            controllerAs: "videoCtrl",
            templateUrl: 'components/views/videoView.html'
        }).otherwise({
            redirectTo: '/upload'
        });
    } else {
        $routeProvider.when('/login', {
            controller: 'AuthController',
            controllerAs: "loginCtrl",
            templateUrl: 'components/views/loginView.html'
        }).otherwise({
            redirectTo: '/login'
        });
    }


    // Settings for http communications
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

});

app.directive("myheader", function () {
    return {
        restrict: 'E',
        templateUrl: appConfig.templatePath + 'header/index.html',
        controller: 'HeaderController',
        controllerAs: 'headerCtrl'
    };
});
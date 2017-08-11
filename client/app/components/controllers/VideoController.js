
app.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

app.controller('VideoController', function ($scope, $mdToast, $routeParams, VideoService, $sce) {
 
    var vc = this;
    var videoid = $routeParams.videoid;
    $scope.video = [];
    $scope.videoinfo = [];
    VideoService.getVideo(videoid).success(function (data) {
        // how many request we will do
        $scope.video = JSON.parse(data.code);
        $scope.videoinfo["title"] = data.title;
        var vidsrc = appConfig.videosPath + data.filename;
        $scope.videoinfo["src"] = $sce.trustAsResourceUrl(vidsrc);
        console.log($scope.video);
        // make requests to filter the array
        $scope.videosQueryStatus = "Available videos:";
    }).error(function (data) {
        $scope.loading = false;
        $scope.error = true;
        //TODO redirect
        $scope.errorMessage = "Ops! There's some problem with the backend! Try again later!";
    });
});


app.controller('VideosController', function($scope, $mdToast, VideoService) {
    var vc = this;
    vc.videosPath = appConfig.videosPath;
    $scope.loading = true;
    $scope.videosQueryStatus = "Loading...";
    var userid = localStorage.getItem('userid');
    VideoService.getVideos(userid).success(function(data) {
        // how many request we will do
        $scope.videos = data;
        $scope.loading=false;
        console.log(data);
        // make requests to filter the array
        $scope.videosQueryStatus = "Available videos:";
    }).error(function(data) {
        $scope.loading = false;
        $scope.error = true;
        $scope.errorMessage = "Ops! There's some problem with the backend! Try again later!";
    });
});

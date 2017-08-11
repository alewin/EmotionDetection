app.controller('UploadController', function ($scope, $mdToast, VideoService) {
	var uc = this;

	$scope.onSubmitClick = function () {

		var formData = new FormData();
		angular.forEach($scope.video_input, function (obj) {
			if (!obj.isRemote) {
				var info = {
					title: $scope.videotitle,
					gender: $scope.videogender,
					age: $scope.videoage,
					glasses: $scope.videoglasses,
					ethnicity: $scope.videoethnicity
				};

				formData.append('video_input', obj.lfFile);
				formData.append("video_info", JSON.stringify(info));
				console.log(JSON.stringify(info));
				console.log(obj.lfFile);

				VideoService.upload(formData).then(function (res) {
					var toast = $mdToast.simple()
						.content("Video uploaded")
						.action('OK')
						.highlightAction(true)
						.hideDelay(0)
						.position('bottom right')
						.parent(angular.element(document.body));

					$mdToast.show(toast);
				/*DEBUG	setTimeout(function () {
						window.location.reload(1)
					}, 2000);
					*/
				}, function (err) {
					alert("error")
				});

			}
		});

	};


});
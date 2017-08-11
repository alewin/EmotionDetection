// Controller definition for this module
app.controller('AuthController', function ($scope, $http, AuthService, $mdToast) {

	this.login = function () {
		AuthService.login($scope.credentials.loginmail, $scope.credentials.loginpassword).then(function (res) {
			if (res.data.authsuccess) {
				localStorage.setItem('access_token', res.data.accessToken);
				localStorage.setItem('userid', res.data.userid);
				window.location.reload();
			} else {
				var toast = $mdToast.simple()
					.content("Login falied")
					.action('OK')
					.highlightAction(true)
					.hideDelay(0)
					.position('bottom right')
					.parent(angular.element(document.body));

				$mdToast.show(toast);
			}
		});
	}
});
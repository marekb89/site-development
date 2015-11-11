var app = angular.module('App');

app.directive('userInfo', ['mainService', function(mainService) {
	return {
		restrict: 'E',
		templateUrl: 'assets/js/directives/userInfo.html',
		link: function(scope) {

			scope.availablePositions = scope.config.availablePositions;

			scope.updateUserInfo = function() {
				mainService.updateUser(scope.config.apiUrl, scope.userSet, scope.users[scope.userSet])
				.then(
					function (result) {
		                scope.users = result;
		            },
		            function (error) {
		                scope.users = error.defaultData;
		            }
				);

			};

		}
	}
}]);
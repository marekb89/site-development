var app = angular.module('App');

app.directive('userInfo', ['mainService', function(mainService) {
	return {
		restrict: 'E',
		templateUrl: 'assets/js/directives/userInfo.html',
		link: function(scope) {

			scope.availablePositions = scope.config.availablePositions;

			scope.updateUserInfo = function() {
				scope.formValidationError = false;
				var userObj = scope.users[scope.userSet];
				if (userObj.firstName && userObj.lastName && userObj.birthDate) {
					mainService.updateUser(scope.config.apiUrl, scope.userSet, userObj)
					.then(
						function (result) {
			                scope.users = result;
			            },
			            function (error) {
			                scope.users = error.defaultData;
			            }
					);
				} else {
					scope.formValidationError = true;
				}
			};

		}
	}
}]);
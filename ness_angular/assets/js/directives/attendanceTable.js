var app = angular.module('App');

app.directive('attendanceTable', ['mainService', function(mainService) {
	return {
		restrict: 'E',
		templateUrl: 'assets/js/directives/attendanceTable.html',
		link: function(scope) {

			scope.updateTime = function() {
				mainService.updateAttendance(scope.config.apiUrl, scope.userSet, scope.users[scope.userSet])
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
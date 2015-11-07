var app = angular.module('App');

app.directive('usersList', [function() {
	return {
		restrict: 'E',
		templateUrl: 'assets/js/directives/usersList.html',
		link: function(scope) {

			scope.setUser = function(userId) {
				scope.userSet = parseInt(userId);
				scope.userInfo = scope.users[scope.userSet];
			};

			scope.isSet = function(userId) {
				return scope.userSet === parseInt(userId);
			};			
			
		}
	}
}]);
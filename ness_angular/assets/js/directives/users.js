var app = angular.module('users-directive', []);

app.directive("userLink", function() {
	return {
		restrict: 'E',
		templateUrl: 'assets/js/directives/user-link.html'
	};
});
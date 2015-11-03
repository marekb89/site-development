var app = angular.module('App');

app.directive('datesList', [function() {
	return {
		restrict: 'E',
		templateUrl: 'assets/js/directives/datesList.html',
		link: function (scope) {
			var startDate = new Date(scope.config.startYear, scope.config.startMonth-1);
			var actualDate = new Date();
			var availableDates = [];

			while (startDate < actualDate) {
				availableDates.unshift(new Date(startDate));
				startDate.setMonth(startDate.getMonth() + 1);
			}

			scope.availableDates = availableDates;
		}
	}
}]);

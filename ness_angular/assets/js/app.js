/* config */
var config = {
	"apiUrl": "/users",
	"startMonth": 8,
	"startYear": 2015
}

/* App */
var app = angular.module('App', ['ui.layout']);

app.controller('mainController', ['$scope', '$http', 'mainService', function($scope, $http, mainService) { 
	
	$scope.config = config;
	$scope.currentDate = new Date();
	$scope.userSet;
	$scope.userInfo;

	$scope.getUsers = function(getUrl, getParams) {
		mainService.getUsers(getUrl, getParams)
        .then(
            function (result) {
                $scope.users = result;
            },
            function (error) {
                $scope.users = error.defaultData;
            }
        );
    };

	$scope.getUsers($scope.config.apiUrl, {year: $scope.currentDate.getFullYear(), month: $scope.currentDate.getMonth()+1});

	$scope.changeDate = function() {
		$scope.currentDate = $scope.availableDates[this.selectedDate];
		$scope.getUsers($scope.config.apiUrl, {year: $scope.currentDate.getFullYear(), month: $scope.currentDate.getMonth()+1});
	};

}]);

app.filter('hoursMinutes', function() {
	return function(input) {
		if (!input) {
			return input;
		} else {
			var hours = Math.floor(input / 60);          
			var minutes = input % 60;
			if (minutes < 10) { minutes = "0" + minutes };
			var time = hours + ":" + minutes;			
			return time;
		}
	};
});
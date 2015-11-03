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

	

	
	/*
	$scope.timeAtWork = function(arrival, departure, date, fond) {

		var arrivalDate = new Date(arrival);
		var departureDate = new Date(departure);

		var fondTime = new Date(date + "T" + fond);

		var halfDay = new Date(date + "T04:00");		

		var timeAtWork = new Date(departureDate - arrivalDate);

		if (fondTime > halfDay) {
			timeAtWork.setMinutes(timeAtWork.getMinutes() - 30);
		} else if (fondTime.getMinutes() === 0 && fondTime.getHours() === 0) {
			timeAtWork = "";
		}

		return timeAtWork;
	};
	*/

/*
	console.log();
*/

}]);
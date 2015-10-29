/* config */
var config = {
	"startMonth": 8,
	"startYear": 2015
}

/* default JSON */
var users = {	"1": 
				{
					"firstName": "Janko",
					"lastName": "Hraško",
					"birthDate": "1991-01-01",
					"position": "",
					"bench": false,
					"supervisorId": "",
					"attendance": [
									{
										"date": "2015-10-01",
										"arrival": "2015-10-01T10:30",
										"departure": "2015-10-01T15:11",
										"fond": "08:00"
									},
									{
										"date": "2015-10-02",
										"arrival": "2015-10-02T09:15",
										"departure": "",
										"fond": "05:00"
									},
									{
										"date": "2015-10-03",
										"arrival": "2015-10-03T06:30",
										"departure": "2015-10-03T19:30",
										"fond": "04:00"
									}
								]
				},
				"2":
				{
					"firstName": "Majka",
					"lastName": "Medovníková",
					"birthDate": "1995-05-05",
					"position": "",
					"bench": true,
					"supervisorId": "",
					"attendance": [
									{
										"date": "2015-10-01",
										"arrival": "2015-10-01T09:00",
										"departure": "2015-10-01T16:11",
										"fond": "08:00"
									},
									{
										"date": "2015-10-02",
										"arrival": "",
										"departure": "",
										"fond": "00:00"
									},
									{
										"date": "2015-10-03",
										"arrival": "2015-10-03T07:30",
										"departure": "2015-10-03T17:30",
										"fond": "08:00"
									}
								]
				},
				"3":
				{
					"firstName": "Danuška",
					"lastName": "Danušková",
					"birthDate": "1993-02-07",
					"position": "",
					"bench": false,
					"supervisorId": 1,
					"attendance": [
									{
										"date": "2015-10-01",
										"arrival": "2015-10-01T07:00",
										"departure": "2015-10-01T15:11",
										"fond": "08:00"
									},
									{
										"date": "2015-10-02",
										"arrival": "",
										"departure": "",
										"fond": "00:00"
									},
									{
										"date": "2015-10-03",
										"arrival": "2015-10-03T08:30",
										"departure": "2015-10-03T12:30",
										"fond": "08:00"
									}
								]
				},
				"5":
				{
					"firstName": "Danuška",
					"lastName": "Danušková",
					"birthDate": "1993-02-07",
					"position": "",
					"bench": false,
					"supervisorId": 1,
					"attendance": [
									{
										"date": "2015-10-01",
										"arrival": "2015-10-01T07:00",
										"departure": "2015-10-01T15:11",
										"fond": "08:00"
									},
									{
										"date": "2015-10-02",
										"arrival": "",
										"departure": "",
										"fond": "00:00"
									},
									{
										"date": "2015-10-03",
										"arrival": "2015-10-03T08:30",
										"departure": "2015-10-03T12:30",
										"fond": "08:00"
									}
								]
				}
			};

/* App */
var app = angular.module('App', ['ui.layout']);

app.controller('mainController', ['$scope', '$http', function($scope, $http) { 
	
	$scope.config = config;

	$scope.getAvailableDates = function() {
		var startDate = new Date($scope.config.startYear, $scope.config.startMonth-1);
		var actualDate = new Date();
		var availableDates = [];

		while (startDate < actualDate) {
			availableDates.unshift(new Date(startDate));
			startDate.setMonth(startDate.getMonth() + 1);
		}

		return availableDates;
	};

	$scope.availableDates = $scope.getAvailableDates();
	$scope.currentDate = $scope.availableDates[0];

	$scope.service = function(getMethod, getParams) {

		$http({
				method: getMethod,
				url: '/users',
				params: getParams
			}).then(function successCallback(response) {
			    $scope.users = response;
			}, function errorCallback(response) {
			    $scope.users = users;
		});

	};

	$scope.service('GET', {year: $scope.currentDate.getFullYear(), month: $scope.currentDate.getMonth()+1});

	$scope.changeDate = function() {
		$scope.currentDate = $scope.availableDates[this.selectedDate];
		$scope.service('GET', {year: $scope.currentDate.getFullYear(), month: $scope.currentDate.getMonth()+1});
	};

	$scope.userSet;
	$scope.userInfo;

	$scope.setUser = function(userId) {
		$scope.userSet = parseInt(userId);
		$scope.userInfo = $scope.users[$scope.userSet];
	};

	$scope.isSet = function(userId) {
		return $scope.userSet === parseInt(userId);
	};

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

/*
	console.log();
*/

}]);
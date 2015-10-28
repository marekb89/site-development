app.controller('MainController', ['$scope', function($scope) { 

	$scope.users = users;

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

	console.log(app);

}]);
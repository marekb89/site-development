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

	$scope.timeAtWork = function(date, arrival, departure) {
		var arrivalDate = new Date(date.split(".")[2], date.split(".")[1], date.split(".")[0], arrival.split(":")[0], arrival.split(":")[1]);
		var departureDate = new Date(date.split(".")[2], date.split(".")[1], date.split(".")[0], departure.split(":")[0], departure.split(":")[1]);
		return departureDate - arrivalDate;
	};

}]);
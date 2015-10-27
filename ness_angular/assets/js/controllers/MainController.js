app.controller('MainController', ['$scope', function($scope) { 

	$scope.users = users;

	$scope.userSet = 0;
	$scope.userInfo;

	$scope.setUser = function(userId) {
		$scope.userSet = userId;
		$scope.userInfo = $scope.users[$scope.userSet];
	};

	$scope.isSet = function(userId) {
		return $scope.userSet === userId;
	};

}]);
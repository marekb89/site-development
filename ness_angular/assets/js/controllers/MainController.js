app.controller('mainController', ['$scope', '$http', 'mainService', function($scope, $http, mainService) { 
	
	$scope.config = config;
	$scope.currentDate = new Date();

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

}]);
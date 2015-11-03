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






		for (user in scope.users) {
			for (day in scope.users[user].attendance) {
				

		var currentDay = scope.users[user].attendance[day];
		var arrivalDate = new Date(currentDay.arrival);
		var departureDate = new Date(currentDay.departure);

		var fondTime = new Date(currentDay.date + "T" + currentDay.fond);

		var halfDay = new Date(currentDay.date + "T04:00");		

		var timeAtWork = new Date(departureDate - arrivalDate);

		if (fondTime > halfDay) {
			timeAtWork.setMinutes(timeAtWork.getMinutes() - 30);
		} else if (fondTime.getMinutes() === 0 && fondTime.getHours() === 0) {
			timeAtWork = "";
		}

		currentDay.timeAtWork = timeAtWork;
		console.log('aha');

			}
		}
	

/*
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

		//return timeAtWork;
	};
*/



			
		}
	}
}]);
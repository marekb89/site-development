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

			var calculateTimeAtWork = function() {
				for (user in scope.users) {
					for (day in scope.users[user].attendance) {
						
						var currentDay = scope.users[user].attendance[day];

						if (currentDay.arrival && currentDay.departure && (currentDay.fond != "00:00")) {
							var arrivalDate = new Date(currentDay.arrival);
							var departureDate = new Date(currentDay.departure);

							var fondTime = new Date(currentDay.date + "T" + currentDay.fond);
							var halfDay = new Date(currentDay.date + "T04:00");
							var fullDay = new Date("1970-01-01" + "T08:00");		
							var timeAtWork = new Date(departureDate - arrivalDate);

							if (fondTime > halfDay) {
								timeAtWork.setMinutes(timeAtWork.getMinutes() - 30);
							}

							if (fullDay < timeAtWork) {
								timeAtWorkFlag = "good";
							} else {
								timeAtWorkFlag = "bad";
							}

						} else {
							timeAtWork = "";
							if (currentDay.fond == "00:00") {
								timeAtWorkFlag = "";
							} else {
								timeAtWorkFlag = "missing";
							}
							
						}

						currentDay.timeAtWork = timeAtWork;
						currentDay.timeAtWorkFlag = timeAtWorkFlag;
					}
				}
			}();
			
		}
	}
}]);
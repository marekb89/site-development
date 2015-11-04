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
					var fondMinutesMonth = 0;
					var minutesAtWorkMonth = 0;

					for (day in scope.users[user].attendance) {
						
						var currentDay = scope.users[user].attendance[day];

						if (currentDay.arrival && currentDay.departure && (currentDay.fond != "00:00")) {

							var arrivalDate = new Date(currentDay.arrival);
							var departureDate = new Date(currentDay.departure);
							var fondTime = new Date(currentDay.date + "T" + currentDay.fond);

							var arrivalMinutes = arrivalDate.getHours() * 60 + arrivalDate.getMinutes();
							var departureMinutes = departureDate.getHours() * 60 + departureDate.getMinutes();
							var fondMinutes = fondTime.getHours() * 60 + fondTime.getMinutes();

							var minutesAtWork = departureMinutes - arrivalMinutes;

							if (fondMinutes > 4 * 60) {
								minutesAtWork - 30;
							}

							if (8 * 60 < minutesAtWork) {
								timeAtWorkFlag = "good";
							} else {
								timeAtWorkFlag = "bad";
							}

						} else {
							minutesAtWork = 0;
							if (currentDay.fond == "00:00") {
								timeAtWorkFlag = "";
							} else {
								timeAtWorkFlag = "missing";
							}
							
						}

						fondMinutesMonth = fondMinutesMonth + fondMinutes;
						minutesAtWorkMonth = minutesAtWorkMonth + minutesAtWork;

						if (minutesAtWork) { timeAtWork = new Date(minutesAtWork * 60 * 1000); } else { timeAtWork = ""; }

						currentDay.timeAtWork = timeAtWork;
						currentDay.timeAtWorkFlag = timeAtWorkFlag;

					}

					scope.users[user].fondTimeMonth = Math.floor(fondMinutesMonth / 60) + ":" + fondMinutesMonth % 60;
					scope.users[user].timeAtWorkMonth = Math.floor(minutesAtWorkMonth / 60) + ":" + minutesAtWorkMonth % 60;
					scope.users[user].percentTimeAtWork = ((minutesAtWorkMonth / fondMinutesMonth) * 100).toFixed(2);

				}

				/*			
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
				*/
			
			
		}
	}
}]);